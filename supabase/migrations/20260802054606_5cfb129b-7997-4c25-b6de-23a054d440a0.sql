
CREATE TABLE public.coaches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  meno text NOT NULL,
  pozicia text,
  telefon text,
  email text,
  zakladajuci_clen boolean NOT NULL DEFAULT false,
  licencia text,
  ocenenia text,
  popis text,
  foto text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.coaches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.coaches TO authenticated;
GRANT ALL ON public.coaches TO service_role;
ALTER TABLE public.coaches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view coaches" ON public.coaches FOR SELECT USING (true);
CREATE POLICY "Admins can manage coaches" ON public.coaches FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER update_coaches_updated_at BEFORE UPDATE ON public.coaches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nazov text NOT NULL,
  popis text,
  ikona text,
  odkaz text,
  foto text,
  dlzka text,
  cena text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.shop_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  typ text NOT NULL,
  nazov text NOT NULL,
  cena text,
  popis text,
  farby text,
  poznamka text,
  obrazok text,
  odkaz_na_kupu text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.shop_products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shop_products TO authenticated;
GRANT ALL ON public.shop_products TO service_role;
ALTER TABLE public.shop_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view shop products" ON public.shop_products FOR SELECT USING (true);
CREATE POLICY "Admins can manage shop products" ON public.shop_products FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER update_shop_products_updated_at BEFORE UPDATE ON public.shop_products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.tour_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rok integer NOT NULL,
  cislo_turnaja integer NOT NULL,
  datum text,
  lokalita text NOT NULL,
  partner_prezentujuci text,
  obrazok text,
  odkaz_lokalita text,
  odkaz_vysledky text,
  odkaz_galeria text,
  promo_letak text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (rok, cislo_turnaja)
);
GRANT SELECT ON public.tour_events TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tour_events TO authenticated;
GRANT ALL ON public.tour_events TO service_role;
ALTER TABLE public.tour_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view tour events" ON public.tour_events FOR SELECT USING (true);
CREATE POLICY "Admins can manage tour events" ON public.tour_events FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER update_tour_events_updated_at BEFORE UPDATE ON public.tour_events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.pc_pricing_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kategoria text NOT NULL,
  slug text NOT NULL,
  cas_zaciatku time NOT NULL,
  cas_konca time NOT NULL,
  trvanie_hod numeric NOT NULL DEFAULT 1,
  cena_eur numeric NOT NULL DEFAULT 25,
  popis text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, cas_zaciatku)
);
GRANT SELECT ON public.pc_pricing_slots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pc_pricing_slots TO authenticated;
GRANT ALL ON public.pc_pricing_slots TO service_role;
ALTER TABLE public.pc_pricing_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view pc pricing" ON public.pc_pricing_slots FOR SELECT USING (true);
CREATE POLICY "Admins can manage pc pricing" ON public.pc_pricing_slots FOR ALL TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE TRIGGER update_pc_pricing_slots_updated_at BEFORE UPDATE ON public.pc_pricing_slots FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
