CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

SELECT cron.unschedule('pc-booking-reminders')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'pc-booking-reminders');

SELECT cron.schedule(
  'pc-booking-reminders',
  '15 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://yrjhlhvrivchgomnurdl.supabase.co/functions/v1/send-booking-reminders',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  $$
);