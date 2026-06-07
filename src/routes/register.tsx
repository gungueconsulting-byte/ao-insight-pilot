import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Inscription — AO Insights Africa" }] }),
  component: Register,
});

function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first: "", last: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(form.email, form.password, form.first, form.last);
    setLoading(false);
    if (error) toast.error(error);
    else {
      toast.success("Compte créé ! Vérifiez votre boîte mail.");
      navigate({ to: "/dashboard" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold">Créer un compte</h1>
          <p className="text-sm text-muted-foreground mt-1">Démarrez gratuitement en 30 secondes.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Prénom</Label><Input value={form.first} onChange={(e) => setForm({ ...form, first: e.target.value })} required className="mt-1" /></div>
              <div><Label>Nom</Label><Input value={form.last} onChange={(e) => setForm({ ...form, last: e.target.value })} required className="mt-1" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-1" /></div>
            <div><Label>Mot de passe</Label><Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} className="mt-1" /></div>
            <Button type="submit" disabled={loading} className="w-full bg-gold-gradient text-accent-foreground hover:opacity-95 font-semibold">
              {loading ? "Création…" : "Créer mon compte"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-muted-foreground text-center">
            Déjà inscrit ? <Link to="/login" className="text-accent font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}