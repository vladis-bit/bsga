import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { z } from "https://esm.sh/zod@3.23.8";
import { adminClient } from "../_shared/voucher.ts";

const BodySchema = z.object({
  package: z.number().int().min(1).max(200),
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
    const supabase = adminClient();
    // Cena sa berie výhradne z databázy (admin centrum), nikdy z frontendu.
    const { data: pkgRow } = await supabase
      .from("pc_membership_packages")
      .select("entries, price_eur, label")
      .eq("entries", body.package)
      .eq("is_published", true)
      .maybeSingle();
    if (!pkgRow) {
      return new Response(JSON.stringify({ error: "Balík nie je dostupný." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const pkg = { entries: pkgRow.entries as number, price: Number(pkgRow.price_eur), label: pkgRow.label as string };
    const origin = req.headers.get("origin") ?? SITE_URL;

    // Ochrana proti zneužitiu: max. 25 objednávok za hodinu z jednej IP adresy aj z jedného e-mailu.
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "";
    const limits: [string, string][] = [
      ["voucher_checkout_email", body.buyerEmail],
      ...(ip ? ([["voucher_checkout_ip", ip]] as [string, string][]) : []),
    ];
    for (const [scope, identifier] of limits) {
      const { data: allowed, error: limitError } = await supabase.rpc("consume_rate_limit", {
        _scope: scope,
        _identifier: identifier,
        _limit: 25,
        _window_seconds: 3600,
      });
      if (limitError) console.error("rate limit check failed", limitError);
      if (allowed === false) {
        return new Response(
          JSON.stringify({
            error:
              "Príliš veľa pokusov o objednávku. Skúste to prosím o hodinu alebo nás kontaktujte na peter@bsga.sk.",
          }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }


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
