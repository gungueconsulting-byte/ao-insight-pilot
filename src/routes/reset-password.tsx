import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Réinitialiser le mot de passe — AO Insights Africa" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("6 caractères minimum.");
    if (password !== confirm) return toast.error("Les mots de passe ne correspondent pas.");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Mot de passe mis à jour.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elegant">
          <h1 className="font-display text-2xl font-bold">Nouveau mot de passe</h1>
          <p className="text-sm text-muted-foreground mt-1">Choisissez un nouveau mot de passe sécurisé.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div><Label>Nouveau mot de passe</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" /></div>
            <div><Label>Confirmer</Label><Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="mt-1" /></div>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-glow">{loading ? "Mise à jour…" : "Mettre à jour"}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
