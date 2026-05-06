import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Account = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<{ full_name: string | null; email: string | null } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, email").eq("id", user.id).maybeSingle().then(({ data }) => {
      setProfile(data);
    });
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Načítavam...</div>;
  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen">
      <Helmet><title>Môj účet | BSGA</title></Helmet>
      <Navbar />
      <AuroraBackground variant="gold">
        <div className="container mx-auto px-4 pt-32 pb-16 min-h-screen">
          <div className="max-w-2xl mx-auto bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-4xl font-serif mb-2">Môj účet</h1>
            <p className="text-muted-foreground mb-8">Vitajte späť!</p>

            <div className="space-y-4 mb-8">
              <div>
                <div className="text-xs uppercase tracking-wider text-gold mb-1">Meno</div>
                <div className="text-lg">{profile?.full_name || "—"}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold mb-1">Email</div>
                <div className="text-lg">{profile?.email || user.email}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold mb-1">Rola</div>
                <div className="text-lg">{isAdmin ? "Administrátor" : "Používateľ"}</div>
              </div>
            </div>

            <div className="flex gap-3">
              {isAdmin && (
                <Button asChild className="bg-gold text-foreground hover:bg-gold/90 font-bold">
                  <a href="/admin">Admin panel</a>
                </Button>
              )}
              <Button variant="outline" onClick={signOut}>Odhlásiť sa</Button>
            </div>
          </div>
        </div>
      </AuroraBackground>
      <Footer />
    </div>
  );
};

export default Account;