import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fmtBookingDate, fmtBookingTime } from "./BookingDetail";
import SEO from "@/components/SEO";

type Detail = {
  starts_at: string;
  duration_hours: number;
  simulator_name: string;
  status: string;
};

const BookingCancel = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (!token) return;
    supabase.rpc("get_pc_booking_by_token", { _token: token }).then(({ data }) => {
      const d = ((data as Detail[]) ?? [])[0] ?? null;
      setDetail(d);
      if (d?.status === "cancelled") setCancelled(true);
    });
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError(null);
    const { data, error: rpcError } = await supabase.rpc("cancel_pc_booking", {
      _token: token,
      _first_name: firstName,
      _email: email,
    });
    setLoading(false);
    const result = data as { success?: boolean; error?: string } | null;
    if (rpcError || !result?.success) {
      setError(result?.error ?? "Zadané údaje sa nezhodujú s rezerváciou.");
      return;
    }
    setCancelled(true);
    supabase.functions
      .invoke("send-booking-cancellation", { body: { token } })
      .catch((err) => console.error("send-booking-cancellation failed:", err));
  };

  return (
    <>
      <SEO
        title="Zrušenie rezervácie | BSGA Performance Center"
        description="Zrušenie rezervácie simulátora v BSGA Performance Center."
        path="/rezervacia/zrusit"
        noindex
        nofollow
      />
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            BSGA Performance Center
          </p>
          <h1 className="font-serif text-3xl text-foreground">Zrušenie rezervácie</h1>
          <div className="h-px w-20 bg-primary" />
        </div>

        {!token ? (
          <p className="text-sm text-muted-foreground">Chýba odkaz s kódom rezervácie.</p>
        ) : cancelled ? (
          <p className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-foreground">
            Rezervácia bola zrušená. Termín je opäť voľný pre ostatných klientov.
          </p>
        ) : (
          <>
            {detail && (
              <p className="text-sm text-muted-foreground">
                {detail.simulator_name} · {fmtBookingDate(detail.starts_at)} o{" "}
                {fmtBookingTime(detail.starts_at)} ({Number(detail.duration_hours)} h)
              </p>
            )}
            <form onSubmit={submit} className="space-y-3">
              <p className="text-sm text-foreground">
                Zadajte meno a e-mail pre potvrdenie stornovania.
              </p>
              <Input
                placeholder="Meno"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <p className="text-sm font-bold text-destructive">{error}</p>}
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? "Ruším…" : "Zrušiť rezerváciu"}
              </Button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default BookingCancel;