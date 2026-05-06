import { useEffect, useState } from "react";
import { X, Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "bsga-newsletter-popup";

const NewsletterPopup = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    setLoading(false);
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Už ste prihlásení", description: "Tento email je už v našom newslettri." });
        close();
      } else {
        toast({ title: "Chyba", description: "Skúste znova.", variant: "destructive" });
      }
      return;
    }
    toast({ title: "Ďakujeme!", description: "Boli ste úspešne prihlásení." });
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-md bg-foreground text-background rounded-3xl p-8 shadow-2xl border border-gold/20 animate-in zoom-in-95 duration-300">
        <button
          onClick={close}
          aria-label="Zavrieť"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-gold" />
          </div>
          <span className="text-gold text-[10px] tracking-[0.25em] uppercase">Newsletter</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 mb-2">
            Prihláste sa na odber
          </h3>
          <p className="text-background/70 text-sm mb-6">
            Nezmeškajte žiadnu novinku, turnaj ani exkluzívnu ponuku z BSGA.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.sk"
              className="w-full h-12 rounded-full bg-background/10 border border-background/20 px-5 text-sm text-background placeholder:text-background/50 focus:outline-none focus:border-gold transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-gold text-foreground font-bold text-sm hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? "Odosielam..." : "Prihlásiť sa na odber"}
            </button>
          </form>
          <button onClick={close} className="text-background/50 text-xs mt-4 hover:text-background transition-colors">
            Možno neskôr
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
