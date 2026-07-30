DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
CREATE POLICY "Admins can view all messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_messages;
CREATE POLICY "Admins can update messages"
ON public.contact_messages
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_messages;
CREATE POLICY "Admins can delete messages"
ON public.contact_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Anyone can insert valid contact messages" ON public.contact_messages;
CREATE POLICY "Anyone can insert valid contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  (length(btrim(first_name)) >= 1 AND length(btrim(first_name)) <= 100)
  AND (last_name IS NULL OR length(last_name) <= 100)
  AND (length(btrim(email)) >= 3 AND length(btrim(email)) <= 255)
  AND (POSITION('@' IN email) > 1)
  AND (phone IS NULL OR length(phone) <= 40)
  AND (service IS NULL OR length(service) <= 120)
  AND (length(btrim(message)) >= 1 AND length(btrim(message)) <= 2000)
  AND (length(source) <= 60)
  AND (company_name IS NULL OR length(company_name) <= 200)
  AND (participant_count IS NULL OR length(participant_count) <= 50)
  AND (preferred_course IS NULL OR length(preferred_course) <= 200)
);