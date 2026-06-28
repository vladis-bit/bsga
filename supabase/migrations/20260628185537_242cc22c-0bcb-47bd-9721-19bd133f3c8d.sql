ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS participant_count TEXT;
ALTER TABLE public.contact_messages ADD COLUMN IF NOT EXISTS preferred_course TEXT;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;