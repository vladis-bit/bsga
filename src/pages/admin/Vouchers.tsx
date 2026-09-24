import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type Voucher = {
  id: string;
  voucher_code: string | null;
  package_entries: number;
  remaining_entries: number;
  price_eur: number;
  buyer_name: string;
  buyer_email: string;
  recipient_name: string | null;
  status: string;
  valid_until: string | null;
  created_at: string;
};

type Redemption = { id: string; voucher_id: string; entries: number; note: string | null; created_at: string };

const STATUS: Record<string, string> = {
  pending: "Čaká na platbu",
  paid: "Aktívna",
  expired: "Expirovaná",
  used_up: "Vyčerpaná",
  cancelled: "Zrušená",
};

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const genCode = () => {
  const b = new Uint8Array(8);
  crypto.getRandomValues(b);
  const c = Array.from(b, (x) => ALPHABET[x % ALPHABET.length]).join("");
  return `BSGA-${c.slice(0, 4)}-${c.slice(4)}`;
};

const fmt = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("sk-SK") : "—");
const fmtDt = (iso: string) =>
  new Date(iso).toLocaleString("sk-SK", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

const Vouchers = () => {
  const { toast } = useToast();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("paid");
  const [code, setCode] = useState("");
  const [entries, setEntries] = useState("1");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [add, setAdd] = useState({ code: "", entries: "10", name: "", email: "", price: "0", months: "6" });

  const load = async () => {
    const [v, r] = await Promise.all([
      supabase.from("pc_vouchers").select("*").not("voucher_code", "is", null).order("created_at", { ascending: false }).limit(1000),
      supabase.from("pc_voucher_redemptions").select("*").order("created_at", { ascending: false }).limit(2000),
    ]);
    setVouchers((v.data ?? []) as Voucher[]);
    setRedemptions((r.data ?? []) as Redemption[]);
    setLoading(false);
  };
  useEffect(() => {
    void load();
  }, []);

  const found = useMemo(
    () => vouchers.find((v) => (v.voucher_code ?? "").toUpperCase() === code.trim().toUpperCase()),
    [vouchers, code],
  );

  const redeem = async () => {
    setBusy(true);
    const { data, error } = await supabase.rpc("redeem_pc_voucher", {
      _code: code.trim(),
      _entries: Number(entries) || 1,
      _note: note || null,
    });
    setBusy(false);
    if (error) {
      toast({ title: "Vstup sa nepodarilo odpočítať", description: error.message, variant: "destructive" });
      return;
    }
    const d = data as { remaining: number; total: number };
    toast({ title: "Vstup odpočítaný", description: `Použité ${d.total - d.remaining}/${d.total}, zostáva ${d.remaining}.` });
    setNote("");
    setEntries("1");
    void load();
  };

  const addVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(add.entries);
    if (!Number.isInteger(n) || n < 1) {
      toast({ title: "Neplatný počet vstupov", variant: "destructive" });
      return;
    }
    const now = new Date();
    const until = new Date(now);
    until.setMonth(until.getMonth() + (Number(add.months) || 6));
    const { error } = await supabase.from("pc_vouchers").insert({
      voucher_code: (add.code.trim() || genCode()).toUpperCase(),
      package_entries: n,
      remaining_entries: n,
      price_eur: Number(add.price) || 0,
      buyer_name: add.name || "Ručne pridaná",
      buyer_email: add.email || "peter@bsga.sk",
      status: "paid",
      email_status: "skipped",
      purchased_at: now.toISOString(),
      valid_until: until.toISOString(),
    });
    if (error) {
      toast({
        title: "Poukážku sa nepodarilo pridať",
        description: /duplicate|unique/i.test(error.message) ? "Tento kód už existuje." : error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Poukážka pridaná" });
    setAdd({ code: "", entries: "10", name: "", email: "", price: "0", months: "6" });
    setShowAdd(false);
    void load();
  };

  const term = search.trim().toLowerCase();
  const visible = vouchers.filter(
    (v) =>
      (filter === "all" || v.status === filter) &&
      (!term || [v.voucher_code, v.buyer_name, v.buyer_email, v.recipient_name].some((x) => (x ?? "").toLowerCase().includes(term))),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Poukážky</h1>
          <p className="text-sm text-muted-foreground">Zadajte kód poukážky a odpočítajte použité vstupy.</p>
        </div>
        <Button variant="outline" className="rounded-full" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? "Zavrieť" : "Pridať kód ručne"}
        </Button>
      </div>

      {showAdd && (
        <form onSubmit={addVoucher} className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 xl:grid-cols-3">
          <label className="text-sm text-foreground">Kód (prázdne = vygenerovať)
            <Input className="mt-1" placeholder="BSGA-XXXX-XXXX" value={add.code} onChange={(e) => setAdd({ ...add, code: e.target.value })} />
          </label>
          <label className="text-sm text-foreground">Počet vstupov
            <Input className="mt-1" type="number" min={1} value={add.entries} onChange={(e) => setAdd({ ...add, entries: e.target.value })} required />
          </label>
          <label className="text-sm text-foreground">Platnosť (mesiace)
            <Input className="mt-1" type="number" min={1} value={add.months} onChange={(e) => setAdd({ ...add, months: e.target.value })} />
          </label>
          <label className="text-sm text-foreground">Meno majiteľa
            <Input className="mt-1" value={add.name} onChange={(e) => setAdd({ ...add, name: e.target.value })} />
          </label>
          <label className="text-sm text-foreground">E-mail
            <Input className="mt-1" type="email" value={add.email} onChange={(e) => setAdd({ ...add, email: e.target.value })} />
          </label>
          <label className="text-sm text-foreground">Cena (€)
            <Input className="mt-1" type="number" step="0.01" min={0} value={add.price} onChange={(e) => setAdd({ ...add, price: e.target.value })} />
          </label>
          <Button type="submit" className="rounded-full">Uložiť poukážku</Button>
        </form>
      )}

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground">Uplatniť poukážku</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_8rem_1fr_auto] sm:items-end">
          <label className="text-sm text-foreground">Kód
            <Input className="mt-1 font-mono uppercase" placeholder="BSGA-XXXX-XXXX" value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          <label className="text-sm text-foreground">Vstupov
            <Input className="mt-1" type="number" min={1} value={entries} onChange={(e) => setEntries(e.target.value)} />
          </label>
          <label className="text-sm text-foreground">Poznámka
            <Input className="mt-1" placeholder="napr. rezervácia 16:00" value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
          <Button className="rounded-full" onClick={redeem} disabled={busy || !code.trim()}>
            {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Odpočítať vstup
          </Button>
        </div>
        {code.trim() && (
          <p className="mt-3 text-sm text-foreground">
            {found ? (
              <>
                <strong>{found.voucher_code}</strong> · {found.buyer_name} · použité{" "}
                <strong>{found.package_entries - found.remaining_entries}/{found.package_entries}</strong> · zostáva{" "}
                <strong>{found.remaining_entries}</strong> · platnosť do {fmt(found.valid_until)} · {STATUS[found.status] ?? found.status}
              </>
            ) : (
              <span className="text-muted-foreground">Kód sa nenašiel.</span>
            )}
          </p>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Hľadať kód, meno, e-mail…" className="max-w-sm" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">
          <option value="all">Všetky stavy</option>
          {Object.entries(STATUS).map(([k, l]) => (
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
          {visible.map((v) => {
            const used = v.package_entries - v.remaining_entries;
            const pct = v.package_entries ? (used / v.package_entries) * 100 : 0;
            const hist = redemptions.filter((r) => r.voucher_id === v.id);
            return (
              <article key={v.id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button type="button" className="font-mono text-base font-semibold text-foreground hover:underline" onClick={() => setCode(v.voucher_code ?? "")}>
                    {v.voucher_code}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{used}/{v.package_entries}</span>
                    <Badge variant="outline" className="rounded-full text-[10px]">{STATUS[v.status] ?? v.status}</Badge>
                  </div>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {v.buyer_name} · {v.buyer_email}{v.recipient_name ? ` · pre ${v.recipient_name}` : ""} · zostáva {v.remaining_entries} · platnosť do {fmt(v.valid_until)}
                </p>
                {hist.length > 0 && (
                  <button type="button" className="mt-2 text-xs font-semibold text-foreground underline" onClick={() => setOpen(open === v.id ? null : v.id)}>
                    {open === v.id ? "Skryť históriu" : `História použití (${hist.length})`}
                  </button>
                )}
                {open === v.id && (
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {hist.map((r) => (
                      <li key={r.id}>{fmtDt(r.created_at)} · −{r.entries} {r.note ? `· ${r.note}` : ""}</li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vouchers;
