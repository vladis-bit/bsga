import { useState } from "react";
import { CheckCircle, CalendarIcon, Mail } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const FittingContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      service: "Fitting",
      preferred_date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
      message,
      source: "fitting",
    });
    setIsSubmitting(false);
    if (error) {
      toast({
        title: "Nepodarilo sa odoslať",
        description: "Nastala chyba pri odosielaní. Skúste to prosím znova.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitted(true);
    setFirstName(""); setLastName(""); setEmail(""); setPhone("");
    setMessage(""); setSelectedDate(undefined);
    setGdprConsent(false);
    toast({
      title: "Žiadosť odoslaná!",
      description: "Ďakujeme za záujem o fitting. Jakub vás bude čoskoro kontaktovať.",
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="kontakt" className="bg-transparent py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
            Rezervácia fittingu
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Objednaj sa na fitting
          </h2>
          <p className="text-primary-foreground/80 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Vyplň formulár a Jakub Hrbáň – náš špecialista na fitting – sa ti ozve s návrhom termínu a detailmi celého procesu. Fitting trvá 120 minút a prebieha v Performance Centre v Petržalke.
          </p>
          <div className="flex justify-center mt-4">
            <a
              href="mailto:jakub@bsga.sk?subject=Záujem o fitting"
              className="inline-flex items-center gap-2 text-primary-foreground font-medium hover:text-gold transition-colors text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 text-gold" />
              jakub@bsga.sk
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-lg">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
              <CheckCircle className="text-gold w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
                Ďakujeme!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Tvoja žiadosť o fitting bola úspešne odoslaná.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Meno *</label>
                  <Input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Vaše meno" className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Priezvisko *</label>
                  <Input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Vaše priezvisko" className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email *</label>
                  <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vas@email.sk" className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Telefón</label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+421 XXX XXX XXX" className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Preferovaný dátum fittingu</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-muted text-foreground border-border/60 shadow-sm",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "d. MMMM yyyy", { locale: sk }) : "Vyberte dátum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Správa *</label>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napíš nám tvoj level, aké palice momentálne hráš a čo by si chcel od fittingu získať..."
                  rows={4}
                  className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm resize-none"
                />
              </div>

              <InteractiveHoverButton
                type="submit"
                disabled={isSubmitting || !gdprConsent}
                text={isSubmitting ? "Odosielam..." : "Odoslať žiadosť o fitting"}
                className="py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id="gdpr-fitting"
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="mt-0.5 border-border/70 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <label htmlFor="gdpr-fitting" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Súhlasím so spracovaním osobných údajov v súlade so{" "}
                  <a href="/gdpr" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                    zásadami ochrany osobných údajov
                  </a>.
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default FittingContactForm;