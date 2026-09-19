CREATE OR REPLACE FUNCTION public.cancel_pc_booking(_token uuid, _first_name text, _email text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  b public.pc_bookings%ROWTYPE;
BEGIN
  SELECT * INTO b FROM public.pc_bookings WHERE cancellation_token = _token;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Zadané údaje sa nezhodujú s rezerváciou.');
  END IF;
  IF lower(btrim(b.first_name)) <> lower(btrim(coalesce(_first_name, '')))
     OR lower(btrim(b.email)) <> lower(btrim(coalesce(_email, ''))) THEN
    RETURN jsonb_build_object('success', false, 'error', 'Zadané údaje sa nezhodujú s rezerváciou.');
  END IF;
  IF b.status = 'cancelled' THEN
    RETURN jsonb_build_object('success', true, 'already', true, 'id', b.id);
  END IF;
  IF b.starts_at <= now() + interval '3 hours' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Rezerváciu je možné zrušiť najneskôr 3 hodiny pred jej začiatkom. Kontaktujte nás, prosím, na peter@bsga.sk alebo +421 905 335 501.');
  END IF;
  UPDATE public.pc_bookings SET status = 'cancelled' WHERE id = b.id;
  RETURN jsonb_build_object('success', true, 'id', b.id);
END;
$function$;