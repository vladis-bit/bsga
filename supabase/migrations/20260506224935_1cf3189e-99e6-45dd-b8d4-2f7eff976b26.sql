DROP POLICY IF EXISTS "Public can read availability" ON public.reservations;

CREATE OR REPLACE FUNCTION public.get_busy_slots(_from DATE, _to DATE)
RETURNS TABLE (
  type reservation_type,
  trainer_email TEXT,
  equipment TEXT,
  reservation_date DATE,
  reservation_time TIME
)
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT type, trainer_email, equipment, reservation_date, reservation_time
  FROM public.reservations
  WHERE status <> 'cancelled'
    AND reservation_date BETWEEN _from AND _to;
$$;

GRANT EXECUTE ON FUNCTION public.get_busy_slots(DATE, DATE) TO anon, authenticated;