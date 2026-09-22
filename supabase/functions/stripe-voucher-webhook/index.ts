import Stripe from "https://esm.sh/stripe@17.7.0?target=deno";
import { adminClient, finalizeVoucher } from "../_shared/voucher.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2025-02-24.acacia",
  });
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const signature = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event: Stripe.Event;
  try {
    if (!webhookSecret || !signature) {
      return new Response("Webhook secret not configured", { status: 400 });
    }
    event = await stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
  } catch (err) {
    console.error("Invalid Stripe signature", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        await finalizeVoucher(
          adminClient(),
          session.id,
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        );
      }
    }
  } catch (err) {
    console.error("stripe-voucher-webhook processing failed", err);
    return new Response("Processing error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
