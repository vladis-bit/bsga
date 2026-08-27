import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAntiSpam } from "@/lib/antispam";
import { supabase } from "@/integrations/supabase/client";
import { notifyContactMessage, newMessageId } from "@/lib/notifyContact";

const EVENT_OPTIONS = [
  "DONI-TRAVEL × BSGA — Turnaj Pro-Am Tímov",
  "Golfový víkend na Kaskáde",
  "Švajlen Invitational",
  "BSGA Ryder Cup – Švajlen vs Hrbáň",
  "Camiral Trip",
  "Liv Golf Andalucia",
  "Florida PGA Swing 2027",
  "Iná akcia / mám záujem o informácie",
];

const EventsWaitlistForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [event, setEvent] = useState("");
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

    if (!event) {
      toast({
        title: "Vyberte akciu",
        description: "Prosím zvoľte akciu, o ktorú máte záujem.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const messageId = newMessageId();
    const { error } = await supabase.from("contact_messages").insert({
      id: messageId,
      first_name: firstName.trim(),
      last_name: lastName.trim() || null,
      email: email.trim(),
      service: event,
      message: message.trim() || `Waitlist – záujem o akciu: ${event}`,
      source: "waitlist-eventy",
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setEvent("");
    setMessage("");
    setGdprConsent(false);
    toast({
      title: "Zaradili sme vás do waitlistu!",
      description: "Ozveme sa vám hneď, ako sa uvoľní miesto.",
    });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="waitlist" className="py-12 sm:py-16 md:py-24 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 border-b border-background/15 pb-6 text-center sm:mb-12">
          <h2 className="font-serif text-2xl font-bold uppercase tracking-tight text-background mt-3 sm:mt-4 mb-4 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
            Zápis do poradovníka na akcie
          </h2>
          <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
            Waitlist
          </p>
          <p className="text-background/60 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
            Je vami vybraná akcia obsadená? Zapíšte sa do waitlistu a my vás
            budeme kontaktovať pri uvoľnení miesta alebo pri vypísaní náhradného
            termínu.
          </p>
          <div className="flex justify-center mt-4">
            <a href="mailto:peter@doni-travel.sk" className="text-background font-medium hover:text-gold transition-colors text-sm sm:text-base flex items-center gap-2">
              <span className="text-gold">📧</span>
              <span>peter@doni-travel.sk</span>
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-3xl p-5 sm:p-8 border border-border shadow-2xl">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
              <CheckCircle className="text-gold w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
                Ďakujeme!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Vaša žiadosť o zaradenie do waitlistu bola odoslaná.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <HoneypotField />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="waitlist-first-name" className="text-sm font-medium text-foreground mb-2 block">
                    Meno *
                  </label>
                  <Input
                    required
                    maxLength={100}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="waitlist-first-name"
                    placeholder="Vaše meno"
                    className="bg-background border-border text-foreground focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="waitlist-last-name" className="text-sm font-medium text-foreground mb-2 block">
                    Priezvisko *
                  </label>
                  <Input
                    required
                    maxLength={100}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="waitlist-last-name"
                    placeholder="Vaše priezvisko"
                    className="bg-background border-border text-foreground focus:border-gold shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="waitlist-event" className="text-sm font-medium text-foreground mb-2 block">
                  Vybraná akcia *
                </label>
                <Select value={event} onValueChange={setEvent}>
                  <SelectTrigger
                    id="waitlist-event"
                    className="bg-background border-border text-foreground focus:border-gold shadow-sm"
                  >
                    <SelectValue placeholder="Vyberte akciu" />
                  </SelectTrigger>
                  <SelectContent className="bg-card text-foreground">
                    {EVENT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option} className="text-foreground">
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="waitlist-email" className="text-sm font-medium text-foreground mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="waitlist-email"
                  placeholder="vas@email.sk"
                  className="bg-background border-border text-foreground focus:border-gold shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="waitlist-message" className="text-sm font-medium text-foreground mb-2 block">
                  Správa <span className="text-muted-foreground font-normal">(voliteľné)</span>
                </label>
                <Textarea
                  value={message}
                  maxLength={2000}
                  onChange={(e) => setMessage(e.target.value)}
                  id="waitlist-message"
                  placeholder="Počet osôb, preferovaný termín, doplňujúce informácie..."
                  rows={4}
                  className="bg-background border-border text-foreground focus:border-gold shadow-sm resize-none"
                />
              </div>

              <InteractiveHoverButton
                type="submit"
                disabled={isSubmitting || !gdprConsent}
                text={isSubmitting ? "Odosielam..." : "Zapísať do waitlistu"}
                className="py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id="waitlist-gdpr-consent"
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="mt-0.5 border-border/70 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <label htmlFor="waitlist-gdpr-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  Súhlasím so spracovaním osobných údajov v súlade so{" "}
                  <a href="/gdpr" className="text-gold hover:underline" target="_blank" rel="noopener noreferrer">
                    zásadami ochrany osobných údajov
                  </a>
                  .
                </label>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsWaitlistForm;
