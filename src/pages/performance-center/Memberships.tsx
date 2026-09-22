import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import poukazka1 from "@/assets/vouchers/poukazka-1.webp.asset.json";
import poukazka5 from "@/assets/vouchers/poukazka-5.webp.asset.json";
import poukazka10 from "@/assets/vouchers/poukazka-10.webp.asset.json";
import poukazka20 from "@/assets/vouchers/poukazka-20.webp.asset.json";

type Package = {
  entries: 1 | 5 | 10 | 20;
  label: string;
  price: number;
  pricePerEntry: number;
  savings: string | null;
  badge: string | null;
  image: string;
};

const packages: Package[] = [
  { entries: 1, label: "1 vstup", price: 24.99, pricePerEntry: 24.99, savings: null, badge: null, image: poukazka1.url },
  { entries: 5, label: "5 vstupov", price: 119.99, pricePerEntry: 24.0, savings: "ušetríte 4,96 €", badge: null, image: poukazka5.url },
  { entries: 10, label: "10 vstupov", price: 229.99, pricePerEntry: 23.0, savings: "ušetríte 19,91 €", badge: "Najobľúbenejšie", image: poukazka10.url },
  { entries: 20, label: "20 vstupov", price: 399.99, pricePerEntry: 20.0, savings: "ušetríte 99,81 € (−20 %)", badge: "Najvýhodnejšie", image: poukazka20.url },
];

const faqItems = [
  {
    q: "Ako poukážku uplatním?",
    a: "Po zaplatení dostanete e-mail s poukážkou a jej unikátnym číslom. Pri rezervácii termínu v našom rezervačnom systéme alebo osobne na recepcii číslo poukážky uvediete a vstup sa vám odpočíta.",
  },
  {
    q: "Dá sa poukážka darovať?",
    a: "Áno. Pri kúpe stačí zaškrtnúť „Kupujem ako darček“ a doplniť meno obdarovaného a venovanie – obe sa zobrazia priamo na poukážke, ktorú môžete darovať v elektronickej aj tlačenej podobe.",
  },
  {
    q: "Aká je platnosť poukážky?",
    a: "Poukážka je platná 6 mesiacov od dátumu zakúpenia. Presný dátum konca platnosti nájdete v e-maile aj priamo na poukážke.",
  },
  {
    q: "Môžem vstupy rozdeliť medzi viac ľudí?",
    a: "Áno. Vstupy z poukážky môže čerpať ktokoľvek, kto pozná jej číslo – aj vo viacerých návštevách a medzi viacerými hráčmi.",
  },
];

