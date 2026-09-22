-- Public catalogue tables: add published flag and scope reads to it
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.shop_products ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.tour_events ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;
ALTER TABLE public.pc_pricing_slots ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
CREATE POLICY "Anyone can view published services"
ON public.services FOR SELECT TO anon, authenticated
USING (is_published);

DROP POLICY IF EXISTS "Anyone can view shop products" ON public.shop_products;
CREATE POLICY "Anyone can view published shop products"
ON public.shop_products FOR SELECT TO anon, authenticated
USING (is_published);

DROP POLICY IF EXISTS "Anyone can view tour events" ON public.tour_events;
CREATE POLICY "Anyone can view published tour events"
ON public.tour_events FOR SELECT TO anon, authenticated
USING (is_published);

DROP POLICY IF EXISTS "Anyone can view pc pricing" ON public.pc_pricing_slots;
CREATE POLICY "Anyone can view published pc pricing"
ON public.pc_pricing_slots FOR SELECT TO anon, authenticated
USING (is_published);

-- Internal operational tables: admin-only reads (public booking flow uses SECURITY DEFINER functions)
DROP POLICY IF EXISTS "Anyone can view recurring blocks" ON public.pc_recurring_blocks;
CREATE POLICY "Admins can view recurring blocks"
ON public.pc_recurring_blocks FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
REVOKE SELECT ON public.pc_recurring_blocks FROM anon;

DROP POLICY IF EXISTS "Anyone can view pc settings" ON public.pc_settings;
CREATE POLICY "Admins can view pc settings"
ON public.pc_settings FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
REVOKE SELECT ON public.pc_settings FROM anon;