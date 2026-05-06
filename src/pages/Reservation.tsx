import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { CalendarIcon, Check, GraduationCap, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Step = "type" | "select" | "datetime" | "details" | "done";
type ResType = "lesson" | "performance";

const TRAINERS = [
  { name: "Peter Švajlen", email: "peter@bsga.sk", role: "Head Coach" },
  { name: "Jakub Hrbáň", email: "jakub@bsga.sk", role: "PGA Professional" },
  { name: "Maroš Gajan", email: "maros@bsga.sk", role: "Coach" },
  { name: "Vanessa Fajkusová", email: "vanessa@bsga.sk", role: "Coach" },
  { name: "Milan Neštický", email: "milan@bsga.sk", role: "Coach" },
  { name: "Vladimír Leško", email: "vlado@bsga.sk", role: "Coach" },
];

const EQUIPMENT = [
  { id: "Trackman 4", desc: "Profesionálny launch monitor — najpresnejšia analýza úderu" },
  { id: "FlightScope", desc: "Pokročilý 3D radar pre plnú analýzu letu lopty" },
];

const HOURS = Array.from({ length: 16 }, (_, i) => `${(7 + i).toString().padStart(2, "0")}:00`);

const detailsSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  notes: z.string().trim().max(500).optional(),
});

const Reservation = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("type");
  const [type, setType] = useState<ResType | null>(null);
  const [trainerEmail, setTrainerEmail] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [busy, setBusy] = useState<{ time: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const trainer = useMemo(() => TRAINERS.find((t) => t.email === trainerEmail), [trainerEmail]);

  // Load busy slots when date selected
  useEffect(() => {
    if (!date || !type) return;
    const dateStr = format(date, "yyyy-MM-dd");
    supabase.rpc("get_busy_slots", { _from: dateStr, _to: dateStr }).then(({ data }) => {
      const filtered = (data || []).filter((r: any) => {
        if (type === "lesson") return r.type === "lesson" && r.trainer_email === trainerEmail;
        return r.type === "performance" && r.equipment === equipment;
      });
      setBusy(filtered.map((r: any) => ({ time: r.reservation_time.slice(0, 5) })));
    });
  }, [date, type, trainerEmail, equipment]);

  const reset = () => {
    setStep("type"); setType(null); setTrainerEmail(""); setEquipment("");
    setDate(undefined); setTime(""); setFirstName(""); setLastName("");
    setEmail(""); setPhone(""); setNotes("");
  };

  const handleSubmit = async () => {
    const parsed = detailsSchema.safeParse({ first_name: firstName, last_name: lastName, email, phone, notes });
    if (!parsed.success) {
      toast({ title: "Chyba", description: "Skontrolujte prosím vyplnené údaje.", variant: "destructive" });
      return;
    }
    if (!date || !time || !type) return;

    setSubmitting(true);
    const payload = {
      type,
      trainer_name: trainer?.name ?? null,
      trainer_email: trainer?.email ?? null,
      equipment: type === "performance" ? equipment : null,
      reservation_date: format(date, "yyyy-MM-dd"),
      reservation_time: time,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      notes: notes || null,
    };

    const { data, error } = await supabase.from("reservations").insert(payload).select().single();
    if (error) {
      setSubmitting(false);
      toast({ title: "Rezervácia zlyhala", description: error.message.includes("duplicate") ? "Tento termín je už obsadený." : error.message, variant: "destructive" });
      return;
    }

    // Fire-and-forget email notifications
    supabase.functions.invoke("send-reservation-emails", {
      body: { reservationId: data.id },
    }).catch(() => {});

    setSubmitting(false);
    setStep("done");
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Rezervácia | BSGA</title>
        <meta name="description" content="Rezervujte si lekciu s trénerom alebo BSGA Performance Center." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="gold">
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-3">Rezervácia</h1>
              <p className="text-muted-foreground">Vyberte si službu, termín a my sa postaráme o zvyšok.</p>
            </div>

            {/* STEP 1 — TYPE */}
            {step === "type" && (
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => { setType("lesson"); setStep("select"); }}
                  className="group bg-background/80 backdrop-blur border border-border/50 hover:border-gold rounded-2xl p-8 text-left transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <GraduationCap className="w-12 h-12 text-gold mb-4" />
                  <h2 className="text-2xl font-serif mb-2">Lekcia</h2>
                  <p className="text-muted-foreground text-sm">Individuálna lekcia s vybraným trénerom.</p>
                </button>
                <button
                  onClick={() => { setType("performance"); setStep("select"); }}
                  className="group bg-background/80 backdrop-blur border border-border/50 hover:border-gold rounded-2xl p-8 text-left transition-all hover:shadow-2xl hover:-translate-y-1"
                >
                  <Target className="w-12 h-12 text-gold mb-4" />
                  <h2 className="text-2xl font-serif mb-2">Performance Center</h2>
                  <p className="text-muted-foreground text-sm">Trackman 4 alebo FlightScope pre tréning a analýzu.</p>
                </button>
              </div>
            )}

            {/* STEP 2 — SELECT TRAINER OR EQUIPMENT */}
            {step === "select" && type === "lesson" && (
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-serif mb-6">Vyberte trénera</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TRAINERS.map((t) => (
                    <button
                      key={t.email}
                      onClick={() => { setTrainerEmail(t.email); setStep("datetime"); }}
                      className={cn(
                        "border rounded-xl p-5 text-left transition-all hover:border-gold hover:bg-gold/5",
                        trainerEmail === t.email ? "border-gold bg-gold/10" : "border-border/50"
                      )}
                    >
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep("type")}>← Späť</Button>
                </div>
              </div>
            )}

            {step === "select" && type === "performance" && (
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-serif mb-6">Vyberte vybavenie</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {EQUIPMENT.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => { setEquipment(e.id); setStep("datetime"); }}
                      className={cn(
                        "border rounded-xl p-6 text-left transition-all hover:border-gold hover:bg-gold/5",
                        equipment === e.id ? "border-gold bg-gold/10" : "border-border/50"
                      )}
                    >
                      <div className="font-bold text-lg">{e.id}</div>
                      <div className="text-sm text-muted-foreground mt-2">{e.desc}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" onClick={() => setStep("type")}>← Späť</Button>
                </div>
              </div>
            )}

            {/* STEP 3 — DATE + TIME */}
            {step === "datetime" && (
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-serif mb-6">Vyberte dátum a čas</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Label className="mb-2 block">Dátum</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("w-full justify-start text-left font-normal text-foreground", !date && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: sk }) : "Vyberte dátum"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(d) => { setDate(d); setTime(""); }}
                          disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                          initialFocus
                          locale={sk}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label className="mb-2 block">Čas (7:00 – 22:00)</Label>
                    {!date ? (
                      <p className="text-sm text-muted-foreground">Najprv vyberte dátum.</p>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 max-h-72 overflow-y-auto">
                        {HOURS.map((h) => {
                          const isBusy = busy.some((b) => b.time === h);
                          return (
                            <button
                              key={h}
                              disabled={isBusy}
                              onClick={() => setTime(h)}
                              className={cn(
                                "py-2 px-2 rounded-lg border text-sm font-medium transition-all",
                                isBusy && "bg-muted text-muted-foreground line-through cursor-not-allowed border-border/30",
                                !isBusy && time === h && "bg-gold text-foreground border-gold",
                                !isBusy && time !== h && "border-border/50 hover:border-gold hover:bg-gold/10"
                              )}
                            >
                              {h}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 flex gap-3 justify-between">
                  <Button variant="outline" onClick={() => setStep("select")}>← Späť</Button>
                  <Button disabled={!date || !time} onClick={() => setStep("details")} className="bg-gold text-foreground hover:bg-gold/90 font-bold">
                    Pokračovať →
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4 — DETAILS */}
            {step === "details" && (
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-serif mb-2">Vaše údaje</h2>
                <div className="text-sm text-muted-foreground mb-6">
                  {type === "lesson" ? `Lekcia s ${trainer?.name}` : `Performance Center — ${equipment}`} • {date && format(date, "PPP", { locale: sk })} o {time}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fn">Meno *</Label>
                    <Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ln">Priezvisko *</Label>
                    <Input id="ln" value={lastName} onChange={(e) => setLastName(e.target.value)} className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="em">Email *</Label>
                    <Input id="em" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ph">Telefón *</Label>
                    <Input id="ph" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="text-foreground" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="nt">Poznámka (nepovinné)</Label>
                    <Textarea id="nt" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={500} className="text-foreground" />
                  </div>
                </div>
                <div className="mt-8 flex gap-3 justify-between">
                  <Button variant="outline" onClick={() => setStep("datetime")} disabled={submitting}>← Späť</Button>
                  <Button onClick={handleSubmit} disabled={submitting} className="bg-gold text-foreground hover:bg-gold/90 font-bold">
                    {submitting ? "Posielam..." : "Potvrdiť rezerváciu"}
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 5 — DONE */}
            {step === "done" && (
              <div className="bg-background/80 backdrop-blur border border-border/50 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-3xl font-serif mb-3">Rezervácia potvrdená!</h2>
                <p className="text-muted-foreground mb-2">
                  {type === "lesson" ? `Lekcia s ${trainer?.name}` : `Performance Center — ${equipment}`}
                </p>
                <p className="text-muted-foreground mb-6">
                  {date && format(date, "PPP", { locale: sk })} o <strong className="text-foreground">{time}</strong>
                </p>
                <p className="text-sm text-muted-foreground mb-8">Potvrdzovací email sme zaslali na <strong className="text-foreground">{email}</strong>.</p>
                <Button onClick={reset} className="bg-gold text-foreground hover:bg-gold/90 font-bold">
                  Nová rezervácia
                </Button>
              </div>
            )}
          </div>
        </div>
      </AuroraBackground>
      <Footer />
    </div>
  );
};

export default Reservation;