-- Drop admin-only policy on contact_messages (depends on has_role)
DROP POLICY IF EXISTS "Admins read contact messages" ON public.contact_messages;

-- Drop auth trigger if present
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;

-- Drop tables (CASCADE removes dependent policies)
DROP TABLE IF EXISTS public.reservations CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role) CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user_role() CASCADE;
DROP FUNCTION IF EXISTS public.get_busy_slots(date, date) CASCADE;

-- Drop enums
DROP TYPE IF EXISTS public.app_role;
DROP TYPE IF EXISTS public.reservation_type;
DROP TYPE IF EXISTS public.reservation_status;