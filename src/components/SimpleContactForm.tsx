import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAntiSpam } from "@/lib/antispam";
import { supabase } from "@/integrations/supabase/client";
import { notifyContactMessage, newMessageId } from "@/lib/notifyContact";

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
  const { check, markSubmitted, HoneypotField } = useAntiSpam();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const spam = check();
    if (!spam.ok) {
      toast({ title: "Nepodarilo sa odoslať", description: spam.reason, variant: "destructive" });
      return;
    }
    markSubmitted();

    setIsSubmitting(true);
    const messageId = newMessageId();
    const { error } = await supabase.from("contact_messages").insert({
      id: messageId,
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
    void notifyContactMessage(messageId);
    setIsSubmitted(true);
    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setMessage(""); setGdprConsent(false);
    toast({
      title: "Správa odoslaná!",
      description: "Ďakujeme za váš záujem. Čoskoro vás budeme kontaktovať."
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="kontakt" className="py-12 sm:py-16 md:py-24 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 border-b border-background/15 pb-6 text-center sm:mb-12">
          <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-background mt-3 sm:mt-4 mb-4 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Kontaktujte nás
          </h2>
          <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
            Kontakt
          </p>
          <p className="text-background/60 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Vyplňte formulár a my sa vám ozveme. Radi vám poradíme a pomôžeme.  
          </p>
          <div className="flex justify-center mt-4">
            <a href="mailto:info@bsga.sk" className="text-background font-medium hover:text-gold transition-colors text-sm sm:text-base flex items-center gap-2">
              <span className="text-gold">📧</span> info@bsga.sk
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-3xl p-5 sm:p-8 border border-border shadow-2xl">
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
                <HoneypotField />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-first-name" className="text-sm font-medium text-foreground mb-2 block">
                    Meno *
                  </label>
                  <Input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="contact-first-name"
                    placeholder="Vaše meno"
                    className="bg-background border-border text-foreground focus:border-gold shadow-sm" />
                </div>
                <div>
                  <label htmlFor="contact-last-name" className="text-sm font-medium text-foreground mb-2 block">
                    Priezvisko *
                  </label>
                  <Input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="contact-last-name"
                    placeholder="Vaše priezvisko"
                    className="bg-background border-border text-foreground focus:border-gold shadow-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="contact-email"
                  placeholder="vas@email.sk"
                  className="bg-background border-border text-foreground focus:border-gold shadow-sm" />
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
                  className="bg-background border-border text-foreground focus:border-gold shadow-sm" />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground mb-2 block">
                  Správa *
                </label>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id="contact-message"
                  placeholder="Napíšte nám vašu správu..."
                  rows={4}
                  className="bg-background border-border text-foreground focus:border-gold shadow-sm resize-none" />
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
                  <a href="/gdpr" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
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