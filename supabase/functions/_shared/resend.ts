// Odosielanie e-mailov cez Resend konektor (Lovable connector gateway).
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

export type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  bcc?: string[];
  reply_to?: string;
};

export type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; status: number; details: string };

export async function sendEmail(payload: EmailPayload): Promise<SendResult> {
  if (!LOVABLE_API_KEY) return { ok: false, status: 500, details: "LOVABLE_API_KEY is not configured" };
  if (!RESEND_API_KEY) return { ok: false, status: 500, details: "RESEND_API_KEY is not configured" };

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const details = await res.text();
    console.error(`Resend gateway failed [${res.status}]: ${details}`);
    return { ok: false, status: res.status, details };
  }
  const body = await res.json().catch(() => ({}));
  return { ok: true, id: (body as { id?: string })?.id ?? null };
}
