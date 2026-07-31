ALTER TABLE public.pc_bookings
  ADD COLUMN IF NOT EXISTS cancellation_token uuid NOT NULL DEFAULT gen_random_uuid();

CREATE UNIQUE INDEX IF NOT EXISTS pc_bookings_cancellation_token_key
  ON public.pc_bookings (cancellation_token);

DROP POLICY IF EXISTS "Anyone can create a booking" ON public.pc_bookings;
CREATE POLICY "Anyone can create a booking"
ON public.pc_bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(first_name)) BETWEEN 1 AND 100
  AND (last_name IS NULL OR length(last_name) <= 100)
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND (phone IS NULL OR length(phone) <= 40)
  AND (note IS NULL OR length(note) <= 1000)
  AND starts_at > now()
  AND duration_hours > 0 AND duration_hours <= 8
  AND status IN ('pending', 'confirmed')
  AND payment_status = 'unpaid'
);

CREATE OR REPLACE FUNCTION public.get_pc_booking_by_token(_token uuid)
RETURNS TABLE (
  starts_at timestamptz,
  ends_at timestamptz,
  duration_hours numeric,
  price_eur numeric,
  simulator_name text,
  first_name text,
  last_name text,
  email text,
  status text,
  payment_status text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.starts_at, b.ends_at, b.duration_hours, b.price_eur,
         s.name, b.first_name, b.last_name, b.email, b.status, b.payment_status
  FROM public.pc_bookings b
  JOIN public.pc_simulators s ON s.id = b.simulator_id
  WHERE b.cancellation_token = _token
$$;

CREATE OR REPLACE FUNCTION public.cancel_pc_booking(_token uuid, _first_name text, _email text)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  b public.pc_bookings%ROWTYPE;
BEGIN
  SELECT * INTO b FROM public.pc_bookings WHERE cancellation_token = _token;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Zadané údaje sa nezhodujú s rezerváciou.');
  END IF;
  IF lower(btrim(b.first_name)) <> lower(btrim(coalesce(_first_name, '')))
     OR lower(btrim(b.email)) <> lower(btrim(coalesce(_email, ''))) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Zadané údaje sa nezhodujú s rezerváciou.');
  END IF;
  IF b.status = 'cancelled' THEN
    RETURN jsonb_build_object('success', true, 'already', true);
  END IF;
  UPDATE public.pc_bookings SET status = 'cancelled' WHERE id = b.id;
  RETURN jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_pc_day_slots(_day date)
RETURNS TABLE (
  simulator_id uuid,
  starts_at timestamptz,
  ends_at timestamptz,
  kind text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.simulator_id, b.starts_at,
         coalesce(b.ends_at, b.starts_at + (b.duration_hours || ' hours')::interval),
         'booked'::text
  FROM public.pc_bookings b
  WHERE b.status <> 'cancelled'
    AND b.starts_at < (_day + 1)::timestamptz
    AND coalesce(b.ends_at, b.starts_at + (b.duration_hours || ' hours')::interval) > _day::timestamptz
  UNION ALL
  SELECT bl.simulator_id, bl.starts_at, bl.ends_at, 'blocked'::text
  FROM public.pc_blackouts bl
  WHERE bl.starts_at < (_day + 1)::timestamptz AND bl.ends_at > _day::timestamptz
$$;

REVOKE ALL ON FUNCTION public.get_pc_booking_by_token(uuid) FROM public;
REVOKE ALL ON FUNCTION public.cancel_pc_booking(uuid, text, text) FROM public;
REVOKE ALL ON FUNCTION public.get_pc_day_slots(date) FROM public;
GRANT EXECUTE ON FUNCTION public.get_pc_booking_by_token(uuid) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cancel_pc_booking(uuid, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_pc_day_slots(date) TO anon, authenticated, service_role;