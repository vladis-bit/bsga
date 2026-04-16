---
name: Admin Dashboard
description: /admin route, login na /auth, prvý registrovaný = admin (DB trigger)
type: feature
---
- Tabuľky: `contact_messages` (správy z formulárov), `user_roles` (enum app_role: admin/user).
- Bezpečnosť: `has_role()` security definer fn, RLS — iba admin SELECT/UPDATE/DELETE správ. INSERT pre `anon, authenticated`.
- Trigger `on_auth_user_created` → prvý user dostane admin rolu, ostatní `user`.
- Auth: email+password, auto-confirm zapnuté, leaked password protection (HIBP) zapnuté.
- Hook: `src/hooks/useAuth.tsx` — vracia `{ user, isAdmin, loading, signOut }`. Používa `onAuthStateChange` PRED `getSession()`, role check je odložený cez `setTimeout`.
- Stránky: `src/pages/Auth.tsx` (login/signup), `src/pages/Admin.tsx` (zoznam správ s filtrom prečítané/neprečítané, toggle read, delete).
- Formuláre: `SimpleContactForm` (source='home'), `ContactForm` (source='services') ukladajú do `contact_messages`.
- Dashboard noindex/nofollow. Admin link nie je v navigácii — prístup cez `/auth`.
