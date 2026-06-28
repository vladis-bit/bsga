# Plan: Migrate Shop to Lovable Built-in Stripe Payments

Replace the current 15 hard-coded Stripe Payment Links in the shop with a fully integrated, Lovable-managed Stripe checkout. No external Stripe account or API key required — Lovable mints a test environment immediately and handles tax/compliance.

## Why migrate
- One unified checkout under your domain (better UX, branding, trust)
- Test mode out of the box, live mode after account claim
- Tax calculation/compliance handled automatically (eligible products)
- Webhooks + order tracking in Lovable Cloud (you can see who bought what)
- Easier to add new products / variants without editing code links

## Scope
- **Shop page (`src/pages/Shop.tsx`)** — 15 products incl. merch (hoodies, caps, t-shirts) + gift cards + weekend course
- **MerchCard / variant handling** — pass selected color/size to checkout
- Keep all current product images, prices, descriptions, design

## Phases

### Phase 1 — Eligibility & enable (no code yet)
1. Run `recommend_payment_provider` to confirm Stripe fit for the catalogue (merch + gift cards).
2. Enable Lovable Stripe Payments (`enable_stripe_payments`) — you fill the short form (email, business name). Test environment goes live instantly.
3. Set tax handling default. Since merch = physical goods → **tax calculation & collection only** (`automatic_tax`, +0.5%). You handle filing/registration.

### Phase 2 — Product catalogue
4. Create all products in Stripe via `batch_create_product` with:
   - Name, description, price (EUR)
   - Tax code per product (physical goods vs. gift card vs. service)
   - Variants where relevant (hoodie colors, cap colors, t-shirt sizes)
5. Store product IDs in a typed catalogue file (e.g. `src/data/products.ts`) so the UI is data-driven.

### Phase 3 — Checkout flow
6. Add a Supabase Edge Function `create-checkout` that:
   - Receives `priceId` + quantity + selected variant
   - Creates a Stripe Checkout Session with `automatic_tax`, shipping address collection, success/cancel URLs
   - Returns the session URL
7. Wire shop "Kúpiť" buttons → call edge function → redirect to Stripe hosted checkout.
8. Build `/payment-success` and `/payment-cancelled` pages with order summary.

### Phase 4 — Order persistence (optional but recommended)
9. Create `orders` table in Lovable Cloud (id, user/email, items JSONB, total, status, stripe_session_id) with RLS.
10. Add `stripe-webhook` edge function (verify signature, insert row on `checkout.session.completed`).
11. Admin dashboard gets a new "Objednávky" tab to view orders.

### Phase 5 — Cleanup & go live
12. Remove all 15 hard-coded Payment Link URLs.
13. Test full flow in **test mode** (Stripe test card `4242 4242 4242 4242`).
14. Claim Stripe account → switch to **live mode** when ready.

## Technical notes
- Edge functions use the seamless Stripe integration (no `STRIPE_SECRET_KEY` to manage).
- Variants (hoodie color, cap color, size) → either separate Stripe products **or** one product with `metadata` passed at session creation. I'll use separate products for clean inventory/reporting.
- Shipping: Stripe Checkout collects address; you handle fulfilment manually (no shipping label automation in this plan).
- Gift cards stay as products (no balance system) — same as today.

## Out of scope (ask separately if needed)
- Inventory tracking / stock counts
- Discount codes / promotions
- Subscriptions
- Automated shipping labels
- Email receipts customization (Stripe sends default ones)

## Deliverables
- Working integrated checkout in test mode for all 15 products
- Orders table + admin view
- Old Payment Links removed
- Step-by-step instructions to claim your Stripe account and switch to live

After approval I'll start with Phase 1 (eligibility check + enable form).
