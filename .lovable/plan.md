## Cieľ
Odstrániť z projektu newsletter, prihlasovanie (auth/admin/účet), rezervačný systém a všetky edge funkcie. Web ostane čisto marketingový (Domov, O nás, Služby, Tour, Akadémia, Obchod, Edukačné centrum, Galéria, Kontakt, právne stránky).

## Zmeny v kóde

**Routing (`src/App.tsx`)**
- Odstrániť importy a `<Route>` pre: `Auth`, `Account`, `Admin`, `Reservation`, `NewsletterPopup`.
- Odstrániť aj samotný render `<NewsletterPopup />`.

**Stránky – zmazať súbory**
- `src/pages/Auth.tsx`
- `src/pages/Account.tsx`
- `src/pages/Admin.tsx`
- `src/pages/Reservation.tsx`

**Komponenty – zmazať súbory**
- `src/components/NewsletterPopup.tsx`
- `src/hooks/useAuth.tsx`

**Navigácia (`src/components/Navbar.tsx`)**
- Odstrániť položku „Rezervácia" z menu.

**Slider (`src/components/AkademiaNewsSlider.tsx`)**
- Upraviť slide, kde je text „Rezervácie otvorené" tak, aby neodkazoval na rezervačný systém (zmeniť text na neutrálny, napr. „Prihlášky cez kontakt").

**Footer / ostatné odkazy**
- Skontrolovať, či neostali odkazy na `/auth`, `/admin`, `/ucet`, `/rezervacia` — odstrániť ich.

## Backend

**Edge funkcie**
- Zmazať `supabase/functions/send-reservation-emails/` a odregistrovať funkciu cez delete tool.

**Databáza (migrácia)**
- `DROP TABLE` pre: `reservations`, `newsletter_subscribers`, `user_roles`, `profiles`.
- `DROP FUNCTION` pre: `has_role`, `handle_new_user`, `handle_new_user_role`, `get_busy_slots`.
- `DROP TYPE` pre súvisiace enumy: `app_role`, `reservation_type`, `reservation_status`.
- Tabuľka `contact_messages` ostáva (používa ju kontaktný formulár), ale jej RLS „Admins read" politika sa odstráni, keďže `has_role` zaniká. Admin už neexistuje, takže čítanie ostane zakázané (správy sa budú dať pozrieť iba cez Lovable Cloud backend UI).

## Čo ostáva nedotknuté
- Kontaktný formulár → `contact_messages` (insert-only, admin si ich pozrie v Cloud UI).
- Stripe Payment Links na Obchode/Službách.
- Všetky marketingové stránky, štýly, AuroraBackground, atď.

## Po implementácii
- Aktualizovať memory index: odstrániť referencie na Admin Dashboard a rezervačné funkcie; doplniť Core poznámku, že projekt nemá auth ani edge funkcie.
