CREATE TYPE public.reservation_type AS ENUM ('lesson', 'performance');
CREATE TYPE public.reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type reservation_type NOT NULL,
  trainer_name TEXT,
  trainer_email TEXT,
  equipment TEXT,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  notes TEXT,
  status reservation_status NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX reservations_trainer_slot_idx
  ON public.reservations (trainer_email, reservation_date, reservation_time)
  WHERE type = 'lesson' AND status <> 'cancelled';

CREATE UNIQUE INDEX reservations_equipment_slot_idx
  ON public.reservations (equipment, reservation_date, reservation_time)
  WHERE type = 'performance' AND status <> 'cancelled';

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations" ON public.reservations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read availability"
  ON public.reservations
  FOR SELECT
  USING (status <> 'cancelled');

CREATE POLICY "Admins can manage reservations" ON public.reservations
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));