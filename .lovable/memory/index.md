# Memory: index.md

# Project Memory

## Core
- Dark theme "Gold Edition". Primary gold `#C5A059`. Tailwind colors are CSS variables via `addVariablesForColors` plugin.
- Visuals: `AuroraBackground`. 'gold' (dark) on Obchod, Služby, Tour, Edukačné. 'silver' (light, `bg-transparent`) on Akadémia, O nás, Galéria.
- Nav: Domov, O nás, Služby, Tour 2026, Akadémia, Obchod (`ExpandableTabs`). Kontakt v Footer.
- Buttons: `InteractiveHoverButton` for forms. `MovingBorderButton` (gold border) for primary actions. Use bold text.
- Forms: Inputs, placeholders, and selects must use black text for readability.
- Typography: Use `<strong>` tags for key phrases in service descriptions.
- Payments: Stripe Payment Links only. No custom backend checkout logic.
- Backend: Lovable Cloud. Tabuľka `contact_messages` ukladá správy z formulárov (anon insert povolený).

## Memories
- [Akadémia Page](mem://features/akademia-page) — Silver Aurora bg, static hero banner, centered text with dark gradient
- [About Page](mem://features/about-page-details) — Silver Aurora bg, full-width portrait hero, mission quote
- [Footer Layout](mem://layout/footer-design-structure) — Custom 2fr 1fr 1fr 1fr grid, legal links to specific paths
- [Shop Page](mem://features/shop-page) — Gift cards, animated subtitle, weekend course discount
- [Education Center](mem://features/education-center-hub) — Dark Aurora bg, compact layout, white nav cards
- [Contact Forms](mem://features/contact-forms) — Transparent bg form on Services, optional SK date picker
- [Stripe Integration](mem://backend/stripe-payment-integration) — Direct Stripe Payment Links for services
- [Legal Policies](mem://legal/policy-updates) — Clean centered layout, extracted from PDF, large top padding
- [Hero Canvas](mem://features/hero-interactive-canvas) — GlowyWavesHero HTML5 Canvas with count-up stats
- [Aurora Theme Rules](mem://style/aurora-visual-theme) — Specific application rules for dark/light variants
- [Services Page](mem://features/services-page-details) — 12 services including Performance Center
- [Home Layout](mem://features/home-page-layout) — Canvas hero, infinite partner loop, FAQ
- [Gallery Page](mem://features/gallery-page-details) — Silver Aurora bg, shadow-xl image cards, high top padding
- [Tour Page](mem://features/tour-page-details) — Dark Aurora bg, interactive tournament cards linking to PDFs
- [Cookie Consent](mem://features/cookie-consent) — Pro 3-button banner (Súhlasím/Odmietnuť/Nastavenia) + detailed prefs (analytics/marketing toggles), localStorage 'bsga-cookie-consent' JSON
- [Service Card Design](mem://style/service-card-design) — 16:10 ratio, white padding frame, hover zoom, custom object-position
- [3D Tilt Animations](mem://style/animations-3d-tilt) — Tilt3DCard for team cards, ±15deg rotation, staggered fade-ins
