import { useEffect, useState } from "react";
import { Download, Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { parseEventDate } from "@/data/events";
import { EVENT_CATEGORIES, defaultEventRows } from "@/lib/events-cms";

type Details = {
  subtitle: string;
  intro: string;
  price: string;
  priceNote: string;
  schedule: { day: string; title: string; items: string[]; tour?: string }[];
  contact: { name: string; email: string | string[]; phone: string };
};

type Row = {
  id: string;
  title: string;
  date_label: string | null;
  location: string | null;
  poster_url: string | null;
  category: string;
  hide_signup: boolean;
  hide_poster: boolean;
  sold_out: boolean;
  is_active: boolean;
  sort_order: number;
  details: Details | null;
};

type Draft = {
  title: string;
  date_label: string;
  location: string;
  poster_url: string;
  category: string;
  hide_signup: boolean;
  hide_poster: boolean;
  sold_out: boolean;
  is_active: boolean;
  sort_order: string;
  subtitle: string;
  intro: string;
  price: string;
  priceNote: string;
  schedule: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

/** Program ako text: "Deň | Názov | Tour" a pod ním riadky "- bod". */
const scheduleToText = (s: Details["schedule"] = []) =>
  s
    .map((d) => [[d.day, d.title, d.tour].filter(Boolean).join(" | "), ...d.items.map((i) => `- ${i}`)].join("\n"))
    .join("\n\n");

const textToSchedule = (t: string): Details["schedule"] => {
  const out: Details["schedule"] = [];
  for (const raw of t.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("-")) {
      out[out.length - 1]?.items.push(line.replace(/^-\s*/, ""));
    } else {
      const [day, title, tour] = line.split("|").map((x) => x.trim());
      out.push({ day: day ?? "", title: title ?? "", items: [], ...(tour ? { tour } : {}) });
    }
  }
  return out;
};

const toDraft = (r: Row): Draft => ({
  title: r.title,
  date_label: r.date_label ?? "",
  location: r.location ?? "",
  poster_url: r.poster_url ?? "",
  category: r.category,
  hide_signup: r.hide_signup,
  hide_poster: r.hide_poster,
  sold_out: r.sold_out,
  is_active: r.is_active,
  sort_order: String(r.sort_order),
  subtitle: r.details?.subtitle ?? "",
  intro: r.details?.intro ?? "",
  price: r.details?.price ?? "",
  priceNote: r.details?.priceNote ?? "",
  schedule: scheduleToText(r.details?.schedule),
  contactName: r.details?.contact?.name ?? "",
  contactEmail: Array.isArray(r.details?.contact?.email)
    ? r.details!.contact.email.join(", ")
    : (r.details?.contact?.email as string) ?? "",
  contactPhone: r.details?.contact?.phone ?? "",
});

const fromDraft = (d: Draft) => {
  const emails = d.contactEmail.split(",").map((e) => e.trim()).filter(Boolean);
  const hasDetails = d.subtitle || d.intro || d.price || d.schedule.trim() || d.contactName;
  return {
    title: d.title.trim() || "Bez názvu",
    subtitle: d.subtitle || null,
    date_label: d.date_label || null,
    location: d.location || null,
    poster_url: d.poster_url || null,
    year: Number(d.date_label.match(/(\d{4})\s*$/)?.[1]) || null,
    category: d.category,
    hide_signup: d.hide_signup,
    hide_poster: d.hide_poster,
    sold_out: d.sold_out,
    is_active: d.is_active,
    sort_order: Number(d.sort_order) || 100,
    details: hasDetails
      ? {
          subtitle: d.subtitle,
          intro: d.intro,
          price: d.price,
          priceNote: d.priceNote,
          schedule: textToSchedule(d.schedule),
          contact: { name: d.contactName, email: emails.length > 1 ? emails : emails[0] ?? "", phone: d.contactPhone },
        }
      : null,
  };
};

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

const AdminContentEvents = () => {
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [importing, setImporting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("events").select("*");
    if (error) toast({ title: "Načítanie zlyhalo", description: error.message, variant: "destructive" });
    const list = ((data ?? []) as unknown as Row[]).sort(
      (a, b) => a.sort_order - b.sort_order || parseEventDate(a.date_label ?? "") - parseEventDate(b.date_label ?? ""),
    );
    setRows(list);
    setDrafts(Object.fromEntries(list.map((r) => [r.id, toDraft(r)])));
    setLoading(false);
  };
  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (id: string, k: keyof Draft, v: string | boolean) =>
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [k]: v } }));

  const save = async (id: string) => {
    setSavingId(id);
    const { error } = await supabase.from("events").update(fromDraft(drafts[id]) as never).eq("id", id);
    setSavingId(null);
    if (error) return toast({ title: "Uloženie zlyhalo", description: error.message, variant: "destructive" });
    toast({ title: "Event uložený" });
    void load();
  };

  const add = async () => {
    const { error } = await supabase
      .from("events")
      .insert({ title: "Nový event", category: "upcoming", is_active: false, sort_order: 100 } as never);
    if (error) return toast({ title: "Pridanie zlyhalo", description: error.message, variant: "destructive" });
    toast({ title: "Event pridaný", description: "Doplňte údaje, zapnite zobrazenie a uložte." });
    void load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Naozaj odstrániť tento event?")) return;
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return toast({ title: "Odstránenie zlyhalo", description: error.message, variant: "destructive" });
    void load();
  };

  const importDefaults = async () => {
    if (rows.length > 0 && !window.confirm("Existujúce eventy v zozname budú nahradené eventmi, ktoré sú teraz na webe. Pokračovať?")) return;
    setImporting(true);
    if (rows.length > 0) await supabase.from("events").delete().in("id", rows.map((r) => r.id));
    const { error } = await supabase.from("events").insert(defaultEventRows() as never);
    setImporting(false);
    if (error) return toast({ title: "Import zlyhal", description: error.message, variant: "destructive" });
    toast({ title: "Eventy načítané z webu" });
    void load();
  };

  const uploadPoster = async (id: string, file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "pdf";
    const path = `events/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("content").upload(path, file);
    if (error) return toast({ title: "Nahranie zlyhalo", description: error.message, variant: "destructive" });
    const { data } = await supabase.storage.from("content").createSignedUrl(path, SIGNED_URL_TTL);
    if (data?.signedUrl) {
      set(id, "poster_url", data.signedUrl);
      toast({ title: "Plagát nahraný", description: "Nezabudnite event uložiť." });
    }
  };

  const visible = rows.filter((r) => filter === "all" || r.category === filter);
  const catLabel = (c: string) => EVENT_CATEGORIES.find((x) => x.value === c)?.label ?? c;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Eventy</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Akcie na stránke Eventy – nadchádzajúce, 2027 aj archív. Zmeny sa na webe prejavia hneď po uložení.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={importDefaults} disabled={importing}>
            {importing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Načítať eventy z webu
          </Button>
          <Button type="button" onClick={add}>
            <Plus className="mr-2 h-4 w-4" /> Pridať event
          </Button>
        </div>
      </div>

      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
        <option value="all">Všetky sekcie</option>
        {EVENT_CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      {loading ? (
        <p className="text-sm text-muted-foreground">Načítavam…</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Zatiaľ žiadne eventy. Kliknite na „Načítať eventy z webu“ alebo pridajte nový.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((r) => {
            const d = drafts[r.id];
            if (!d) return null;
            const txt = (k: keyof Draft, label: string, ph?: string) => (
              <label className="text-sm text-foreground">
                {label}
                <Input value={d[k] as string} placeholder={ph} onChange={(e) => set(r.id, k, e.target.value)} className="mt-1 text-foreground" />
              </label>
            );
            const area = (k: keyof Draft, label: string, rowsN = 3, help?: string) => (
              <label className="text-sm text-foreground sm:col-span-2">
                {label}
                <Textarea rows={rowsN} value={d[k] as string} onChange={(e) => set(r.id, k, e.target.value)} className="mt-1 text-foreground" />
                {help ? <span className="text-xs text-muted-foreground">{help}</span> : null}
              </label>
            );
            const chk = (k: keyof Draft, label: string) => (
              <label className="flex items-center gap-2 text-sm text-foreground">
                <Checkbox checked={d[k] as boolean} onCheckedChange={(v) => set(r.id, k, v === true)} />
                {label}
              </label>
            );
            return (
              <details key={r.id} className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
                  <span className="text-lg font-semibold text-foreground">{d.title || "Bez názvu"}</span>
                  <span className="text-xs text-muted-foreground">
                    {d.date_label} · {catLabel(d.category)} {d.is_active ? "" : "· skrytý"} {d.sold_out ? "· obsadené" : ""}
                  </span>
                </summary>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {txt("title", "Názov")}
                  {txt("date_label", "Termín", "napr. 3. – 4. 10. 2026")}
                  {txt("location", "Miesto")}
                  <label className="text-sm text-foreground">
                    Sekcia na stránke
                    <select value={d.category} onChange={(e) => set(r.id, "category", e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
                      {EVENT_CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </label>
                  <div className="sm:col-span-2 space-y-2">
                    {txt("poster_url", "Plagát (odkaz na PDF alebo obrázok)")}
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="text-sm text-foreground"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) void uploadPoster(r.id, f);
                        e.target.value = "";
                      }}
                    />
                  </div>
                  {txt("subtitle", "Podnadpis")}
                  {txt("sort_order", "Poradie (menšie = vyššie)")}
                  {area("intro", "Úvodný text", 4)}
                  {txt("price", "Cena")}
                  {txt("priceNote", "Poznámka k cene")}
                  {area("schedule", "Program", 8, "Každý deň: „Deň | Názov“ na samostatnom riadku, pod ním body začínajúce pomlčkou (- ...). Dni oddeľte prázdnym riadkom.")}
                  {txt("contactName", "Kontakt – meno")}
                  {txt("contactPhone", "Kontakt – telefón")}
                  {txt("contactEmail", "Kontakt – e-mail (viac oddeľte čiarkou)")}
                  <div className="flex flex-wrap gap-4 sm:col-span-2">
                    {chk("is_active", "Zobraziť na webe")}
                    {chk("sold_out", "Obsadené (ribbon)")}
                    {chk("hide_signup", "Skryť prihlásenie")}
                    {chk("hide_poster", "Skryť plagát")}
                  </div>
                </div>
                <div className="mt-6 flex justify-between gap-2">
                  <Button type="button" variant="ghost" className="text-destructive" onClick={() => remove(r.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Odstrániť
                  </Button>
                  <Button type="button" onClick={() => save(r.id)} disabled={savingId === r.id}>
                    {savingId === r.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Uložiť
                  </Button>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminContentEvents;
