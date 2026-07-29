import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SimpleContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
      message,
      source: "home",
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
    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setMessage(""); setGdprConsent(false);
    toast({
      title: "Správa odoslaná!",
      description: "Ďakujeme za váš záujem. Čoskoro vás budeme kontaktovať."
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="kontakt" className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
            Kontakt
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            Kontaktujte nás
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Vyplňte formulár a my sa vám ozveme. Radi vám poradíme a pomôžeme.  
          </p>
          <div className="flex justify-center mt-4">
            <a href="mailto:info@bsga.sk" className="text-foreground font-medium hover:text-gold transition-colors text-sm sm:text-base flex items-center gap-2">
              <span className="text-gold">📧</span> info@bsga.sk
            </a>
          </div>
          <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-5 sm:mt-7" />
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border shadow-lg">
          {isSubmitted ?
          <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
              <CheckCircle className="text-gold w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
                Ďakujeme!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Vaša správa bola úspešne odoslaná.
              </p>
            </div> :

          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Meno *
                  </label>
                  <Input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Vaše meno"
                    className="bg-muted border-border/60 focus:border-gold shadow-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Priezvisko *
                  </label>
                  <Input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vaše priezvisko"
                    className="bg-muted border-border/60 focus:border-gold shadow-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vas@email.sk"
                  className="bg-muted border-border/60 focus:border-gold shadow-sm" />
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-sm font-medium text-foreground mb-2 block">
                  Telefón <span className="text-muted-foreground font-normal">(voliteľné)</span>
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+421 900 000 000"
                  className="bg-muted border-border/60 focus:border-gold shadow-sm" />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Správa *
                </label>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napíšte nám vašu správu..."
                  rows={4}
                  className="bg-muted border-border/60 focus:border-gold shadow-sm resize-none" />
              </div>

              <InteractiveHoverButton
              type="submit"
              disabled={isSubmitting || !gdprConsent}
              text={isSubmitting ? "Odosielam..." : "Odoslať správu"}
              className="py-6 disabled:opacity-50 disabled:cursor-not-allowed" />

              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id="gdpr-consent"
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="mt-0.5 border-border/70 data-[state=checked]:bg-gold data-[state=checked]:border-gold" />
                <label htmlFor="gdpr-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Súhlasím so spracovaním osobných údajov v súlade so{" "}
                  <a href="/ochrana-osobnych-udajov" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                    zásadami ochrany osobných údajov
                  </a>.
                </label>
              </div>

            </form>
          }
        </div>
      </div>
    </section>);

};

export default SimpleContactForm;