const purchaseSchema = z.object({
  buyerName: z.string().trim().min(2, "Zadajte meno a priezvisko").max(100, "Meno je príliš dlhé"),
  buyerEmail: z.string().trim().email("Zadajte platnú e-mailovú adresu").max(255),
  isGift: z.boolean(),
  recipientName: z.string().trim().max(100, "Meno je príliš dlhé").optional(),
  dedication: z.string().trim().max(200, "Venovanie môže mať najviac 200 znakov").optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Súhlas je povinný" }) }),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

const formatPrice = (value: number) =>
  value.toLocaleString("sk-SK", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

const inputClass =
  "border-border bg-background text-black placeholder:text-black/50 focus-visible:ring-gold";

const Memberships = () => {
  const [selected, setSelected] = useState<Package | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: { isGift: false, consent: undefined as unknown as true },
  });

  const openDialog = (pkg: Package) => {
    reset({ isGift: false, consent: undefined as unknown as true });
    setSelected(pkg);
  };

  const isGift = watch("isGift");
  const consent = watch("consent");

  const onSubmit = async (values: PurchaseFormValues) => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-voucher-checkout", {
        body: {
          package: selected.entries,
          buyerName: values.buyerName,
          buyerEmail: values.buyerEmail,
          isGift: values.isGift,
          recipientName: values.isGift ? values.recipientName || null : null,
          dedication: values.isGift ? values.dedication || null : null,
        },
      });
      if (error) throw error;
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl as string;
        return;
      }
      throw new Error("Checkout session sa nepodarilo vytvoriť.");
    } catch {
      toast.error("Online platba je momentálne nedostupná. Kontaktujte nás na peter@bsga.sk alebo +421 905 335 501.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Členstvá a darčekové poukážky | BSGA Performance Center"
        description="Kúpte vstupy na TrackMan simulátor v BSGA Performance Center – pre seba alebo ako darček. Poukážku s unikátnym číslom dostanete ihneď e-mailom."
        path="/performance-center/clenstva"
        breadcrumbs={[
          { name: "Domov", url: "https://bsga.sk/" },
          { name: "Performance Center", url: "https://bsga.sk/performance-center" },
          { name: "Členstvá a darčekové poukážky", url: "https://bsga.sk/performance-center/clenstva" },
        ]}
        jsonLd={packages.map((p) => ({
          "@context": "https://schema.org",
          "@type": "Product",
          name: `BSGA Performance Center – darčeková poukážka ${p.label}`,
          category: "Gift Card",
          brand: { "@type": "Brand", name: "BSGA" },
          offers: {
            "@type": "Offer",
            price: p.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://bsga.sk/performance-center/clenstva",
          },
        }))}
      />
      <Navbar />
      <div className="theme-ivory min-h-screen bg-background text-foreground">
        <main>
          <section className="bg-background pb-10 pt-24 sm:pb-12 sm:pt-28">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mx-auto max-w-4xl text-center">
                <Link to="/performance-center" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-foreground">
                  <ArrowLeft className="h-4 w-4" /> Performance Center
                </Link>
                <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
                  Členstvá a darčekové poukážky
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-foreground/70 sm:text-xl">
                  Kúpte vstupy pre seba alebo ako darček. Poukážku dostanete ihneď e-mailom.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-background pb-16 pt-6 md:pb-24 md:pt-10">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 items-stretch">
                  {packages.map((pkg) => {
                    const featured = pkg.badge !== null;
                    return (
                      <div
                        key={pkg.entries}
                        className={`relative flex flex-col overflow-hidden rounded-[1.25rem] border bg-card shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18),0_4px_12px_-4px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 ${
                          featured ? "border-gold ring-2 ring-gold/60 lg:scale-[1.04]" : "border-border"
                        }`}
                      >
                        {pkg.badge && (
                          <span className="absolute left-1/2 top-3 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-md">
                            {pkg.badge}
                          </span>
                        )}
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-foreground/5">
                          <img
                            loading="lazy"
                            decoding="async"
                            src={pkg.image}
                            alt={`Darčeková poukážka BSGA Performance Center – ${pkg.label}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-2 p-6 text-center">
                          <p className="font-serif text-3xl font-bold text-foreground">{pkg.label}</p>
                          <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/60">na 60 minút</p>
                          <p className="mt-2 text-2xl font-bold text-foreground">{formatPrice(pkg.price)}</p>
                          <p className="text-sm text-foreground/70">{formatPrice(pkg.pricePerEntry)} / vstup</p>
                          {pkg.savings && (
                            <span className="mx-auto mt-1 inline-block rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-xs font-bold text-foreground">
                              {pkg.savings}
                            </span>
                          )}
                          <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-foreground/60">
                            <Check className="h-3.5 w-3.5 text-gold" /> Platnosť 6 mesiacov
                          </p>
                          <button
                            type="button"
                            onClick={() => openDialog(pkg)}
                            className="mt-auto inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground"
                          >
                            Kúpiť
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          </section>

          <section className="bg-background py-12 sm:py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="mb-8 border-b border-border pb-6 text-center sm:mb-12 md:mb-16">
                <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">Časté otázky</h2>
                <p className="mt-2 inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">FAQ</p>
              </div>
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="rounded-2xl border border-border bg-card px-4 sm:px-6 data-[state=open]:border-gold/40">
                      <AccordionTrigger className="py-4 text-left text-sm font-medium text-foreground hover:text-gold hover:no-underline sm:py-6 sm:text-base">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground sm:pb-6 sm:text-base">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <p className="mt-10 text-center text-sm text-foreground/60">
                  Máte otázky? Napíšte nám na{" "}
                  <a href="mailto:peter@bsga.sk" className="font-bold text-foreground underline-offset-4 hover:underline">
                    peter@bsga.sk
                  </a>{" "}
                  alebo volajte{" "}
                  <a href="tel:+421905335501" className="font-bold text-foreground underline-offset-4 hover:underline">
                    +421 905 335 501
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="theme-ivory bg-background text-foreground sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold">
              {selected ? `Kúpa balíka: ${selected.label}` : "Kúpa balíka"}
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              {selected
                ? `${formatPrice(selected.price)} · každý vstup na 60 minút · platnosť 6 mesiacov`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="buyerName" className="text-foreground">Meno a priezvisko *</Label>
              <Input id="buyerName" placeholder="Ján Novák" className={inputClass} {...register("buyerName")} />
              {errors.buyerName && <p className="text-xs text-destructive">{errors.buyerName.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="buyerEmail" className="text-foreground">E-mail *</Label>
              <Input id="buyerEmail" type="email" placeholder="jan.novak@email.sk" className={inputClass} {...register("buyerEmail")} />
              {errors.buyerEmail && <p className="text-xs text-destructive">{errors.buyerEmail.message}</p>}
              <p className="text-xs text-foreground/60">Na tento e-mail vám pošleme poukážku.</p>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="isGift"
                checked={isGift}
                onCheckedChange={(checked) => setValue("isGift", checked === true)}
              />
              <Label htmlFor="isGift" className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Gift className="h-4 w-4 text-gold" /> Kupujem ako darček
              </Label>
            </div>

            {isGift && (
              <>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="recipientName" className="text-foreground">Meno obdarovaného</Label>
                  <Input id="recipientName" placeholder="Meno obdarovaného" className={inputClass} {...register("recipientName")} />
                  {errors.recipientName && <p className="text-xs text-destructive">{errors.recipientName.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dedication" className="text-foreground">Venovanie (max 200 znakov)</Label>
                  <Textarea id="dedication" rows={3} placeholder="Krátke venovanie na poukážku…" className={inputClass} {...register("dedication")} />
                  {errors.dedication && <p className="text-xs text-destructive">{errors.dedication.message}</p>}
                </div>
              </>
            )}

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent === true}
                onCheckedChange={(checked) => setValue("consent", checked === true ? true : (undefined as unknown as true), { shouldValidate: true })}
              />
              <Label htmlFor="consent" className="text-xs leading-relaxed text-foreground/80">
                Súhlasím s{" "}
                <Link to="/obchodne-podmienky" className="font-bold text-foreground underline underline-offset-4">
                  obchodnými podmienkami
                </Link>{" "}
                a so{" "}
                <Link to="/gdpr" className="font-bold text-foreground underline underline-offset-4">
                  spracovaním osobných údajov
                </Link>
                . *
              </Label>
            </div>
            {errors.consent && <p className="text-xs text-destructive">{errors.consent.message}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-foreground disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitting ? "Presmerovávam na platbu…" : `Pokračovať na platbu ${selected ? `· ${formatPrice(selected.price)}` : ""}`}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
};

export default Memberships;
