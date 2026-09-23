
ALTER TABLE public.coaches ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

GRANT SELECT ON public.coaches TO anon;

DROP POLICY IF EXISTS "Anyone can view published coaches" ON public.coaches;
CREATE POLICY "Anyone can view published coaches"
  ON public.coaches FOR SELECT
  TO anon, authenticated
  USING (is_published);

-- Storage policies for the private "content" bucket (admins only; public pages use signed URLs)
DROP POLICY IF EXISTS "Admins can read content files" ON storage.objects;
CREATE POLICY "Admins can read content files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can upload content files" ON storage.objects;
CREATE POLICY "Admins can upload content files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can update content files" ON storage.objects;
CREATE POLICY "Admins can update content files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS "Admins can delete content files" ON storage.objects;
CREATE POLICY "Admins can delete content files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'content' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Rate limiting
CREATE TABLE IF NOT EXISTS public.rate_limit_hits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope text NOT NULL,
  identifier text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.rate_limit_hits TO service_role;
ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view rate limit hits" ON public.rate_limit_hits;
CREATE POLICY "Admins can view rate limit hits"
  ON public.rate_limit_hits FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

GRANT SELECT ON public.rate_limit_hits TO authenticated;

CREATE INDEX IF NOT EXISTS rate_limit_hits_lookup_idx
  ON public.rate_limit_hits (scope, identifier, created_at DESC);

CREATE OR REPLACE FUNCTION public.consume_rate_limit(
  _scope text,
  _identifier text,
  _limit integer DEFAULT 25,
  _window_seconds integer DEFAULT 3600
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _count integer;
BEGIN
  IF _identifier IS NULL OR length(trim(_identifier)) = 0 THEN
    RETURN true;
  END IF;

  DELETE FROM public.rate_limit_hits
   WHERE created_at < now() - interval '7 days';

  SELECT count(*) INTO _count
    FROM public.rate_limit_hits
   WHERE scope = _scope
     AND identifier = lower(trim(_identifier))
     AND created_at > now() - make_interval(secs => _window_seconds);

  IF _count >= _limit THEN
    RETURN false;
  END IF;

  INSERT INTO public.rate_limit_hits (scope, identifier)
  VALUES (_scope, lower(trim(_identifier)));

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_rate_limit(text, text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_rate_limit(text, text, integer, integer) TO service_role;

CREATE OR REPLACE FUNCTION public.contact_messages_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _count integer;
BEGIN
  SELECT count(*) INTO _count
    FROM public.contact_messages
   WHERE lower(email) = lower(NEW.email)
     AND created_at > now() - interval '1 hour';

  IF _count >= 25 THEN
    RAISE EXCEPTION 'Príliš veľa správ z tohto e-mailu. Skúste to prosím neskôr alebo nás kontaktujte na info@bsga.sk.';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS contact_messages_rate_limit_trg ON public.contact_messages;
CREATE TRIGGER contact_messages_rate_limit_trg
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.contact_messages_rate_limit();
