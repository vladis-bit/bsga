import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ContentManager from "./ContentManager";

type Voucher = {
  id: string;
  voucher_code: string | null;
  package_entries: number;
  remaining_entries: number;
  price_eur: number;
  buyer_name: string;
  buyer_email: string;
  is_gift: boolean;
  recipient_name: string | null;
  status: string;
  email_status: string;
  purchased_at: string | null;
  valid_until: string | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Čaká na platbu",
  paid: "Zaplatená",
  expired: "Expirovaná",
  used_up: "Vyčerpaná",
  cancelled: "Zrušená",
};

const fmtDate = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("sk-SK") : "—");

const VoucherRow = ({ v, onSaved }: { v: Voucher; onSaved: () => void }) => {
  const { toast } = useToast();
  const [remaining, setRemaining] = useState(String(v.remaining_entries));
  const [validUntil, setValidUntil] = useState(v.valid_until ? v.valid_until.slice(0, 10) : "");
  const [status, setStatus] = useState(v.status);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    const n = Number(remaining);
    if (!Number.isInteger(n) || n < 0 || n > v.package_entries) {
      toast({ title: "Neplatný počet vstupov", description: `Zadajte 0 – ${v.package_entries}.`, variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase
      .from("pc_vouchers")
      .update({
        remaining_entries: n,
        status,
        valid_until: validUntil ? new Date(`${validUntil}T23:59:59`).toISOString() : null,
      })
      .eq("id", v.id);
    setSaving(false);
    if (error) {
      toast({ title: "Uloženie zlyhalo", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Poukážka uložená" });
    onSaved();
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-base font-semibold text-foreground">{v.voucher_code ?? "— (nezaplatená)"}</p>
          <p className="text-sm text-muted-foreground">
            {v.buyer_name} · {v.buyer_email}
            {v.is_gift ? ` · darček${v.recipient_name ? ` pre ${v.recipient_name}` : ""}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">
            {v.package_entries} vstupov · {Number(v.price_eur).toFixed(2).replace(".", ",")} € · kúpená {fmtDate(v.purchased_at ?? v.created_at)} · e-mail: {v.email_status}
          </p>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
          {STATUS_LABELS[v.status] ?? v.status}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-4 sm:items-end">
        <label className="text-sm text-foreground">
          Zostávajúce vstupy
          <Input type="number" min={0} max={v.package_entries} value={remaining} onChange={(e) => setRemaining(e.target.value)} className="mt-1 text-foreground" />
        </label>
        <label className="text-sm text-foreground">
          Platnosť do
          <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="mt-1 text-foreground" />
        </label>
        <label className="text-sm text-foreground">
          Stav
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
            {Object.entries(STATUS_LABELS).map(([k, l]) => (
              <option key={k} value={k}>{l}</option>
            ))}
          </select>
        </label>
        <Button type="button" onClick={save} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Uložiť
        </Button>
      </div>
    </div>
  );
};

const SoldVouchers = () => {
  const [rows, setRows] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("paid");

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("pc_vouchers").select("*").order("created_at", { ascending: false }).limit(500);
    setRows((data ?? []) as Voucher[]);
    setLoading(false);
  };
  useEffect(() => {
    void load();
  }, []);

  const term = search.trim().toLowerCase();
  const visible = rows.filter(
    (r) =>
      (status === "all" || r.status === status) &&
      (!term || [r.voucher_code, r.buyer_name, r.buyer_email, r.recipient_name].some((x) => (x ?? "").toLowerCase().includes(term))),
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Predané poukážky</h2>
        <p className="mt-1 text-sm text-muted-foreground">Upravte zostávajúce vstupy, platnosť alebo stav poukážky.</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Hľadať číslo, meno, e-mail…" className="max-w-sm text-foreground" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
          <option value="all">Všetky stavy</option>
          {Object.entries(STATUS_LABELS).map(([k, l]) => (
            <option key={k} value={k}>{l}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p className="text-sm text-muted-foreground">Načítavam…</p>
      ) : visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">Žiadne poukážky.</p>
      ) : (
        <div className="space-y-3">
          {visible.map((v) => (
            <VoucherRow key={`${v.id}-${v.remaining_entries}-${v.status}-${v.valid_until}`} v={v} onSaved={load} />
          ))}
        </div>
      )}
    </div>
  );
};

const AdminContentMemberships = () => (
  <div className="space-y-12">
    <ContentManager
      table="pc_membership_packages"
      heading="Permanentky a členstvá"
      intro="Balíky vstupov na stránke Členstvá a v Obchode. Cena sa použije aj pri platbe. Počet vstupov musí byť jedinečný."
      order={[{ column: "sort_order" }, { column: "entries" }]}
      newRow={{ entries: 30, label: "30 vstupov", price_eur: 599.99, sort_order: 99, is_published: false }}
      fields={[
        { name: "label", label: "Názov", titleField: true },
        { name: "entries", label: "Počet vstupov (60 min)", type: "number" },
        { name: "price_eur", label: "Cena (€)", type: "number" },
        { name: "savings", label: "Úspora", placeholder: "napr. ušetríte 4,96 €" },
        { name: "badge", label: "Odznak", placeholder: "napr. Najobľúbenejšie" },
        { name: "validity_months", label: "Platnosť (mesiace)", type: "number" },
        { name: "image", label: "Obrázok poukážky", type: "image", help: "Ak je prázdne, použije sa zabudovaný obrázok." },
        { name: "sort_order", label: "Poradie", type: "number" },
        { name: "is_published", label: "Zobraziť na webe", type: "boolean" },
      ]}
    />
    <SoldVouchers />
  </div>
);

export default AdminContentMemberships;
