import { useEffect, useRef, useState } from "react";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { translateDbError } from "../shared";
import { fetchCms, type CmsRow, type CmsTable } from "@/lib/cms";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "image";

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  help?: string;
  placeholder?: string;
  /** Pole sa použije ako nadpis karty v zozname. */
  titleField?: boolean;
};

type Props = {
  table: CmsTable;
  heading: string;
  intro: string;
  fields: Field[];
  order: { column: string; ascending?: boolean }[];
  /** Predvolené hodnoty pre novú položku. */
  newRow: Record<string, unknown>;
};

const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 rokov

const ImageField = ({
  value,
  onChange,
  label,
  help,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  help?: string;
}) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("content").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) {
      setUploading(false);
      toast({ title: "Nahranie zlyhalo", description: error.message, variant: "destructive" });
      return;
    }
    const { data, error: signError } = await supabase.storage
      .from("content")
      .createSignedUrl(path, SIGNED_URL_TTL);
    setUploading(false);
    if (signError || !data?.signedUrl) {
      toast({ title: "Nahranie zlyhalo", description: signError?.message ?? "Neznáma chyba", variant: "destructive" });
      return;
    }
    onChange(data.signedUrl);
    toast({ title: "Fotka nahraná" });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-16 w-24 rounded-md border border-border object-cover"
          />
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void upload(f);
            e.target.value = "";
          }}
        />
        <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
          {value ? "Zmeniť fotku" : "Nahrať fotku"}
        </Button>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>
            Odstrániť fotku
          </Button>
        ) : null}
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="alebo vložte odkaz na obrázok"
        className="text-foreground"
      />
      {help ? <p className="text-xs text-muted-foreground">{help}</p> : null}
    </div>
  );
};

const ContentManager = ({ table, heading, intro, fields, order, newRow }: Props) => {
  const { toast } = useToast();
  const [rows, setRows] = useState<CmsRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Record<string, unknown>>>({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchCms(table, order);
      setRows(data);
      setDrafts(Object.fromEntries(data.map((r) => [r.id, { ...r }])));
    } catch (e) {
      toast({
        title: "Načítanie zlyhalo",
        description: translateDbError((e as Error).message),
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  const setValue = (id: string, name: string, value: unknown) =>
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [name]: value } }));

  const save = async (id: string) => {
    const draft = drafts[id];
    if (!draft) return;
    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const raw = draft[f.name];
      if (f.type === "number") payload[f.name] = raw === "" || raw == null ? null : Number(raw);
      else if (f.type === "boolean") payload[f.name] = Boolean(raw);
      else payload[f.name] = raw === "" ? null : raw;
    }
    setSavingId(id);
    // Tabuľka je dynamická, preto generický typ klienta obchádzame.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from(table) as any).update(payload).eq("id", id);
    setSavingId(null);
    if (error) {
      toast({ title: "Uloženie zlyhalo", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Uložené" });
    void load();
  };

  const add = async () => {
    const { error } = await supabase.from(table).insert(newRow as never);
    if (error) {
      toast({ title: "Pridanie zlyhalo", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Položka pridaná", description: "Doplňte údaje a uložte ju." });
    void load();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Naozaj odstrániť túto položku?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      toast({ title: "Odstránenie zlyhalo", description: translateDbError(error.message), variant: "destructive" });
      return;
    }
    toast({ title: "Položka odstránená" });
    void load();
  };

  const titleField = fields.find((f) => f.titleField)?.name ?? fields[0]?.name;
  const term = search.trim().toLowerCase();
  const visible = term
    ? rows.filter((r) =>
        fields.some((f) => String(r[f.name] ?? "").toLowerCase().includes(term)),
      )
    : rows;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{heading}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{intro}</p>
        </div>
        <Button type="button" onClick={add} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Pridať položku
        </Button>
      </div>

      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Hľadať…"
        className="max-w-sm text-foreground"
      />

      {loading ? (
        <p className="text-sm text-muted-foreground">Načítavam…</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Zatiaľ tu nič nie je. Pridajte prvú položku.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((row) => {
            const draft = drafts[row.id] ?? row;
            return (
              <div key={row.id} className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-foreground">
                    {String(draft[titleField] ?? "") || "Bez názvu"}
                  </h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => remove(row.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Odstrániť</span>
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => {
                    const value = draft[f.name];
                    const wide = f.type === "textarea" || f.type === "image";
                    return (
                      <div key={f.name} className={wide ? "sm:col-span-2" : undefined}>
                        {f.type === "image" ? (
                          <ImageField
                            label={f.label}
                            help={f.help}
                            value={String(value ?? "")}
                            onChange={(v) => setValue(row.id, f.name, v)}
                          />
                        ) : f.type === "boolean" ? (
                          <label className="flex items-center gap-2 pt-6 text-sm text-foreground">
                            <Checkbox
                              checked={Boolean(value)}
                              onCheckedChange={(c) => setValue(row.id, f.name, c === true)}
                            />
                            {f.label}
                          </label>
                        ) : (
                          <>
                            <label className="mb-2 block text-sm font-medium text-foreground">{f.label}</label>
                            {f.type === "textarea" ? (
                              <Textarea
                                rows={4}
                                value={String(value ?? "")}
                                placeholder={f.placeholder}
                                onChange={(e) => setValue(row.id, f.name, e.target.value)}
                                className="text-foreground"
                              />
                            ) : (
                              <Input
                                type={f.type === "number" ? "number" : "text"}
                                value={value == null ? "" : String(value)}
                                placeholder={f.placeholder}
                                onChange={(e) => setValue(row.id, f.name, e.target.value)}
                                className="text-foreground"
                              />
                            )}
                            {f.help ? <p className="mt-1 text-xs text-muted-foreground">{f.help}</p> : null}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button type="button" onClick={() => save(row.id)} disabled={savingId === row.id}>
                    {savingId === row.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Uložiť zmeny
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentManager;
