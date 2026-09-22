CREATE TABLE public.pc_vouchers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voucher_code text UNIQUE,
  package_entries integer NOT NULL,
  remaining_entries integer NOT NULL DEFAULT 0,
  price_eur numeric NOT NULL,
  buyer_name text NOT NULL,
  buyer_email text NOT NULL,
  is_gift boolean NOT NULL DEFAULT false,
  recipient_name text,
  dedication text,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  status text NOT NULL DEFAULT 'pending',
  email_status text NOT NULL DEFAULT 'pending',
  email_error text,
  purchased_at timestamp with time zone,
  valid_until timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT pc_vouchers_status_check CHECK (status IN ('pending','paid','expired','used_up','cancelled')),
  CONSTRAINT pc_vouchers_package_check CHECK (package_entries IN (1,5,10,20))
);

GRANT ALL ON public.pc_vouchers TO service_role;

ALTER TABLE public.pc_vouchers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view vouchers" ON public.pc_vouchers FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
GRANT SELECT ON public.pc_vouchers TO authenticated;

CREATE TRIGGER update_pc_vouchers_updated_at BEFORE UPDATE ON public.pc_vouchers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();