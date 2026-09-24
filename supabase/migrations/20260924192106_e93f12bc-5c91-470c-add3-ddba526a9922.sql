CREATE TABLE public.camps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nazov text NOT NULL,
  datum text,
  lokalita text,
  popis text,
  plagat text,
  sold_out boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.camps TO anon;
GRANT SELECT ON public.camps TO authenticated;
GRANT ALL ON public.camps TO service_role;
ALTER TABLE public.camps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published camps" ON public.camps FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert camps" ON public.camps FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update camps" ON public.camps FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete camps" ON public.camps FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_camps_updated_at BEFORE UPDATE ON public.camps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
INSERT INTO public.camps (nazov, datum, lokalita, plagat, sold_out, sort_order) VALUES
  ('Denný tábor - Turnus 1', '6. – 10. 7. 2026', 'Hrubá Borša', '/documents/kemp_6-10_jul.pdf', true, 1),
  ('Denný tábor - Turnus 2', '3. – 7. 8. 2026', 'Hrubá Borša', '/documents/kemp_3-7_august.pdf', true, 2),
  ('Denný tábor - Turnus 3', '24. – 28. 8. 2026', 'Hrubá Borša', '/documents/kemp_24-28_august.pdf', true, 3);