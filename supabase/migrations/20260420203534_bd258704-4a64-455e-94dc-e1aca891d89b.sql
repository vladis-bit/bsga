
-- Drop policies on contact_messages that depend on has_role
DROP POLICY IF EXISTS "Admins can view all messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can update messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admins can delete messages" ON public.contact_messages;

-- Keep only the public INSERT policy (verejný kontaktný formulár)
-- "Anyone can insert contact messages" already exists with WITH CHECK (true)

-- Drop trigger and handler that auto-assigned admin role to first user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Drop user_roles table and related role-checking infrastructure
DROP TABLE IF EXISTS public.user_roles;
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP TYPE IF EXISTS public.app_role;
