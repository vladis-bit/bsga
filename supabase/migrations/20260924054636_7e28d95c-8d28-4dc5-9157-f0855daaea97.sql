CREATE TABLE public.pc_membership_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entries integer NOT NULL UNIQUE CHECK (entries > 0 AND entries <= 200),
  label text NOT NULL,
  price_eur numeric(10,2) NOT NULL CHECK (price_eur > 0),
  savings text,
  badge text,
  image text,
  validity_months integer NOT NULL DEFAULT 6,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pc_membership_packages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pc_membership_packages TO authenticated;
GRANT ALL ON public.pc_membership_packages TO service_role;
ALTER TABLE public.pc_membership_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reads published packages" ON public.pc_membership_packages
  FOR SELECT USING (is_published OR public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins manage packages" ON public.pc_membership_packages
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE TRIGGER update_pc_membership_packages_updated_at BEFORE UPDATE ON public.pc_membership_packages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.pc_membership_packages (entries, label, price_eur, savings, badge, sort_order) VALUES
 (1, '1 vstup', 24.99, NULL, NULL, 1),
 (5, '5 vstupov', 119.99, 'ušetríte 4,96 €', NULL, 2),
 (10, '10 vstupov', 229.99, 'ušetríte 19,91 €', 'Najobľúbenejšie', 3),
 (20, '20 vstupov', 399.99, 'ušetríte 99,81 € (−20 %)', 'Najvýhodnejšie', 4);

GRANT SELECT, UPDATE ON public.pc_vouchers TO authenticated;
CREATE POLICY "Admins update vouchers" ON public.pc_vouchers
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS sold_out boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS hide_poster boolean NOT NULL DEFAULT false;