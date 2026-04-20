-- Explicitly deny SELECT on contact_messages for anon and authenticated roles.
-- service_role bypasses RLS and can still read via Lovable Cloud DB UI.
CREATE POLICY "Deny all client reads of contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);