ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS email_status TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS email_error TEXT,
  ADD COLUMN IF NOT EXISTS resend_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS resend_id TEXT;

ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_email_status_check
  CHECK (email_status IN ('pending','sent','failed'));

CREATE INDEX IF NOT EXISTS idx_contact_messages_email_status
  ON public.contact_messages (email_status);