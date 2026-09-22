import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

type VoucherStatus = {
  status: string;
  voucherCode: string | null;
  packageEntries: number;
  priceEur: number;
  buyerEmail: string;
  isGift: boolean;
  recipientName: string | null;
  validUntil: string | null;
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("sk-SK") : "";

const VoucherThankYou = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [data, setData] = useState<VoucherStatus | null>(null);
  const [failed, setFailed] = useState(false);
  const attempts = useRef(0);

  useEffect(() => {
    if (!sessionId) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const poll = async () => {
      attempts.current += 1;
      const { data: res, error } = await supabase.functions.invoke("voucher-status", {
        body: { sessionId },
      });
      if (cancelled) return;
      if (!error && res) {
        setData(res as VoucherStatus);
        if ((res as VoucherStatus).status === "paid") return;
      }
      if (attempts.current >= 10) {
        setFailed(true);
        return;
      }
      timer = setTimeout(poll, 3000);
    };

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [sessionId]);

  const paid = data?.status === "paid";

  return (
    <>
      <SEO
        title="Ďakujeme za nákup | BSGA Performance Center"
        description="Potvrdenie nákupu darčekovej poukážky do BSGA Performance Center."
        path="/performance-center/clenstva/dakujeme"
        noindex
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main className="container mx-auto px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
          <div className="mx-auto max-w-xl rounded-[1.25rem] border border-border bg-card p-8 text-center shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]">
            {paid ? (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h1 className="mt-4 font-serif text-3xl font-bold">Ďakujeme za nákup!</h1>
                <p className="mt-3 text-foreground/70">
                  Poukážku sme poslali na {data?.buyerEmail}.
                </p>
                <div className="mt-6 rounded-2xl border-2 border-gold px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60">Poukaz č.</p>
                  <p className="mt-2 text-2xl font-bold tracking-[0.15em]">{data?.voucherCode}</p>
                </div>
                <p className="mt-4 text-sm text-foreground/70">
                  {data?.packageEntries} × 60 minút · platnosť do {formatDate(data?.validUntil ?? null)}
                </p>
                <Link
                  to="/performance-center/rezervacia"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground"
                >
                  Rezervovať termín
                </Link>
              </>
            ) : failed ? (
              <>
                <Mail className="mx-auto h-12 w-12 text-gold" />
                <h1 className="mt-4 font-serif text-2xl font-bold">Platbu ešte spracúvame</h1>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Ak platba prebehla, poukážku vám pošleme e-mailom v priebehu pár minút. Ak by nedorazila,
                  napíšte nám na{" "}
                  <a href="mailto:peter@bsga.sk" className="font-bold underline underline-offset-4">peter@bsga.sk</a>.
                </p>
              </>
            ) : (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-gold" />
                <h1 className="mt-4 font-serif text-2xl font-bold">Spracúvame vašu platbu…</h1>
                <p className="mt-3 text-sm text-foreground/70">Chvíľu strpenia, stránku nezatvárajte.</p>
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default VoucherThankYou;
