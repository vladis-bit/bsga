import { createOpenAI } from "npm:@ai-sdk/openai";
import { Output, streamText } from "npm:ai";
import { z } from "npm:zod";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const MODEL = "openai/gpt-6-astra";
const RUN_ID_HEADER = "X-Lovable-AIG-Run-ID";
const MAX_QUERY_LENGTH = 300;
const MAX_CATALOG_SIZE = 100;

const responseSchema = z.object({
  summary: z.string(),
  matches: z.array(z.object({
    id: z.string(),
    relevance: z.number(),
  })),
});

type CatalogItem = { id: string; description: string };

type GatewayError = Error & {
  statusCode?: number;
  responseBody?: string;
};

const jsonResponse = (body: unknown, status = 200, runId?: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      ...(runId ? { [RUN_ID_HEADER]: runId } : {}),
    },
  });

const normalizeCatalog = (value: unknown): CatalogItem[] => {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  return value.slice(0, MAX_CATALOG_SIZE).flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const candidate = item as Record<string, unknown>;
    const id = typeof candidate.id === "string" ? candidate.id.trim() : "";
    const description = typeof candidate.description === "string"
      ? candidate.description.trim().slice(0, 240)
      : "";

    if (!/^[a-z0-9-]{1,80}$/.test(id) || !description || seen.has(id)) return [];
    seen.add(id);
    return [{ id, description }];
  });
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return jsonResponse({ message: "Táto požiadavka nie je podporovaná." }, 405);

  let runId = request.headers.get(RUN_ID_HEADER)?.trim() || undefined;

  try {
    const body = await request.json().catch(() => ({}));
    const query = typeof body?.query === "string" ? body.query.trim() : "";
    const catalog = normalizeCatalog(body?.catalog);

    if (query.length < 3 || query.length > MAX_QUERY_LENGTH) {
      return jsonResponse({ message: "Zadajte opis alebo otázku v dĺžke 3 až 300 znakov." }, 400);
    }
    if (catalog.length === 0) {
      return jsonResponse({ message: "Galéria momentálne neobsahuje fotografie na vyhľadanie." }, 400);
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return jsonResponse({ message: "AI vyhľadávanie momentálne nie je nakonfigurované." }, 500);
    }

    const runIdFetch: typeof fetch = async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId && !headers.has(RUN_ID_HEADER)) headers.set(RUN_ID_HEADER, runId);
      const response = await fetch(input, { ...init, headers });
      runId = response.headers.get(RUN_ID_HEADER)?.trim() || runId;
      return response;
    };

    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch,
    });

    const result = streamText({
      model: lovable.responses(MODEL),
      output: Output.object({ schema: responseSchema }),
      maxRetries: 2,
      system: [
        "Si vyhľadávač fotografií pre slovenskú golfovú akadémiu BSGA.",
        "Podľa otázky návštevníka vyber najviac 12 relevantných fotografií z poskytnutého katalógu.",
        "Zohľadni synonymá, význam, osoby, činnosti, prostredie a udalosti uvedené v opisoch.",
        "Nevymýšľaj si obsah, ktorý nie je v opisoch. Pri nejasnej otázke vyber najbližšie zhody.",
        "Relevance je číslo od 0 do 1. Zoraď výsledky od najvyššej relevancie.",
        "Ak neexistuje rozumná zhoda, vráť prázdne matches.",
        "Summary napíš po slovensky jednou krátkou vetou pre návštevníka.",
      ].join(" "),
      prompt: `Otázka návštevníka:\n${query}\n\nKatalóg fotografií:\n${catalog
        .map((item) => `${item.id}: ${item.description}`)
        .join("\n")}`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const output = await result.output;
    const allowedIds = new Set(catalog.map((item) => item.id));
    const seenIds = new Set<string>();
    const matches = output.matches
      .filter((match) => allowedIds.has(match.id) && !seenIds.has(match.id))
      .map((match) => {
        seenIds.add(match.id);
        return {
          id: match.id,
          relevance: Math.max(0, Math.min(1, Number(match.relevance) || 0)),
        };
      })
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 12);

    return jsonResponse({ summary: output.summary.trim(), matches }, 200, runId);
  } catch (caught) {
    const error = caught as GatewayError;
    const status = typeof error.statusCode === "number" ? error.statusCode : 500;
    const safeStatus = status >= 400 && status <= 599 ? status : 500;
    let message = error.message || "AI vyhľadávanie sa nepodarilo dokončiť.";

    if (error.responseBody) {
      try {
        const parsed = JSON.parse(error.responseBody);
        if (typeof parsed?.message === "string") message = parsed.message;
        else if (typeof parsed?.error?.message === "string") message = parsed.error.message;
      } catch {
        // Keep the SDK's safe error message when the response body is not JSON.
      }
    }

    console.error("ai-gallery-search error", { status: safeStatus, message });
    return jsonResponse({ message }, safeStatus, runId);
  }
});
