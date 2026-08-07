DROP POLICY IF EXISTS "Anyone can view coaches" ON public.coaches;

CREATE POLICY "Admins can view coaches"
ON public.coaches FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE VIEW public.coaches_public
WITH (security_invoker = off) AS
SELECT id, meno, pozicia, zakladajuci_clen, licencia, ocenenia, popis, foto, sort_order
FROM public.coaches;

GRANT SELECT ON public.coaches_public TO anon, authenticated;
GRANT ALL ON public.coaches_public TO service_role;