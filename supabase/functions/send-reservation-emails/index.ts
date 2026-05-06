import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { reservationId } = await req.json();
    if (!reservationId) {
      return new Response(JSON.stringify({ error: "reservationId required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: r, error } = await supabase.from("reservations").select("*").eq("id", reservationId).maybeSingle();
    if (error || !r) {
      return new Response(JSON.stringify({ error: "Reservation not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const dateStr = new Date(r.reservation_date).toLocaleDateString("sk-SK", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    const timeStr = String(r.reservation_time).slice(0, 5);
    const serviceLabel = r.type === "lesson" ? `Lekcia s trénerom ${r.trainer_name}` : `Performance Center — ${r.equipment}`;

    // Send to client
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "reservation-confirmation",
        recipientEmail: r.email,
        idempotencyKey: `res-client-${r.id}`,
        templateData: {
          name: `${r.first_name} ${r.last_name}`,
          service: serviceLabel,
          date: dateStr,
          time: timeStr,
        },
      },
    }).catch((e) => console.error("client email failed", e));

    // Send to trainer if lesson
    if (r.type === "lesson" && r.trainer_email) {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "trainer-notification",
          recipientEmail: r.trainer_email,
          idempotencyKey: `res-trainer-${r.id}`,
          templateData: {
            trainerName: r.trainer_name,
            clientName: `${r.first_name} ${r.last_name}`,
            clientEmail: r.email,
            clientPhone: r.phone,
            date: dateStr,
            time: timeStr,
            notes: r.notes ?? "",
          },
        },
      }).catch((e) => console.error("trainer email failed", e));
    }

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});