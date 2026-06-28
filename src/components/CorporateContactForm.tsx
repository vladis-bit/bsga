import { useState } from "react";
import { CheckCircle, CalendarIcon, Send, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { sk } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const participantOptions = [
  "1 – 10",
  "11 – 25",
  "26 – 50",
  "51 – 100",
  "Viac ako 100",
];

const courseOptions = [
  "Hrubá Borša",
  "Red Oak Nitra",
  "Nemám preferenciu",
  "Iné",
];

const CorporateContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
  const [preferredCourse, setPreferredCourse] = useState("");
  const [otherCourse, setOtherCourse] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      company_name: companyName,
      participant_count: participantCount,
      preferred_date: preferredDate ? format(preferredDate, "yyyy-MM-dd") : null,
      preferred_course: preferredCourse,
      message,
      source: "corporate-events",
    };

    const { error } = await supabase.from("contact_messages").insert(payload as any);

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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setParticipantCount("");
    setPreferredDate(undefined);
    setPreferredCourse("");
    setMessage("");
    toast({
      title: "Dopyt odoslaný!",
      description: "Ďakujeme za váš záujem. Ozveme sa vám do 24 hodín.",
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="kontakt" className="bg-transparent py-12 sm:py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/60 bg-card p-5 shadow-xl sm:rounded-3xl sm:p-8 md:p-12">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center sm:py-12">
              <CheckCircle className="mb-4 h-12 w-12 text-gold sm:h-16 sm:w-16" />
              <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">Ďakujeme!</h3>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Váš dopyt bol úspešne odoslaný. Ozveme sa vám do 24 hodín.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center sm:text-left">
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                  Nezáväzná dopyt na firemnú akciu
                </h2>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  Vyplňte formulár a ozveme sa vám do 24 hodín s konkrétnym návrhom a cenovou ponukou.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Meno *</label>
                  <Input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ján"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Priezvisko *</label>
                  <Input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Novák"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email *</label>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jan.novak@firma.sk"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Telefón</label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+421 900 000 000"
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Názov firmy *</label>
                  <Input
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Vaša spoločnosť s.r.o."
                    className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Počet účastníkov *</label>
                  <Select value={participantCount} onValueChange={setParticipantCount} required>
                    <SelectTrigger className="bg-muted text-foreground border-border/60 shadow-sm">
                      <SelectValue placeholder="Vyberte rozsah..." />
                    </SelectTrigger>
                    <SelectContent>
                      {participantOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Preferovaný termín</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-muted text-foreground border-border/60 shadow-sm",
                          !preferredDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {preferredDate ? format(preferredDate, "d. MMMM yyyy", { locale: sk }) : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={preferredDate}
                        onSelect={setPreferredDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Preferované ihrisko</label>
                  <Select value={preferredCourse} onValueChange={setPreferredCourse}>
                    <SelectTrigger className="bg-muted text-foreground border-border/60 shadow-sm">
                      <SelectValue placeholder="Nemám preferenciu" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Správa / požiadavky</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napíšte nám o vašej predstave – typ programu, špeciálne požiadavky na catering, branding a pod."
                  rows={4}
                  className="bg-muted text-foreground placeholder:text-muted-foreground border-border/60 focus:border-gold shadow-sm resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gold py-6 text-base font-bold text-primary transition-all duration-300 hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Odosielam..." : (
                  <span className="inline-flex items-center gap-2">
                    Odoslať dopyt <ArrowUpRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground sm:text-sm">
                Odoslaním formulára súhlasíte so spracovaním osobných údajov v súlade s BSGA{" "}
                <Link to="/gdpr" className="text-gold underline hover:text-gold-light">
                  Zásadami ochrany osobných údajov
                </Link>
                . Odpovieme do 24 hodín.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CorporateContactForm;
