ALTER TABLE public.pc_bookings
  ADD COLUMN IF NOT EXISTS cancel_email_at timestamptz,
  ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;