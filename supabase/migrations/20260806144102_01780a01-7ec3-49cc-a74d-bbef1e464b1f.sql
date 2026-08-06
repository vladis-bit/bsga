-- 1. Settings table
CREATE TABLE public.pc_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pc_settings TO anon, authenticated;
GRANT ALL ON public.pc_settings TO service_role;
ALTER TABLE public.pc_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pc settings" ON public.pc_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage pc settings" ON public.pc_settings FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER update_pc_settings_updated_at BEFORE UPDATE ON public.pc_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.pc_settings (key, value) VALUES ('booking_window_days', '14');

-- 2. Recurring blocks
CREATE TABLE public.pc_recurring_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulator_id uuid REFERENCES public.pc_simulators(id) ON DELETE CASCADE,
  weekday smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  valid_from date NOT NULL DEFAULT current_date,
  valid_until date,
  reason text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  CHECK (end_time > start_time)
);
GRANT SELECT ON public.pc_recurring_blocks TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.pc_recurring_blocks TO authenticated;
GRANT ALL ON public.pc_recurring_blocks TO service_role;
ALTER TABLE public.pc_recurring_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view recurring blocks" ON public.pc_recurring_blocks FOR SELECT USING (true);
CREATE POLICY "Admins can manage recurring blocks" ON public.pc_recurring_blocks FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE TRIGGER update_pc_recurring_blocks_updated_at BEFORE UPDATE ON public.pc_recurring_blocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Booking flag
ALTER TABLE public.pc_bookings ADD COLUMN created_by_admin boolean NOT NULL DEFAULT false;

DROP POLICY "Anyone can create a booking" ON public.pc_bookings;
CREATE POLICY "Anyone can create a booking" ON public.pc_bookings FOR INSERT TO anon, authenticated
WITH CHECK (
  ((length(btrim(first_name)) >= 1) AND (length(btrim(first_name)) <= 100))
  AND ((last_name IS NULL) OR (length(last_name) <= 100))
  AND ((length(btrim(email)) >= 3) AND (length(btrim(email)) <= 255))
  AND (POSITION(('@'::text) IN (email)) > 1)
  AND ((phone IS NULL) OR (length(phone) <= 40))
  AND ((note IS NULL) OR (length(note) <= 1000))
  AND (starts_at > now())
  AND (duration_hours > (0)::numeric) AND (duration_hours <= (8)::numeric)
  AND (status = ANY (ARRAY['pending'::text, 'confirmed'::text]))
  AND (payment_status = 'unpaid'::text)
  AND (created_by_admin = false)
);
CREATE POLICY "Admins can create bookings" ON public.pc_bookings FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. Booking window trigger (client-only)
CREATE OR REPLACE FUNCTION public.pc_bookings_check_window()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  _days int;
  _today date;
  _start_day date;
BEGIN
  IF public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RETURN NEW;
  END IF;

  SELECT value::int INTO _days FROM public.pc_settings WHERE key = 'booking_window_days';
  _days := coalesce(_days, 14);

  _today := (now() AT TIME ZONE 'Europe/Bratislava')::date;
  _start_day := (NEW.starts_at AT TIME ZONE 'Europe/Bratislava')::date;

  IF _start_day < _today THEN
    RAISE EXCEPTION 'Rezervovať sa dá len na dnešný alebo neskorší dátum.';
  END IF;
  IF _start_day > _today + _days THEN
    RAISE EXCEPTION 'Rezervovať sa dá najviac % dní dopredu.', _days;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER pc_bookings_check_window_trg
BEFORE INSERT ON public.pc_bookings
FOR EACH ROW EXECUTE FUNCTION public.pc_bookings_check_window();

-- 5. Recurring block conflict trigger
CREATE OR REPLACE FUNCTION public.pc_bookings_check_recurring()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
DECLARE
  _local_start timestamp;
  _local_end timestamp;
  _d date;
  _r record;
BEGIN
  _local_start := NEW.starts_at AT TIME ZONE 'Europe/Bratislava';
  _local_end := _local_start + make_interval(mins => (NEW.duration_hours * 60)::int);
  _d := _local_start::date;

  SELECT * INTO _r
  FROM public.pc_recurring_blocks rb
  WHERE rb.is_active
    AND (rb.simulator_id IS NULL OR rb.simulator_id = NEW.simulator_id)
    AND rb.weekday = extract(dow from _d)::int
    AND rb.valid_from <= _d
    AND (rb.valid_until IS NULL OR rb.valid_until >= _d)
    AND (_d + rb.start_time) < _local_end
    AND (_d + rb.end_time) > _local_start
  LIMIT 1;

  IF FOUND THEN
    RAISE EXCEPTION 'Tento termín je pravidelne blokovaný (%).', coalesce(_r.reason, 'opakovaná blokácia');
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER pc_bookings_check_recurring_trg
BEFORE INSERT OR UPDATE ON public.pc_bookings
FOR EACH ROW EXECUTE FUNCTION public.pc_bookings_check_recurring();

-- 6. Availability includes recurring blocks
CREATE OR REPLACE FUNCTION public.get_pc_day_slots(_day date)
RETURNS TABLE(simulator_id uuid, starts_at timestamp with time zone, ends_at timestamp with time zone, kind text)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT b.simulator_id, b.starts_at,
         coalesce(b.ends_at, b.starts_at + (b.duration_hours || ' hours')::interval),
         'booked'::text
  FROM public.pc_bookings b
  WHERE b.status <> 'cancelled'
    AND b.starts_at < ((_day + 1)::timestamp AT TIME ZONE 'Europe/Bratislava')
    AND coalesce(b.ends_at, b.starts_at + (b.duration_hours || ' hours')::interval) > (_day::timestamp AT TIME ZONE 'Europe/Bratislava')
  UNION ALL
  SELECT bl.simulator_id, bl.starts_at, bl.ends_at, 'blocked'::text
  FROM public.pc_blackouts bl
  WHERE bl.starts_at < ((_day + 1)::timestamp AT TIME ZONE 'Europe/Bratislava')
    AND bl.ends_at > (_day::timestamp AT TIME ZONE 'Europe/Bratislava')
  UNION ALL
  SELECT rb.simulator_id,
         ((_day + rb.start_time) AT TIME ZONE 'Europe/Bratislava'),
         ((_day + rb.end_time) AT TIME ZONE 'Europe/Bratislava'),
         'blocked'::text
  FROM public.pc_recurring_blocks rb
  WHERE rb.is_active
    AND rb.weekday = extract(dow from _day)::int
    AND rb.valid_from <= _day
    AND (rb.valid_until IS NULL OR rb.valid_until >= _day)
$$;
