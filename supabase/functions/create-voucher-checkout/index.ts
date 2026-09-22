import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { z } from "https://esm.sh/zod@3.23.8";
import { PACKAGES, adminClient } from "../_shared/voucher.ts";

const BodySchema = z.object({
  package: z.union([z.literal(1), z.literal(5), z.literal(10), z.literal(20)]),
  buyerName: z.string().trim().min(2).max(100),
  buyerEmail: z.string().trim().email().max(255),
  isGift: z.boolean(),
  recipientName: z.string().trim().max(100).nullable().optional(),
  dedication: z.string().trim().max(200).nullable().optional(),
});

const SITE_URL = "https://bsga.sk";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = parsed.data;
    const pkg = PACKAGES[body.package];

    const supabase = adminClient();
    const origin = req.headers.get("origin") ?? SITE_URL;

    const { data: voucher, error: insertError } = await supabase
      .from("pc_vouchers")
      .insert({
        package_entries: pkg.entries,
        price_eur: pkg.price,
        buyer_name: body.buyerName,
        buyer_email: body.buyerEmail,
        is_gift: body.isGift,
        recipient_name: body.isGift ? body.recipientName ?? null : null,
        dedication: body.isGift ? body.dedication ?? null : null,
        status: "pending",
      })
      .select("id")
      .single();
    if (insertError) throw insertError;

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-02-24.acacia",
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "sk",
      customer_email: body.buyerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: Math.round(pkg.price * 100),
            product_data: {
              name: `BSGA Performance Center – ${pkg.label}`,
              description: "Vstupy na TrackMan simulátor, každý vstup na 60 minút, platnosť 6 mesiacov.",
            },
          },
        },
      ],
      metadata: { voucher_id: voucher.id, package_entries: String(pkg.entries) },
      success_url: `${origin}/performance-center/clenstva/dakujeme?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/performance-center/clenstva`,
    });

    await supabase
      .from("pc_vouchers")
      .update({ stripe_session_id: session.id })
      .eq("id", voucher.id);

    return new Response(JSON.stringify({ checkoutUrl: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("create-voucher-checkout failed", err);
    return new Response(JSON.stringify({ error: "Checkout sa nepodarilo vytvoriť." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
