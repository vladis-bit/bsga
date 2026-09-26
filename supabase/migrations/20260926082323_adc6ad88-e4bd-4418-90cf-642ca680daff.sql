CREATE TABLE public.site_texts (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_texts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_texts TO authenticated;
GRANT ALL ON public.site_texts TO service_role;
ALTER TABLE public.site_texts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site texts" ON public.site_texts FOR SELECT USING (true);
CREATE POLICY "Admins manage site texts" ON public.site_texts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_site_texts_updated_at BEFORE UPDATE ON public.site_texts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.weekend_course_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  datum text NOT NULL,
  poznamka text,
  sold_out boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.weekend_course_dates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.weekend_course_dates TO authenticated;
GRANT ALL ON public.weekend_course_dates TO service_role;
ALTER TABLE public.weekend_course_dates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published weekend dates" ON public.weekend_course_dates FOR SELECT
  USING (is_published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage weekend dates" ON public.weekend_course_dates FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_weekend_course_dates_updated_at BEFORE UPDATE ON public.weekend_course_dates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.weekend_course_dates (datum, sort_order) VALUES
('11. – 12. 4. 2026',1),('25. – 26. 4. 2026',2),('9. – 10. 5. 2026',3),('16. – 17. 5. 2026',4),
('23. – 24. 5. 2026',5),('6. – 7. 6. 2026',6),('13. – 14. 6. 2026',7),('20. – 21. 6. 2026',8),
('4. – 5. 7. 2026',9),('18. – 19. 7. 2026',10),('1. – 2. 8. 2026',11),('15. – 16. 8. 2026',12),
('22. – 23. 8. 2026',13),('5. – 6. 9. 2026',14),('19. – 20. 9. 2026',15),('3. – 4. 10. 2026',16);

INSERT INTO public.site_texts (key, value) VALUES
('tour2027_title','BSGA Tour 2027'),('tour2027_subtitle','11. ročník'),('tour2027_intro','');