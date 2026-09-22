-- 1. Legacy, unused RPC (replaced by cancel_pc_booking_by_token)
DROP FUNCTION IF EXISTS public.cancel_pc_booking(uuid, text, text);

-- 2. Trigger functions must not be callable through the Data API
REVOKE EXECUTE ON FUNCTION public.pc_bookings_check_blackout() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pc_bookings_check_hours() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pc_bookings_check_recurring() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pc_bookings_check_window() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.pc_bookings_set_ends_at() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;

-- 3. Voucher lifecycle housekeeping
CREATE INDEX IF NOT EXISTS idx_pc_vouchers_status_created_at ON public.pc_vouchers (status, created_at);
CREATE INDEX IF NOT EXISTS idx_pc_vouchers_valid_until ON public.pc_vouchers (valid_until) WHERE status = 'paid';

CREATE OR REPLACE FUNCTION public.pc_vouchers_housekeeping()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH abandoned AS (
    UPDATE public.pc_vouchers
       SET status = 'cancelled'
     WHERE status = 'pending'
       AND created_at < now() - interval '24 hours'
    RETURNING 1
  ), expired AS (
    UPDATE public.pc_vouchers
       SET status = 'expired'
     WHERE status = 'paid'
       AND valid_until IS NOT NULL
       AND valid_until < now()
    RETURNING 1
  ), used AS (
    UPDATE public.pc_vouchers
       SET status = 'used_up'
     WHERE status = 'paid'
       AND remaining_entries <= 0
    RETURNING 1
  )
  SELECT NULL::void;
$$;

REVOKE ALL ON FUNCTION public.pc_vouchers_housekeeping() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.pc_vouchers_housekeeping() TO service_role;

SELECT cron.schedule('pc-vouchers-housekeeping', '17 3 * * *', $$SELECT public.pc_vouchers_housekeeping();$$);