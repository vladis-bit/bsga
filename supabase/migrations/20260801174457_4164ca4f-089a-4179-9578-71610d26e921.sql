DROP POLICY IF EXISTS "Anyone can view blackouts" ON public.pc_blackouts;
DROP POLICY IF EXISTS "Blackouts are viewable by everyone" ON public.pc_blackouts;
DROP POLICY IF EXISTS "Public can view blackouts" ON public.pc_blackouts;

REVOKE SELECT ON public.pc_blackouts FROM anon;

CREATE POLICY "Admins can view blackouts"
  ON public.pc_blackouts FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));