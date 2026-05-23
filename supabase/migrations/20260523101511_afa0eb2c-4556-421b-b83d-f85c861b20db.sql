-- 1) Remove overly-permissive newsletter read policy
DROP POLICY IF EXISTS "Authenticated can view subscribers" ON public.newsletter_subscribers;

-- 2) Lock down user_roles writes to admins only
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3) Revoke EXECUTE on trigger-only SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user_role() FROM anon, authenticated, PUBLIC;