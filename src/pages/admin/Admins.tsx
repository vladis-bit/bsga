import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fmtDateTime } from "./shared";

type AdminUser = { user_id: string; email: string; granted_at: string };

const Admins = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc("list_admin_users");
    setLoading(false);
    if (error) {
      toast({ title: "Načítanie zlyhalo", description: error.message, variant: "destructive" });
      return;
    }
    setAdmins((data ?? []) as AdminUser[]);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    const { error } = await supabase.rpc("grant_admin_by_email", { _email: email.trim() });
    setBusy(false);
    if (error) {
      toast({ title: "Nepodarilo sa pridať", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Admin pridaný", description: email.trim() });
    setEmail("");
    load();
  };

  const revoke = async (target: string) => {
    setBusy(true);
    const { error } = await supabase.rpc("revoke_admin_by_email", { _email: target });
    setBusy(false);
    if (error) {
      toast({ title: "Nepodarilo sa odobrať", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Admin rola odobratá", description: target });
    load();
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Správa adminov</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pridaj alebo odober admin rolu konkrétnemu e-mailu. Používateľ musí mať už vytvorený účet.
        </p>
      </header>

      <form onSubmit={grant} className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 sm:flex-row">
        <Input
          type="email"
          required
          placeholder="email@bsga.sk"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-foreground"
        />
        <Button type="submit" disabled={busy} className="sm:w-48">
          Pridať admina
        </Button>
      </form>

      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-6 py-3">E-mail</th>
              <th className="px-6 py-3">Pridelené</th>
              <th className="px-6 py-3 text-right">Akcia</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-muted-foreground">Načítavam…</td>
              </tr>
            )}
            {!loading && admins.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-6 text-muted-foreground">Žiadni admini.</td>
              </tr>
            )}
            {admins.map((a) => (
              <tr key={a.user_id} className="border-t border-border">
                <td className="px-6 py-4 font-medium text-foreground">{a.email}</td>
                <td className="px-6 py-4 text-muted-foreground">{fmtDateTime(a.granted_at)}</td>
                <td className="px-6 py-4 text-right">
                  <Button variant="destructive" size="sm" disabled={busy} onClick={() => revoke(a.email)}>
                    Odobrať
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
