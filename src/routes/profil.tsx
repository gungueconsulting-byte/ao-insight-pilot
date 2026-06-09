import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { PAYS_LIST, SECTEUR_LIST, TYPE_LIST } from "@/lib/mock-aos";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/profil")({
  head: () => ({ meta: [{ title: "Mon profil — AO Insights Africa" }] }),
  component: Profil,
});

function Profil() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (!user) return null;

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display text-3xl font-bold">Mon profil</h1>
        <p className="text-muted-foreground mt-1">Affinez votre profil pour recevoir les AO les plus pertinents.</p>

        <div className="mt-6 mb-8">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gold-gradient transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Étape {step} sur 3</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-7 shadow-card-soft">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}

          <div className="flex justify-between mt-7">
            <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Précédent</Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>Continuer</Button>
            ) : (
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") localStorage.setItem("ao_profile_setup", "1");
                  toast.success("Profil enregistré");
                }}
                className="bg-gold-gradient text-accent-foreground hover:opacity-95"
              >
                Enregistrer
              </Button>
            )}
          </div>
        </div>

        <SecuritySection />
      </div>
      <SiteFooter />
    </div>
  );
}

function SecuritySection() {
  const { updatePassword } = useAuth();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (next.length < 6) return toast.error("6 caractères minimum.");
    if (next !== confirm) return toast.error("Les mots de passe ne correspondent pas.");
    setLoading(true);
    const { error } = await updatePassword(current, next);
    setLoading(false);
    if (error) return toast.error(error);
    toast.success("Mot de passe mis à jour.");
    setOpen(false);
    setCurrent("");
    setNext("");
    setConfirm("");
  };

  return (
    <div className="mt-8 rounded-xl border border-border bg-card p-7 shadow-card-soft">
      <h2 className="font-display text-lg font-semibold inline-flex items-center gap-2">
        <Lock className="h-4 w-4 text-accent" /> Sécurité du compte
      </h2>
      <p className="text-sm text-muted-foreground mt-1">Gérez votre mot de passe et la sécurité de votre compte.</p>
      <Button variant="outline" className="mt-4" onClick={() => setOpen(true)}>
        Modifier mon mot de passe
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier mon mot de passe</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Mot de passe actuel</Label><Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className="mt-1" /></div>
            <div><Label>Nouveau mot de passe</Label><Input type="password" value={next} onChange={(e) => setNext(e.target.value)} className="mt-1" /></div>
            <div><Label>Confirmation du nouveau mot de passe</Label><Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={submit} disabled={loading || !current || !next} className="bg-primary hover:bg-primary-glow">
              {loading ? "Mise à jour…" : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Step1() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">Votre organisation</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Nom de l'organisation</Label><Input className="mt-1" /></div>
        <div>
          <Label>Type</Label>
          <select className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option>Consultant indépendant</option>
            <option>PME</option>
            <option>ONG</option>
            <option>Cabinet</option>
            <option>Autre</option>
          </select>
        </div>
        <div>
          <Label>Pays de base</Label>
          <select className="mt-1 w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
            {PAYS_LIST.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div><Label>Années d'expérience</Label><Input type="number" className="mt-1" /></div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">Vos secteurs et marchés</h2>
      <ChipGroup label="Secteurs d'intervention" items={SECTEUR_LIST} />
      <ChipGroup label="Pays d'intervention" items={PAYS_LIST} />
      <ChipGroup label="Types de marchés visés" items={TYPE_LIST} />
    </div>
  );
}

function Step3() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">Vos références</h2>
      <div>
        <Label>CV (PDF)</Label>
        <Input type="file" accept=".pdf" className="mt-1" />
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Référence {i}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><Label>Titre du projet</Label><Input className="mt-1" /></div>
            <div><Label>Bailleur</Label><Input className="mt-1" /></div>
            <div><Label>Montant</Label><Input className="mt-1" /></div>
            <div><Label>Année</Label><Input type="number" className="mt-1" /></div>
          </div>
        </div>
      ))}
      <div>
        <Label>Description courte de votre valeur ajoutée</Label>
        <Textarea rows={3} className="mt-1" />
      </div>
    </div>
  );
}

function ChipGroup({ label, items }: { label: string; items: readonly string[] }) {
  const [sel, setSel] = useState<string[]>([]);
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => {
          const active = sel.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSel((s) => (active ? s.filter((x) => x !== i) : [...s, i]))}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border ${active ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}
            >
              {i}
            </button>
          );
        })}
      </div>
    </div>
  );
}