import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { sendEmail } from "./resend.ts";
import { SOCIAL_ICONS_HTML } from "./socialFooter.ts";

export const PACKAGES: Record<number, { entries: number; price: number; label: string }> = {
  1: { entries: 1, price: 24.99, label: "1 vstup" },
  5: { entries: 5, price: 119.99, label: "5 vstupov" },
  10: { entries: 10, price: 229.99, label: "10 vstupov" },
  20: { entries: 20, price: 399.99, label: "20 vstupov" },
};

export const adminClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateVoucherCode(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]);
  return `BSGA-${chars.slice(0, 4).join("")}-${chars.slice(4).join("")}`;
}

export const formatPrice = (value: number) =>
  `${value.toFixed(2).replace(".", ",")} €`;

export const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${d.getUTCDate()}.${d.getUTCMonth() + 1}.${d.getUTCFullYear()}`;
};

type Voucher = {
  id: string;
  voucher_code: string;
  package_entries: number;
  price_eur: number;
  buyer_name: string;
  buyer_email: string;
  is_gift: boolean;
  recipient_name: string | null;
  dedication: string | null;
  valid_until: string;
};

export function voucherEmailHtml(v: Voucher): string {
  return `<!DOCTYPE html>
<html lang="sk"><body style="margin:0;padding:0;background:#f5f1e8;font-family:Poppins,Arial,sans-serif;color:#111111;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f1e8;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e7e0d2;">
        <tr><td style="background:#111111;padding:24px;text-align:center;">
          <img src="https://bsga.sk/assets/emails/bsga-logo-trim.png" width="150" alt="BSGA" style="display:block;margin:0 auto;" />
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <h1 style="margin:0 0 12px;font-size:22px;color:#111111;">Ďakujeme za nákup${v.is_gift ? " darčekovej poukážky" : ""}!</h1>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333333;">
            Dobrý deň ${v.buyer_name}, vaša poukážka do BSGA Performance Center je pripravená.
          </p>
          <div style="border:2px solid #C5A059;border-radius:16px;padding:20px;text-align:center;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#888888;">Poukaz č.</p>
            <p style="margin:0;font-size:26px;font-weight:bold;letter-spacing:2px;color:#111111;">${v.voucher_code}</p>
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;color:#333333;">
            <tr><td style="padding:6px 0;">Počet vstupov</td><td align="right" style="padding:6px 0;font-weight:bold;">${v.package_entries} × 60 minút</td></tr>
            <tr><td style="padding:6px 0;">Cena</td><td align="right" style="padding:6px 0;font-weight:bold;">${formatPrice(Number(v.price_eur))}</td></tr>
            <tr><td style="padding:6px 0;">Platnosť do</td><td align="right" style="padding:6px 0;font-weight:bold;">${formatDate(v.valid_until)}</td></tr>
            ${v.is_gift && v.recipient_name ? `<tr><td style="padding:6px 0;">Obdarovaný</td><td align="right" style="padding:6px 0;font-weight:bold;">${v.recipient_name}</td></tr>` : ""}
          </table>
          ${v.is_gift && v.dedication ? `<p style="margin:18px 0 0;padding:14px 16px;background:#faf7f0;border-radius:12px;font-style:italic;font-size:14px;color:#333333;">„${v.dedication}“</p>` : ""}
          <p style="margin:24px 0 0;text-align:center;">
            <a href="https://bsga.sk/performance-center/rezervacia" style="display:inline-block;background:#C5A059;color:#111111;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;font-size:15px;">Rezervovať termín</a>
          </p>
          <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#666666;">
            Pri rezervácii alebo na recepcii stačí uviesť číslo poukážky. Vstupy môže čerpať viacero ľudí.
          </p>
        </td></tr>
        <tr><td style="padding:0 28px 28px;text-align:center;">${SOCIAL_ICONS_HTML}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendVoucherEmail(v: Voucher) {
  return await sendEmail({
    from: "BSGA Performance Center <rezervacie@bsga.sk>",
    to: [v.buyer_email],
    bcc: ["peter@bsga.sk"],
    reply_to: "peter@bsga.sk",
    subject: `Vaša poukážka ${v.voucher_code} – BSGA Performance Center`,
    html: voucherEmailHtml(v),
  });
}

// Finalizuje zaplatenú poukážku (idempotentne) a odošle e-mail.
export async function finalizeVoucher(
  supabase: ReturnType<typeof adminClient>,
  sessionId: string,
  paymentIntentId: string | null,
) {
  const { data: existing, error } = await supabase
    .from("pc_vouchers")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (error) throw error;
  if (!existing) return null;
  if (existing.status === "paid") return existing;

  const purchasedAt = new Date();
  const validUntil = new Date(purchasedAt);
  validUntil.setMonth(validUntil.getMonth() + 6);

  const { data: updated, error: updateError } = await supabase
    .from("pc_vouchers")
    .update({
      status: "paid",
      voucher_code: existing.voucher_code ?? generateVoucherCode(),
      remaining_entries: existing.package_entries,
      purchased_at: purchasedAt.toISOString(),
      valid_until: validUntil.toISOString(),
      stripe_payment_intent_id: paymentIntentId,
    })
    .eq("id", existing.id)
    .neq("status", "paid")
    .select("*")
    .maybeSingle();
  if (updateError) throw updateError;
  if (!updated) return existing;

  const result = await sendVoucherEmail(updated as Voucher);
  await supabase
    .from("pc_vouchers")
    .update(
      result.ok
        ? { email_status: "sent", email_error: null }
        : { email_status: "failed", email_error: result.details.slice(0, 500) },
    )
    .eq("id", updated.id);

  return updated;
}
