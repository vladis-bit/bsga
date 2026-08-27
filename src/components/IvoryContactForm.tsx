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

interface IvoryContactFormProps {
  /** Stable id for the section anchor */
  id?: string;
  /** Small gold uppercase label above the title */
  goldLabel?: string;
  /** Main heading */
  title: string;
  /** Supporting paragraph under the title */
  description: string;
  /** Contact email shown under the description */
  email: string;
  /** source value saved into contact_messages.source */
  source: string;
  /** Service options for the dropdown */
  services: string[];
  /** Prefix for element ids (must be unique per page) */
  idPrefix: string;
  /** Submit button text */
  submitText?: string;
}

const IvoryContactForm = ({
  id = "kontakt",
  goldLabel = "Kontakt",
  title,
  description,
  email,
  source,
  services,
  idPrefix,
  submitText = "Odoslať správu",
}: IvoryContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>("");
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
      first_name: firstName.trim(),
      last_name: lastName.trim() || null,
      email: emailValue.trim(),
      phone: phone.trim() || null,
      service: service || null,
      message: message.trim(),
      source,
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
    setEmailValue("");
    setPhone("");
    setService("");
    setMessage("");
    setGdprConsent(false);
    toast({
      title: "Správa odoslaná!",
      description: "Ďakujeme za váš záujem. Čoskoro vás budeme kontaktovať.",
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id={id} className="bg-muted/50 py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="text-gold text-xs sm:text-sm tracking-[0.2em] uppercase">
            {goldLabel}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mt-3 sm:mt-4 mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-foreground/70 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="flex justify-center mt-4">
            <a
              href={`mailto:${email}`}
              className="text-foreground font-medium hover:text-gold transition-colors text-sm sm:text-base flex items-center gap-2"
            >
              <span className="text-gold">📧</span> {email}
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-card rounded-2xl p-5 sm:p-8 border border-border shadow-lg">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12 text-center">
              <CheckCircle className="text-gold w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-2">
                Ďakujeme!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Vaša správa bola úspešne odoslaná.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
                <HoneypotField />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${idPrefix}-first-name`}
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Meno *
                  </label>
                  <Input
                    required
                    maxLength={100}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id={`${idPrefix}-first-name`}
                    placeholder="Vaše meno"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${idPrefix}-last-name`}
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Priezvisko *
                  </label>
                  <Input
                    required
                    maxLength={100}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id={`${idPrefix}-last-name`}
                    placeholder="Vaše priezvisko"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={`${idPrefix}-email`}
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    maxLength={255}
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    id={`${idPrefix}-email`}
                    placeholder="vas@email.sk"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${idPrefix}-phone`}
                    className="text-sm font-medium text-foreground mb-2 block"
                  >
                    Telefón{" "}
                    <span className="text-muted-foreground font-normal">
                      (voliteľné)
                    </span>
                  </label>
                  <Input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={40}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    id={`${idPrefix}-phone`}
                    placeholder="+421 900 000 000"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor={`${idPrefix}-service`}
                  className="text-sm font-medium text-foreground mb-2 block"
                >
                  Služba
                </label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger
                    id={`${idPrefix}-service`}
                    className="bg-muted text-foreground border-border/60 shadow-sm"
                  >
                    <SelectValue placeholder="Vyberte službu" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor={`${idPrefix}-message`}
                  className="text-sm font-medium text-foreground mb-2 block"
                >
                  Správa *
                </label>
                <Textarea
                  required
                  maxLength={2000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  id={`${idPrefix}-message`}
                  placeholder="Napíšte nám vašu správu..."
                  rows={4}
                  className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm resize-none"
                />
              </div>

              <InteractiveHoverButton
                type="submit"
                disabled={isSubmitting || !gdprConsent}
                text={isSubmitting ? "Odosielam..." : submitText}
                className="py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="flex items-start gap-2.5 pt-1">
                <Checkbox
                  id={`${idPrefix}-gdpr`}
                  checked={gdprConsent}
                  onCheckedChange={(checked) => setGdprConsent(checked === true)}
                  className="mt-0.5 border-border/70 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                />
                <label
                  htmlFor={`${idPrefix}-gdpr`}
                  className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
                >
                  Súhlasím so spracovaním osobných údajov v súlade so{" "}
                  <a
                    href="/gdpr"
                    className="text-gold hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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

export default IvoryContactForm;
