import { createClient } from "npm:@supabase/supabase-js@2";
import { sendEmail } from "../_shared/resend.ts";
import { fmtDate, fmtTime } from "../_shared/bookingEmail.ts";
import { renderCancellationEmail } from "../_shared/cancellationEmail.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE_URL = Deno.env.get("SITE_URL") ?? "https://bsga.sk";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body = await req.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token : null;
    const bookingId = typeof body?.bookingId === "string" ? body.bookingId : null;
    if (!token && !bookingId) return json({ error: "Missing token or bookingId" }, 400);

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const query = supabase.from("pc_bookings").select("*, pc_simulators(name)");
    const { data: b, error } = await (token
      ? query.eq("cancellation_token", token)
      : query.eq("id", bookingId!)
    ).maybeSingle();
    if (error) throw error;
    if (!b) return json({ error: "Booking not found" }, 404);
    if (b.status !== "cancelled") return json({ error: "Booking is not cancelled" }, 400);
    if (b.cancel_email_at) return json({ ok: true, skipped: "already sent" });

    const simName = (b as { pc_simulators?: { name?: string } }).pc_simulators?.name ?? "Simulátor";
    const endsAt =
      b.ends_at ??
      new Date(new Date(b.starts_at).getTime() + Number(b.duration_hours) * 3600000).toISOString();

    const html = renderCancellationEmail({
      firstName: b.first_name,
      lastName: b.last_name ?? "",
      date: fmtDate(b.starts_at),
      time: `${fmtTime(b.starts_at)} – ${fmtTime(endsAt)}`,
      email: b.email,
      phone: b.phone ?? "",
      simulator: simName,
      duration: `${Number(b.duration_hours)} h`,
    });

    const res = await sendEmail({
      from: "BSGA Performance Center <noreply@bsga.sk>",
      to: [b.email],
      bcc: ["info@bsga.sk"],
      reply_to: "info@bsga.sk",
      subject: `Zrušenie rezervácie – ${simName}, ${fmtDate(b.starts_at)} o ${fmtTime(b.starts_at)}`,
      html,
    });
    if (!res.ok) return json({ error: "Resend failed", status: res.status, details: res.details }, res.status);

    await supabase
      .from("pc_bookings")
      .update({ cancel_email_at: new Date().toISOString() })
      .eq("id", b.id);

    return json({ ok: true, id: res.id });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
