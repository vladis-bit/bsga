import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { z } from "https://esm.sh/zod@3.23.8";
import { adminClient, finalizeVoucher } from "../_shared/voucher.ts";

const BodySchema = z.object({ sessionId: z.string().trim().min(10).max(255) });

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
      return new Response(JSON.stringify({ error: "Neplatný požiadavok" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { sessionId } = parsed.data;
    const supabase = adminClient();

    // Fallback, ak webhook ešte nedorazil: overíme platbu priamo v Stripe.
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2025-02-24.acacia",
    });
    const session = await stripe.checkout.sessions.retrieve(sessionId).catch(() => null);
    if (session && session.payment_status === "paid") {
      await finalizeVoucher(
        supabase,
        session.id,
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      );
    }

    const { data, error } = await supabase
      .from("pc_vouchers")
      .select("voucher_code, package_entries, price_eur, buyer_name, buyer_email, is_gift, recipient_name, valid_until, status")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return new Response(JSON.stringify({ error: "not_found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        status: data.status,
        voucherCode: data.status === "paid" ? data.voucher_code : null,
        packageEntries: data.package_entries,
        priceEur: Number(data.price_eur),
        buyerEmail: data.buyer_email,
        isGift: data.is_gift,
        recipientName: data.recipient_name,
        validUntil: data.valid_until,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("voucher-status failed", err);
    return new Response(JSON.stringify({ error: "server_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
