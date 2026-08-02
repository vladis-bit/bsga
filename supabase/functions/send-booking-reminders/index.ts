import { createClient } from "npm:@supabase/supabase-js@2";
import { sendEmail } from "../_shared/resend.ts";
import { esc, fmtDate, fmtTime, renderBookingEmail } from "../_shared/bookingEmail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://bsga.sk";

/** Pošle pripomienku pre rezervácie začínajúce v najbližších ~24 hodinách. */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const now = Date.now();
    const { data, error } = await supabase
      .from("pc_bookings")
      .select("*, pc_simulators(name)")
      .eq("status", "confirmed")
      .is("reminder_sent_at", null)
      .gte("starts_at", new Date(now).toISOString())
      .lte("starts_at", new Date(now + 26 * 3600000).toISOString())
      .order("starts_at", { ascending: true })
      .limit(50);
    if (error) throw error;

    const results: { id: string; ok: boolean; details?: string }[] = [];

    for (const b of data ?? []) {
      const simName = (b as { pc_simulators?: { name?: string } }).pc_simulators?.name ?? "Simulátor";
      const endsAt =
        b.ends_at ??
        new Date(new Date(b.starts_at).getTime() + Number(b.duration_hours) * 3600000).toISOString();
      const detailUrl = `${SITE_URL}/rezervacia/detail?token=${b.cancellation_token}`;
      const cancelUrl = `${SITE_URL}/rezervacia/zrusit?token=${b.cancellation_token}`;

      const html = renderBookingEmail({
        badge: "Pripomienka",
        heading: "Zajtra vás čakáme v Performance Center",
        intro: `Dobrý deň, ${esc(b.first_name)}, pripomíname Vám blížiaci sa termín na simulátore. Prídite, prosím, cca 10 minút vopred.`,
        rows: [
          ["Simulátor", simName],
          ["Dátum", fmtDate(b.starts_at)],
          ["Čas", `${fmtTime(b.starts_at)} – ${fmtTime(endsAt)}`],
          ["Cena", `${Number(b.price_eur).toFixed(2)} €`],
        ],
        cta: { label: "Detail rezervácie", url: detailUrl },
        secondary: { label: "Stornovať", url: cancelUrl },
        note: "Vezmite si športovú obuv s čistou podrážkou. Palice a loptičky sú k dispozícii na mieste.",
      });

      const res = await sendEmail({
        from: "BSGA Performance Center <noreply@bsga.sk>",
        to: [b.email],
        reply_to: "info@bsga.sk",
        subject: `Pripomienka – ${simName}, ${fmtDate(b.starts_at)} o ${fmtTime(b.starts_at)}`,
        html,
      });

      if (res.ok) {
        await supabase
          .from("pc_bookings")
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq("id", b.id);
        results.push({ id: b.id, ok: true });
      } else {
        results.push({ id: b.id, ok: false, details: res.details });
      }
    }

    return json({ ok: true, processed: results.length, results });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
