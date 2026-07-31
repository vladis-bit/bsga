import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://bsga.sk";

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sk-SK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Bratislava",
  });

const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bratislava",
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json().catch(() => ({}));
    const bookingId = typeof body?.bookingId === "string" ? body.bookingId : null;
    if (!bookingId || !/^[0-9a-f-]{36}$/i.test(bookingId)) {
      return json({ error: "Invalid bookingId" }, 400);
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: b, error } = await supabase
      .from("pc_bookings")
      .select("*, pc_simulators(name)")
      .eq("id", bookingId)
      .maybeSingle();
    if (error) throw error;
    if (!b) return json({ error: "Booking not found" }, 404);
    if (b.email_status === "sent") return json({ ok: true, skipped: "already sent" });

    const simName = (b as { pc_simulators?: { name?: string } }).pc_simulators?.name ?? "Simulátor";
    const detailUrl = `${SITE_URL}/rezervacia/detail?token=${b.cancellation_token}`;
    const cancelUrl = `${SITE_URL}/rezervacia/zrusit?token=${b.cancellation_token}`;
    const endsAt =
      b.ends_at ?? new Date(new Date(b.starts_at).getTime() + Number(b.duration_hours) * 3600000).toISOString();

    const row = (label: string, value: unknown) =>
      `<tr><td style="padding:6px 12px 6px 0;color:#6b6357;font-size:14px;">${label}</td><td style="padding:6px 0;color:#111;font-size:14px;"><strong>${esc(value)}</strong></td></tr>`;

    const html = `
<div style="font-family:Helvetica,Arial,sans-serif;background:#FAF7F2;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e0d5;border-radius:16px;padding:28px;">
    <h1 style="margin:0 0 4px;font-size:20px;color:#111;">Potvrdenie rezervácie</h1>
    <p style="margin:0 0 20px;color:#8a8072;font-size:13px;">BSGA Performance Center · Zuzany Chalupovej 12, Bratislava</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Meno", `${b.first_name ?? ""} ${b.last_name ?? ""}`.trim())}
      ${row("Dátum", fmtDate(b.starts_at))}
      ${row("Čas", `${fmtTime(b.starts_at)} – ${fmtTime(endsAt)}`)}
      ${row("Simulátor", simName)}
      ${row("Dĺžka", `${Number(b.duration_hours)} h`)}
      ${row("Cena", `${Number(b.price_eur).toFixed(2)} €`)}
    </table>
    <div style="margin-top:24px;">
      <a href="${detailUrl}" style="display:inline-block;background:#C5A059;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;font-weight:bold;">Detail rezervácie</a>
      <a href="${cancelUrl}" style="display:inline-block;margin-left:8px;border:1px solid #e7e0d5;color:#111;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:13px;font-weight:bold;">Zrušiť rezerváciu</a>
    </div>
    <p style="margin:24px 0 0;color:#8a8072;font-size:12px;">V prípade otázok nás kontaktujte na peter@bsga.sk alebo +421 905 335 501.</p>
  </div>
</div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BSGA Performance Center <noreply@bsga.sk>",
        to: [b.email],
        bcc: ["info@bsga.sk"],
        reply_to: "peter@bsga.sk",
        subject: `Potvrdenie rezervácie – ${simName}, ${fmtDate(b.starts_at)} o ${fmtTime(b.starts_at)}`,
        html,
      }),
    });

    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      await supabase
        .from("pc_bookings")
        .update({ email_status: "failed", email_error: JSON.stringify(payload).slice(0, 500) })
        .eq("id", bookingId);
      return json({ error: "Resend failed", details: payload }, 502);
    }

    await supabase
      .from("pc_bookings")
      .update({
        email_status: "sent",
        email_error: null,
        resend_at: new Date().toISOString(),
        resend_id: payload?.id ?? null,
      })
      .eq("id", bookingId);

    return json({ ok: true, id: payload?.id ?? null });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});