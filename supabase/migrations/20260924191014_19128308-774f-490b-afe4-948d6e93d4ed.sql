CREATE TABLE public.pc_voucher_redemptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  voucher_id uuid NOT NULL REFERENCES public.pc_vouchers(id) ON DELETE CASCADE,
  entries integer NOT NULL DEFAULT 1,
  note text,
  redeemed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.pc_voucher_redemptions TO authenticated;
GRANT ALL ON public.pc_voucher_redemptions TO service_role;
ALTER TABLE public.pc_voucher_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage redemptions" ON public.pc_voucher_redemptions FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX pc_voucher_redemptions_voucher_idx ON public.pc_voucher_redemptions(voucher_id, created_at DESC);

GRANT INSERT ON public.pc_vouchers TO authenticated;
CREATE POLICY "Admins insert vouchers" ON public.pc_vouchers FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE OR REPLACE FUNCTION public.redeem_pc_voucher(_code text, _entries integer DEFAULT 1, _note text DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v public.pc_vouchers%ROWTYPE;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN RAISE EXCEPTION 'not authorized'; END IF;
  IF _entries IS NULL OR _entries < 1 THEN RAISE EXCEPTION 'Počet vstupov musí byť aspoň 1.'; END IF;
  SELECT * INTO v FROM public.pc_vouchers WHERE upper(voucher_code) = upper(trim(_code)) FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Poukážka s týmto kódom neexistuje.'; END IF;
  IF v.status <> 'paid' THEN RAISE EXCEPTION 'Poukážka nie je aktívna (stav: %).', v.status; END IF;
  IF v.valid_until IS NOT NULL AND v.valid_until < now() THEN RAISE EXCEPTION 'Platnosť poukážky vypršala.'; END IF;
  IF v.remaining_entries < _entries THEN RAISE EXCEPTION 'Na poukážke zostáva len % vstupov.', v.remaining_entries; END IF;
  UPDATE public.pc_vouchers
     SET remaining_entries = remaining_entries - _entries,
         status = CASE WHEN remaining_entries - _entries <= 0 THEN 'used_up' ELSE status END
   WHERE id = v.id;
  INSERT INTO public.pc_voucher_redemptions (voucher_id, entries, note, redeemed_by) VALUES (v.id, _entries, _note, auth.uid());
  RETURN jsonb_build_object('remaining', v.remaining_entries - _entries, 'total', v.package_entries);
END; $$;
REVOKE EXECUTE ON FUNCTION public.redeem_pc_voucher(text, integer, text) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.redeem_pc_voucher(text, integer, text) TO authenticated;