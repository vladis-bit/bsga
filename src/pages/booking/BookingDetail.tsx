import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";

type Detail = {
  starts_at: string;
  ends_at: string | null;
  duration_hours: number;
  price_eur: number;
  simulator_name: string;
  first_name: string;
  last_name: string | null;
  status: string;
};

const STATUS: Record<string, string> = {
  pending: "Čaká na potvrdenie",
  confirmed: "Potvrdená",
  cancelled: "Zrušená",
};

export const fmtBookingDate = (iso: string) => {
  const s = new Date(iso).toLocaleDateString("sk-SK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const fmtBookingTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" });

const BookingDetail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    supabase
      .rpc("get_pc_booking_by_token", { _token: token })
      .then(({ data }) => {
        setDetail(((data as Detail[]) ?? [])[0] ?? null);
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <SEO
        title="Detail rezervácie | BSGA Performance Center"
        description="Detail vašej rezervácie simulátora v BSGA Performance Center."
        path="/rezervacia/detail"
        noindex
        nofollow
      />
      <main className="theme-ivory flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
            BSGA Performance Center
          </p>
          <h1 className="font-serif text-3xl text-foreground">Detail rezervácie</h1>
          <div className="h-px w-20 bg-primary" />
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Načítavam…</p>
        ) : !detail ? (
          <p className="text-sm text-muted-foreground">
            Rezerváciu sa nepodarilo nájsť. Skontrolujte odkaz z e-mailu.
          </p>
        ) : (
          <>
            <dl className="divide-y divide-border rounded-2xl border border-border">
              {[
                ["Meno", `${detail.first_name} ${detail.last_name ?? ""}`.trim()],
                ["Dátum", fmtBookingDate(detail.starts_at)],
                [
                  "Čas",
                  `${fmtBookingTime(detail.starts_at)}${detail.ends_at ? ` – ${fmtBookingTime(detail.ends_at)}` : ""}`,
                ],
                ["Simulátor", detail.simulator_name],
                ["Dĺžka", `${Number(detail.duration_hours)} h`],
                ["Cena", `${Number(detail.price_eur).toFixed(2)} €`],
                ["Stav", STATUS[detail.status] ?? detail.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right font-bold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            {detail.status !== "cancelled" && (
              <Link
                to={`/rezervacia/zrusit?token=${token}`}
                className="inline-flex w-full items-center justify-center rounded-full border border-border px-6 py-3 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-muted"
              >
                Zrušiť rezerváciu
              </Link>
            )}
          </>
        )}
      </div>
    </main>
    </>
  );
};

export default BookingDetail;