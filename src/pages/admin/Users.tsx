import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fmtDateTime } from "./shared";

const ROLES = ["admin", "moderator", "user"] as const;
type Role = (typeof ROLES)[number];

const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrátor",
  moderator: "Moderátor",
  user: "Používateľ",
};

type AppUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed: boolean;
  deactivated: boolean;
  roles: Role[];
  is_self: boolean;
};

const Users = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const call = useCallback(
    async (body: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke("admin-users", { body });
      if (error) throw new Error(error.message);
      if (data && typeof data === "object" && "error" in data && data.error) {
        throw new Error(String((data as { error: string }).error));
      }
      return data as Record<string, unknown>;
    },
    [],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await call({ action: "list" });
      setUsers((data.users ?? []) as AppUser[]);
    } catch (error) {
      toast({
        title: "Načítanie zlyhalo",
        description: error instanceof Error ? error.message : "Skúste to znova.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [call, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRole = async (user: AppUser, role: Role) => {
    const next = user.roles.includes(role)
      ? user.roles.filter((r) => r !== role)
      : [...user.roles, role];
    setBusyId(user.id);
    try {
      await call({ action: "set_roles", userId: user.id, roles: next });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, roles: [...next].sort() as Role[] } : u)),
      );
      toast({ title: "Roly aktualizované", description: user.email });
    } catch (error) {
      toast({
        title: "Zmena rolí zlyhala",
        description: error instanceof Error ? error.message : "Skúste to znova.",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  const toggleActive = async (user: AppUser) => {
    const active = user.deactivated;
    if (!active && !window.confirm(`Naozaj deaktivovať účet ${user.email}?`)) return;
    setBusyId(user.id);
    try {
      await call({ action: "set_active", userId: user.id, active });
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, deactivated: !active } : u)),
      );
      toast({
        title: active ? "Účet aktivovaný" : "Účet deaktivovaný",
        description: user.email,
      });
    } catch (error) {
      toast({
        title: "Zmena stavu zlyhala",
        description: error instanceof Error ? error.message : "Skúste to znova.",
        variant: "destructive",
      });
    } finally {
      setBusyId(null);
    }
  };

  const term = search.trim().toLowerCase();
  const visible = term ? users.filter((u) => u.email.toLowerCase().includes(term)) : users;

  return (
    <div className="space-y-6 sm:space-y-8">
      <header>
        <h1 className="font-serif text-3xl text-foreground">Používatelia</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Prehľad všetkých registrovaných účtov. Môžete meniť ich roly alebo účet deaktivovať —
          deaktivovaný používateľ sa nevie prihlásiť.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          placeholder="Hľadať podľa e-mailu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-foreground sm:max-w-sm"
        />
        <Button variant="outline" onClick={load} disabled={loading}>
          Obnoviť
        </Button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Načítavam…</p>}

      {!loading && visible.length === 0 && (
        <p className="text-sm text-muted-foreground">Žiadni používatelia.</p>
      )}

      <div className="grid gap-4">
        {visible.map((user) => (
          <article
            key={user.id}
          className="rounded-2xl border border-border bg-card p-4 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="break-all font-semibold text-foreground sm:break-normal">{user.email}</h2>
                  {user.is_self && (
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-foreground">
                      Vy
                    </span>
                  )}
                  {user.deactivated && (
                    <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-destructive">
                      Deaktivovaný
                    </span>
                  )}
                  {!user.email_confirmed && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      Nepotvrdený e-mail
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registrácia: {fmtDateTime(user.created_at)}
                  {" · "}
                  Posledné prihlásenie:{" "}
                  {user.last_sign_in_at ? fmtDateTime(user.last_sign_in_at) : "nikdy"}
                </p>
              </div>
              <Button
                variant={user.deactivated ? "outline" : "destructive"}
                size="sm"
                disabled={busyId === user.id || user.is_self}
                onClick={() => toggleActive(user)}
                className="w-full shrink-0 sm:w-auto"
              >
                {user.deactivated ? "Aktivovať" : "Deaktivovať"}
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 min-[460px]:grid-cols-3 sm:flex sm:flex-wrap">
              {ROLES.map((role) => {
                const active = user.roles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    disabled={busyId === user.id || (user.is_self && role === "admin")}
                    onClick={() => toggleRole(user, role)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors disabled:opacity-50 ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {ROLE_LABELS[role]}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Users;
