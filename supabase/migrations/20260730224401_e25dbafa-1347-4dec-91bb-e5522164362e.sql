CREATE TABLE public.pc_blackouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulator_id uuid NULL REFERENCES public.pc_simulators(id) ON DELETE CASCADE,
  starts_at timestamptz NOT NULL,
  ends_at timestamptz NOT NULL,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pc_blackouts_valid_range CHECK (ends_at > starts_at),
  CONSTRAINT pc_blackouts_reason_len CHECK (reason IS NULL OR length(reason) <= 300)
);

GRANT SELECT ON public.pc_blackouts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pc_blackouts TO authenticated;
GRANT ALL ON public.pc_blackouts TO service_role;

ALTER TABLE public.pc_blackouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blackouts"
  ON public.pc_blackouts FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage blackouts"
  ON public.pc_blackouts FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE TRIGGER update_pc_blackouts_updated_at
  BEFORE UPDATE ON public.pc_blackouts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX pc_blackouts_range_idx ON public.pc_blackouts (starts_at, ends_at);

CREATE OR REPLACE FUNCTION public.pc_bookings_check_blackout()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  _b record;
  _end timestamptz;
BEGIN
  _end := NEW.starts_at + make_interval(mins => (NEW.duration_hours * 60)::int);

  SELECT * INTO _b
  FROM public.pc_blackouts bl
  WHERE (bl.simulator_id IS NULL OR bl.simulator_id = NEW.simulator_id)
    AND bl.starts_at < _end
    AND bl.ends_at > NEW.starts_at
  LIMIT 1;

  IF FOUND THEN
    RAISE EXCEPTION 'Tento termín je blokovaný (%).', COALESCE(_b.reason, 'odstávka');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS pc_bookings_check_blackout_trg ON public.pc_bookings;
CREATE TRIGGER pc_bookings_check_blackout_trg
BEFORE INSERT OR UPDATE OF starts_at, duration_hours, simulator_id ON public.pc_bookings
FOR EACH ROW EXECUTE FUNCTION public.pc_bookings_check_blackout();