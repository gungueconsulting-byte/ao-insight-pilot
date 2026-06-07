import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useSavedAOs } from "@/lib/saved-aos";
import { MOCK_AOS } from "@/lib/mock-aos";
import { toast } from "sonner";
import { Copy, Download, FileText, Lock, RefreshCw, Sparkles } from "lucide-react";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "Assistant rédaction — AO Insights Africa" }] }),
  component: AssistantPage,
});

const DOC_TYPES = [
  { id: "note", t: "Note méthodologique", d: "Présentation de votre approche projet" },
  { id: "cv", t: "CV normalisé", d: "Format standard bailleur" },
  { id: "lettre", t: "Lettre de motivation", d: "Personnalisée pour l'AO" },
  { id: "checklist", t: "Checklist de conformité", d: "Vérification complète du dossier" },
];

function AssistantPage() {
  const { user, plan } = useAuth();
  const { ids } = useSavedAOs();
  const [step, setStep] = useState(1);
  const [aoId, setAoId] = useState<string>("");
  const [docType, setDocType] = useState<string>("");
  const [org, setOrg] = useState("");
  const [refs, setRefs] = useState("");
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Gate cta="Connectez-vous pour utiliser l'assistant" to="/login" />;
  }
  if (plan === "Gratuit") {
    return <Gate cta="L'assistant est réservé au plan Pro. Passez au Pro pour le débloquer." to="/tarifs" />;
  }

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const ao = MOCK_AOS.find((a) => a.id === aoId);
      const docLabel = DOC_TYPES.find((d) => d.id === docType)?.t ?? "Document";
      setOutput(
        `# ${docLabel}\n\nObjet : ${ao?.titre ?? "Appel d'offres"}\nBailleur : ${ao?.bailleur ?? ""}\nPays : ${ao?.pays ?? ""}\n\n---\n\n## Présentation de l'organisation\n${org || "[Décrivez votre organisation]"}\n\n## Compréhension du contexte\nNotre équipe a analysé en détail les exigences exprimées dans le présent appel d'offres. Le contexte régional et la portée du projet exigent une approche rigoureuse, ancrée dans les réalités du terrain ouest-africain.\n\n## Approche méthodologique\n1. Cadrage et diagnostic initial\n2. Mobilisation de l'équipe terrain\n3. Mise en œuvre par phases avec jalons trimestriels\n4. Suivi-évaluation et reporting au bailleur\n\n## Références pertinentes\n${refs || "[Citez vos références]"}\n\n## Valeur ajoutée\n${value || "[Différenciez-vous ici]"}\n\n---\n\n*Brouillon généré par AO Insights Africa — Plan Pro. Affinez le contenu avant soumission.*`
      );
      setLoading(false);
      setStep(4);
      toast.success("Brouillon généré avec succès");
    }, 900);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-11 w-11 rounded-lg bg-gold-gradient flex items-center justify-center shadow-card-soft">
            <Sparkles className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Assistant rédaction</h1>
            <p className="text-sm text-muted-foreground">Préparez vos documents en quelques minutes.</p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {s}
              </div>
              {s < 4 && <div className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card title="Étape 1 — Sélectionnez un AO">
            {ids.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aucun AO sauvegardé. <Link to="/appels-offres" className="text-secondary hover:underline">Parcourir les AO</Link> pour en sauvegarder.</p>
            ) : (
              <div className="grid gap-2">
                {ids.map((id) => {
                  const ao = MOCK_AOS.find((a) => a.id === id);
                  if (!ao) return null;
                  return (
                    <button key={id} onClick={() => setAoId(id)} className={`text-left p-3 rounded-lg border ${aoId === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                      <p className="font-medium text-sm">{ao.titre}</p>
                      <p className="text-xs text-muted-foreground">{ao.bailleur} · {ao.pays}</p>
                    </button>
                  );
                })}
              </div>
            )}
            <div className="mt-4">
              <Label className="text-xs">Ou collez une référence d'AO</Label>
              <Input value={aoId} onChange={(e) => setAoId(e.target.value)} placeholder="ex: ao-001" className="mt-1" />
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setStep(2)} disabled={!aoId}>Continuer</Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card title="Étape 2 — Choisissez le document à générer">
            <div className="grid sm:grid-cols-2 gap-3">
              {DOC_TYPES.map((d) => (
                <button key={d.id} onClick={() => setDocType(d.id)} className={`p-4 rounded-lg border text-left ${docType === d.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                  <FileText className="h-5 w-5 text-accent mb-2" />
                  <p className="font-semibold text-sm">{d.t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.d}</p>
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>Retour</Button>
              <Button onClick={() => setStep(3)} disabled={!docType}>Continuer</Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card title="Étape 3 — Contexte rapide">
            <div className="space-y-4">
              <div>
                <Label>Description de votre organisation</Label>
                <Textarea value={org} onChange={(e) => setOrg(e.target.value)} rows={3} placeholder="Présentez votre structure en 3-4 lignes…" className="mt-1" />
              </div>
              <div>
                <Label>Références projets similaires</Label>
                <Textarea value={refs} onChange={(e) => setRefs(e.target.value)} rows={3} placeholder="Listez 2-3 références pertinentes…" className="mt-1" />
              </div>
              <div>
                <Label>Valeur ajoutée différenciante</Label>
                <Textarea value={value} onChange={(e) => setValue(e.target.value)} rows={2} placeholder="Ce qui vous distingue…" className="mt-1" />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
              <Button onClick={generate} disabled={loading} className="bg-gold-gradient text-accent-foreground hover:opacity-95">
                {loading ? "Génération…" : "Générer le document"}
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card title="Étape 4 — Brouillon généré">
            <Textarea value={output} onChange={(e) => setOutput(e.target.value)} rows={18} className="font-mono text-xs" />
            <div className="flex flex-wrap gap-2 mt-4">
              <Button onClick={() => { navigator.clipboard.writeText(output); toast.success("Copié !"); }} variant="outline"><Copy className="h-4 w-4 mr-2" /> Copier</Button>
              <Button onClick={() => toast.info("Export PDF — bientôt disponible")} variant="outline"><Download className="h-4 w-4 mr-2" /> PDF</Button>
              <Button onClick={() => toast.info("Export Word — bientôt disponible")} variant="outline"><Download className="h-4 w-4 mr-2" /> Word</Button>
              <Button onClick={generate} variant="outline" disabled={loading}><RefreshCw className="h-4 w-4 mr-2" /> Régénérer</Button>
            </div>
          </Card>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft">
      <h2 className="font-display text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Gate({ cta, to }: { cta: string; to: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md text-center rounded-2xl border border-border bg-card p-10 shadow-elegant">
          <div className="h-12 w-12 mx-auto rounded-full bg-accent/15 flex items-center justify-center">
            <Lock className="h-5 w-5 text-accent" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold">Accès Pro requis</h2>
          <p className="mt-2 text-sm text-muted-foreground">{cta}</p>
          <Button asChild className="mt-6 bg-gold-gradient text-accent-foreground hover:opacity-95">
            <Link to={to}>Continuer</Link>
          </Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}