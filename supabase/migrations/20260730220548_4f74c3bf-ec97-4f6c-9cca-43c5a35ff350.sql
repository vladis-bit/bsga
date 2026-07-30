-- ROLES
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- SIMULATORS
CREATE TABLE public.pc_simulators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  hourly_rate_eur numeric(10,2) NOT NULL DEFAULT 25.00,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.pc_simulators TO anon, authenticated;
GRANT ALL ON public.pc_simulators TO service_role;

ALTER TABLE public.pc_simulators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active simulators"
  ON public.pc_simulators FOR SELECT
  TO anon, authenticated
  USING (is_active);

CREATE POLICY "Admins can manage simulators"
  ON public.pc_simulators FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- BOOKINGS
CREATE TABLE public.pc_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulator_id uuid NOT NULL REFERENCES public.pc_simulators(id) ON DELETE RESTRICT,
  first_name text NOT NULL,
  last_name text,
  email text NOT NULL,
  phone text,
  starts_at timestamptz NOT NULL,
  duration_hours numeric(4,2) NOT NULL DEFAULT 1,
  ends_at timestamptz,
  price_eur numeric(10,2) NOT NULL DEFAULT 25.00,
  note text,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'unpaid',
  email_status text NOT NULL DEFAULT 'pending',
  email_error text,
  resend_at timestamptz,
  resend_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pc_bookings_status_check CHECK (status IN ('pending','confirmed','cancelled')),
  CONSTRAINT pc_bookings_payment_status_check CHECK (payment_status IN ('unpaid','paid','refunded')),
  CONSTRAINT pc_bookings_email_status_check CHECK (email_status IN ('pending','sent','failed')),
  CONSTRAINT pc_bookings_duration_check CHECK (duration_hours > 0 AND duration_hours <= 8)
);

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE OR REPLACE FUNCTION public.pc_bookings_set_ends_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.ends_at := NEW.starts_at + make_interval(mins => (NEW.duration_hours * 60)::int);
  RETURN NEW;
END;
$$;

CREATE TRIGGER pc_bookings_ends_at
  BEFORE INSERT OR UPDATE ON public.pc_bookings
  FOR EACH ROW EXECUTE FUNCTION public.pc_bookings_set_ends_at();

ALTER TABLE public.pc_bookings
  ADD CONSTRAINT pc_bookings_no_overlap
  EXCLUDE USING gist (
    simulator_id WITH =,
    tstzrange(starts_at, ends_at, '[)') WITH &&
  ) WHERE (status <> 'cancelled');

CREATE INDEX idx_pc_bookings_starts_at ON public.pc_bookings (starts_at);
CREATE INDEX idx_pc_bookings_simulator ON public.pc_bookings (simulator_id);

GRANT INSERT ON public.pc_bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.pc_bookings TO authenticated;
GRANT ALL ON public.pc_bookings TO service_role;

ALTER TABLE public.pc_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking"
  ON public.pc_bookings FOR INSERT
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
    AND status = 'pending'
    AND payment_status = 'unpaid'
  );

CREATE POLICY "Admins can view bookings"
  ON public.pc_bookings FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can update bookings"
  ON public.pc_bookings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "Admins can delete bookings"
  ON public.pc_bookings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_pc_simulators_updated_at
  BEFORE UPDATE ON public.pc_simulators
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pc_bookings_updated_at
  BEFORE UPDATE ON public.pc_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.pc_simulators (slug, name, description, hourly_rate_eur, sort_order)
VALUES
  ('trackman-4', 'Trackman 4', 'Radarový launch monitor Trackman 4 v BSGA Performance Center.', 25.00, 1),
  ('trackman-io', 'Trackman iO', 'Stropný Trackman iO – indoor tréning a simulátorové ihriská.', 25.00, 2)
ON CONFLICT (slug) DO NOTHING;