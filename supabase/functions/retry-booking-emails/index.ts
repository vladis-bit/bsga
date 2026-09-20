import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const BATCH_SIZE = 50;
const CONCURRENCY = 5;

type RetryResult = {
  id: string;
  ok: boolean;
  skipped?: string;
  error?: string;
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

/**
 * Server-side fallback for confirmation emails whose browser invocation never completed.
 * The confirmation function remains the single owner of the email template and sent-state logic.
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const now = new Date().toISOString();

    const { data: bookings, error } = await supabase
      .from("pc_bookings")
      .select("id")
      .eq("email_status", "pending")
      .neq("status", "cancelled")
      .lt("created_at", fiveMinutesAgo)
      .gt("starts_at", now)
      .order("created_at", { ascending: true })
      .limit(BATCH_SIZE);

    if (error) throw error;

    const results: RetryResult[] = [];
    const rows = bookings ?? [];

    for (let offset = 0; offset < rows.length; offset += CONCURRENCY) {
      const chunk = rows.slice(offset, offset + CONCURRENCY);
      const chunkResults = await Promise.all(
        chunk.map(async ({ id }): Promise<RetryResult> => {
          const { data, error: invokeError } = await supabase.functions.invoke(
            "send-booking-confirmation",
            { body: { bookingId: id } },
          );

          if (invokeError) {
            return { id, ok: false, error: invokeError.message };
          }

          return {
            id,
            ok: data?.ok === true,
            skipped: typeof data?.skipped === "string" ? data.skipped : undefined,
            error: typeof data?.error === "string" ? data.error : undefined,
          };
        }),
      );
      results.push(...chunkResults);
    }

    return json({
      ok: true,
      selected: rows.length,
      sent: results.filter((result) => result.ok && !result.skipped).length,
      skipped: results.filter((result) => result.skipped).length,
      failed: results.filter((result) => !result.ok).length,
      results,
    });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unknown error" }, 500);
  }
});