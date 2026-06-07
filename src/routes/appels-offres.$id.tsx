import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { LockedOverlay } from "@/components/locked-overlay";
import { BAILLEUR_COLORS, MOCK_AOS, daysUntil, formatDate } from "@/lib/mock-aos";
import { useAuth } from "@/lib/auth";
import { useSavedAOs } from "@/lib/saved-aos";
import { ArrowLeft, Bookmark, ExternalLink, FileText, Languages, Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/appels-offres/$id")({
  head: ({ params }) => {
    const ao = MOCK_AOS.find((a) => a.id === params.id);
    return {
      meta: [
        { title: ao ? `${ao.titre} — AO Insights Africa` : "Appel d'offres" },
        { name: "description", content: ao?.description.slice(0, 160) ?? "" },
      ],
    };
  },
  component: DetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold">Appel d'offres introuvable</h1>
          <Button asChild className="mt-4"><Link to="/appels-offres">Retour à la liste</Link></Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center">
      <Button onClick={reset}>Réessayer</Button>
    </div>
  ),
});

function Countdown({ deadline }: { deadline: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, new Date(deadline).getTime() - now);
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms / 3_600_000) % 24);
  const m = Math.floor((ms / 60_000) % 60);
  const urgent = d <= 7;
  return (
    <div className={`rounded-lg p-4 ${urgent ? "bg-destructive/10 text-destructive" : "bg-secondary/15 text-foreground"}`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest opacity-70">Temps restant</p>
      <p className="font-display text-2xl font-bold mt-1">{d}j {h}h {m}m</p>
    </div>
  );
}

function DetailPage() {
  const { id } = useParams({ from: "/appels-offres/$id" });
  const ao = MOCK_AOS.find((a) => a.id === id);
  const { plan } = useAuth();
  const { isSaved, toggle } = useSavedAOs();
  if (!ao) throw notFound();
  const locked = plan === "Gratuit";
  const score = 78;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/appels-offres" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Retour à la liste
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <main>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${BAILLEUR_COLORS[ao.bailleur]}`}>{ao.bailleur}</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-muted">{ao.pays}</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-muted">{ao.secteur}</span>
              <span className="text-xs font-medium px-2.5 py-1 rounded bg-muted">{ao.type}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{ao.titre}</h1>

            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card-soft">
              <h2 className="font-display text-lg font-semibold">Description</h2>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{ao.description}</p>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card-soft">
              <h2 className="font-display text-lg font-semibold">Exigences clés</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {ao.exigences.map((e) => (
                  <li key={e} className="flex gap-2"><span className="text-accent">▸</span> {e}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card-soft">
              <h2 className="font-display text-lg font-semibold">Documents requis</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {ao.documents.map((d) => (
                  <li key={d} className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> {d}</li>
                ))}
              </ul>
              <a href={ao.source} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-secondary hover:underline">
                Voir le document officiel <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </main>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Publication</p>
                <p className="font-semibold">{formatDate(ao.publication)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Date limite</p>
                <p className="font-semibold">{formatDate(ao.deadline)}</p>
              </div>
              <Countdown deadline={ao.deadline} />
              {ao.montant && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Montant estimé</p>
                  <p className="font-display text-lg font-bold text-primary">{ao.montant}</p>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Languages className="h-4 w-4 text-muted-foreground" /> {ao.langue}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" /> <a className="hover:underline truncate" href={`mailto:${ao.contact}`}>{ao.contact}</a>
              </div>

              <div className="pt-2 space-y-2">
                <Button onClick={() => toggle(ao.id)} variant="outline" className="w-full">
                  <Bookmark className={`h-4 w-4 mr-2 ${isSaved(ao.id) ? "fill-accent text-accent" : ""}`} />
                  {isSaved(ao.id) ? "Sauvegardé" : "Sauvegarder cet AO"}
                </Button>
                <Button asChild className="w-full bg-gold-gradient text-accent-foreground hover:opacity-95">
                  <Link to="/assistant"><Sparkles className="h-4 w-4 mr-2" /> Commencer ma réponse</Link>
                </Button>
              </div>
            </div>

            {/* Score premium */}
            {locked ? (
              <LockedOverlay label="Votre score de compatibilité avec cet AO">
                <ScoreGauge value={score} />
              </LockedOverlay>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft">
                <ScoreGauge value={score} />
              </div>
            )}

            {/* AI insights premium */}
            {locked ? (
              <LockedOverlay label="Analyse IA : points clés, pièges, avantages concurrentiels">
                <FakeAiInsights />
              </LockedOverlay>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft">
                <FakeAiInsights />
              </div>
            )}
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function ScoreGauge({ value }: { value: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Score de pertinence</p>
      <div className="relative inline-flex mt-3">
        <svg width="120" height="120" className="-rotate-90">
          <circle cx="60" cy="60" r={r} strokeWidth="10" className="stroke-muted" fill="none" />
          <circle cx="60" cy="60" r={r} strokeWidth="10" className="stroke-accent" fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl font-bold">{value}</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Bonne compatibilité avec votre profil</p>
    </div>
  );
}

function FakeAiInsights() {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Analyse rapide IA</p>
      <div className="mt-3 space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-2.5 bg-muted rounded" style={{ width: `${100 - i * 8}%` }} />
        ))}
      </div>
    </div>
  );
}