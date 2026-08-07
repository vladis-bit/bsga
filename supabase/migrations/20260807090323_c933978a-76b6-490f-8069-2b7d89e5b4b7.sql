DROP VIEW IF EXISTS public.coaches_public;

REVOKE ALL ON public.coaches FROM anon, authenticated;

GRANT SELECT (id, meno, pozicia, zakladajuci_clen, licencia, ocenenia, popis, foto, sort_order, created_at, updated_at)
  ON public.coaches TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.coaches TO authenticated;
GRANT ALL ON public.coaches TO service_role;

DROP POLICY IF EXISTS "Admins can view coaches" ON public.coaches;
CREATE POLICY "Anyone can view coaches"
ON public.coaches FOR SELECT
TO anon, authenticated
USING (true);