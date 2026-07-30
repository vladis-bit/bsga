import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const KIDS = ["Detská akadémia", "Detský kemp"];
const CORP = ["Firemný teambuilding", "Firemné akcie"];

function pickRecipient(source: string, service: string | null): string {
  if (source === "services" && service) {
    if (KIDS.includes(service)) return "kids@bsga.sk";
    if (CORP.includes(service)) return "bsga@bsga.sk";
  }
  if (source.startsWith("corporate")) return "bsga@bsga.sk";
  return "info@bsga.sk";
}

const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json().catch(() => ({}));
    const messageId = typeof body?.messageId === "string" ? body.messageId : null;
    if (!messageId || !/^[0-9a-f-]{36}$/i.test(messageId)) {
      return new Response(JSON.stringify({ error: "Invalid messageId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: msg, error } = await supabase
      .from("contact_messages")
      .select("*")
      .eq("id", messageId)
      .maybeSingle();

    if (error) throw error;
    if (!msg) {
      return new Response(JSON.stringify({ error: "Message not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const to = pickRecipient(msg.source ?? "", msg.service ?? null);
    const fullName = `${msg.first_name ?? ""} ${msg.last_name ?? ""}`.trim();
    const subject = `Nová správa: ${msg.service || "Kontaktný formulár"} – ${fullName}`;

    const row = (label: string, value: unknown) =>
      value
        ? `<tr><td style="padding:6px 12px 6px 0;color:#6b6357;font-size:14px;">${label}</td><td style="padding:6px 0;color:#111;font-size:14px;"><strong>${esc(value)}</strong></td></tr>`
        : "";

    const html = `
<div style="font-family:Helvetica,Arial,sans-serif;background:#FAF7F2;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e7e0d5;border-radius:16px;padding:28px;">
    <h1 style="margin:0 0 4px;font-size:20px;color:#111;">Nová správa z webu BSGA</h1>
    <p style="margin:0 0 20px;color:#8a8072;font-size:13px;">Zdroj formulára: ${esc(msg.source)}</p>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Meno", fullName)}
      ${row("E-mail", msg.email)}
      ${row("Telefón", msg.phone)}
      ${row("Služba", msg.service)}
      ${row("Preferovaný dátum", msg.preferred_date)}
      ${row("Firma", msg.company_name)}
      ${row("Počet účastníkov", msg.participant_count)}
      ${row("Preferované ihrisko", msg.preferred_course)}
    </table>
    <div style="margin-top:20px;padding:16px;background:#FAF7F2;border-radius:12px;color:#111;font-size:14px;white-space:pre-wrap;">${esc(msg.message)}</div>
    <p style="margin:24px 0 0;font-size:13px;color:#6b6357;">
      Správu nájdeš aj v admin paneli: <a href="https://www.bsga.sk/admin" style="color:#C5A059;">www.bsga.sk/admin</a> (tabuľka <code>contact_messages</code>).
    </p>
    <p style="margin:8px 0 0;font-size:12px;color:#a09786;">Prijaté: ${esc(
      new Date(msg.created_at ?? Date.now()).toLocaleString("sk-SK", { timeZone: "Europe/Bratislava" })
    )}</p>
  </div>
</div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BSGA Web <noreply@bsga.sk>",
        to: [to],
        reply_to: msg.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const details = await res.text();
      console.error(`Resend failed [${res.status}]: ${details}`);
      return new Response(JSON.stringify({ error: "Email send failed", status: res.status, details }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await res.json();
    return new Response(JSON.stringify({ ok: true, to, id: result?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-contact-notification error:", e);
    return new Response(JSON.stringify({ error: String((e as Error)?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
