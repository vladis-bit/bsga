import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ContentManager from "./ContentManager";

const TEXT_FIELDS = [
  { key: "tour2027_title", label: "Nadpis sekcie", placeholder: "BSGA Tour 2027" },
  { key: "tour2027_subtitle", label: "Podnadpis (zlatý)", placeholder: "11. ročník" },
  { key: "tour2027_intro", label: "Úvodný text (voliteľný)", placeholder: "Krátky text pod nadpisom", long: true },
];

const AdminContentTour2027 = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (supabase.from("site_texts" as any) as any)
      .select("key,value")
      .in("key", TEXT_FIELDS.map((f) => f.key))
      .then(({ data }: { data: { key: string; value: string }[] | null }) => {
        setValues(Object.fromEntries((data ?? []).map((r) => [r.key, r.value])));
        setLoading(false);
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const rows = TEXT_FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("site_texts" as any) as any).upsert(rows);
    setSaving(false);
    toast(error ? { title: "Uloženie zlyhalo", description: error.message, variant: "destructive" } : { title: "Texty uložené" });
  };

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">Texty sekcie BSGA Tour 2027</h2>
        <p className="mt-1 text-sm text-muted-foreground">Prázdne pole = zobrazí sa predvolený text.</p>
        {loading ? (
          <Loader2 className="mt-4 h-5 w-5 animate-spin text-muted-foreground" />
        ) : (
          <div className="mt-4 space-y-4">
            {TEXT_FIELDS.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label className="block text-sm font-medium text-foreground">{f.label}</label>
                {f.long ? (
                  <Textarea className="text-black" rows={3} placeholder={f.placeholder} value={values[f.key] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
                ) : (
                  <Input className="text-black" placeholder={f.placeholder} value={values[f.key] ?? ""} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
                )}
              </div>
            ))}
            <Button onClick={save} disabled={saving} className="w-full font-bold sm:w-auto">
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Uložiť texty
            </Button>
          </div>
        )}
      </section>

      <ContentManager
        table="tour_events"
        filter={{ column: "rok", value: 2027 }}
        heading="Termíny a lokality 2027"
        intro="Turnaje sezóny 2027. Ak tu nie je žiadny turnaj, na webe sa zobrazí 5 kariet „TBD“."
        order={[{ column: "cislo_turnaja" }]}
        newRow={{ rok: 2027, cislo_turnaja: 1, lokalita: "TBD", datum: "TBD", is_published: true }}
        fields={[
          { name: "lokalita", label: "Lokalita", titleField: true },
          { name: "cislo_turnaja", label: "Číslo turnaja", type: "number" },
          { name: "datum", label: "Termín", placeholder: "15.5.2027" },
          { name: "partner_prezentujuci", label: "Prezentujúci partner" },
          { name: "obrazok", label: "Fotka", type: "image" },
          { name: "odkaz_lokalita", label: "Odkaz na mapu" },
          { name: "promo_letak", label: "Odkaz na promo leták (PDF)" },
          { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
        ]}
      />
    </div>
  );
};

export default AdminContentTour2027;
