import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

const emailSchema = z.string().trim().email("Neplatný email").max(255);
const passwordSchema = z.string().min(6, "Heslo musí mať aspoň 6 znakov").max(72);
const nameSchema = z.string().trim().min(1, "Zadajte meno").max(100);

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.03-3.13 2.55-4.63 2.67-4.71-1.46-2.13-3.73-2.42-4.53-2.46-1.93-.2-3.77 1.14-4.75 1.14-.99 0-2.49-1.11-4.1-1.08-2.11.03-4.06 1.23-5.15 3.12-2.19 3.81-.56 9.45 1.58 12.55 1.05 1.52 2.3 3.22 3.94 3.16 1.58-.06 2.18-1.02 4.1-1.02 1.91 0 2.46 1.02 4.13.99 1.71-.03 2.79-1.55 3.83-3.08 1.21-1.77 1.71-3.49 1.74-3.58-.04-.02-3.34-1.28-3.37-5.07zM13.94 3.32C14.81 2.27 15.4.81 15.24-.65c-1.25.05-2.77.83-3.67 1.88-.81.93-1.51 2.41-1.32 3.85 1.39.11 2.82-.71 3.69-1.76z"/></svg>
);

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState("login");
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (!loading && session) {
      navigate(isAdmin ? "/admin" : "/ucet", { replace: true });
    }
  }, [session, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({ title: "Chyba", description: err.errors[0].message, variant: "destructive" });
      }
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    setBusy(false);
    if (error) {
      toast({ title: "Prihlásenie zlyhalo", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Vitajte späť!" });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      nameSchema.parse(signupName);
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast({ title: "Chyba", description: err.errors[0].message, variant: "destructive" });
      }
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: signupName },
      },
    });
    setBusy(false);
    if (error) {
      toast({ title: "Registrácia zlyhala", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Registrácia úspešná", description: "Skontrolujte email pre potvrdenie." });
    }
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast({ title: "Chyba", description: String(result.error), variant: "destructive" });
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Prihlásenie | BSGA</title>
        <meta name="description" content="Prihláste sa alebo zaregistrujte sa do BSGA." />
      </Helmet>
      <Navbar />
      <AuroraBackground variant="gold">
        <div className="container mx-auto px-4 pt-32 pb-16 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-3xl font-serif text-center mb-2">Vitajte v BSGA</h1>
            <p className="text-muted-foreground text-center mb-6 text-sm">Prihláste sa alebo si vytvorte účet</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button type="button" variant="outline" disabled={busy} onClick={() => handleOAuth("google")} className="gap-2">
                <GoogleIcon /> Google
              </Button>
              <Button type="button" variant="outline" disabled={busy} onClick={() => handleOAuth("apple")} className="gap-2">
                <AppleIcon /> Apple
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">alebo email</span></div>
            </div>

            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Prihlásiť sa</TabsTrigger>
                <TabsTrigger value="signup">Registrovať</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Heslo</Label>
                    <Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="text-foreground" />
                  </div>
                  <Button type="submit" disabled={busy} className="w-full bg-gold text-foreground hover:bg-gold/90 font-bold">
                    {busy ? "Prihlasujem..." : "Prihlásiť sa"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Meno a priezvisko</Label>
                    <Input id="signup-name" type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} required className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Heslo</Label>
                    <Input id="signup-password" type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={6} className="text-foreground" />
                  </div>
                  <Button type="submit" disabled={busy} className="w-full bg-gold text-foreground hover:bg-gold/90 font-bold">
                    {busy ? "Registrujem..." : "Vytvoriť účet"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-center text-xs text-muted-foreground mt-6">
              <Link to="/" className="hover:text-gold">← Späť na úvod</Link>
            </p>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
};

export default Auth;