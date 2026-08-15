DROP POLICY IF EXISTS "Anyone can view coaches" ON public.coaches;
DROP POLICY IF EXISTS "Admins can view coaches" ON public.coaches;

REVOKE ALL ON public.coaches FROM anon, authenticated;

CREATE POLICY "Admins can view coaches"
ON public.coaches FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.coaches TO authenticated;
GRANT ALL ON public.coaches TO service_role;

DROP VIEW IF EXISTS public.coaches_public;
CREATE VIEW public.coaches_public
WITH (security_invoker = true) AS
SELECT id, meno, pozicia, zakladajuci_clen, licencia, ocenenia, popis, foto, sort_order
FROM public.coaches;

GRANT SELECT ON public.coaches_public TO anon, authenticated;
GRANT ALL ON public.coaches_public TO service_role;

DROP POLICY IF EXISTS "Public can view non-sensitive coach info" ON public.coaches;
CREATE POLICY "Public can view non-sensitive coach info"
ON public.coaches FOR SELECT
TO anon, authenticated
USING (
  current_setting('request.path', true) IS NOT NULL
  AND false
);
DROP POLICY IF EXISTS "Public can view non-sensitive coach info" ON public.coaches;