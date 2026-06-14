DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;

CREATE POLICY "Anyone can insert valid contact messages"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(first_name)) BETWEEN 1 AND 100
  AND (last_name IS NULL OR length(last_name) <= 100)
  AND length(btrim(email)) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND (phone IS NULL OR length(phone) <= 40)
  AND (service IS NULL OR length(service) <= 120)
  AND length(btrim(message)) BETWEEN 1 AND 2000
  AND length(source) <= 60
);