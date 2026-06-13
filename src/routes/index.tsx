import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, FileText, Sparkles, Target, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AO Insights Africa — Trouvez. Analysez. Remportez." },
      { name: "description", content: "La première plateforme d'intelligence sur les appels d'offres en Afrique de l'Ouest." },
      { property: "og:title", content: "AO Insights Africa" },
      { property: "og:description", content: "Trouvez. Analysez. Remportez. Le copilote des soumissionnaires ouest-africains." },
    ],
  }),
  component: Index,
});

const BAILLEURS = ["BM", "BAD", "PNUD", "UE", "AFD", "GIZ", "ARMP", "DGMP Sénégal", "ANRMP Côte d'Ivoire"];

const WHATSAPP_EXPERT = "https://wa.me/221775930174?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20plan%20Expert%20d%27AO%20Insights%20Africa.";

function useAOCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    supabase
      .from("aos")
      .select("*", { count: "exact", head: true })
      .then(({ count: c }) => {
        if (c !== null) setCount(c);
      });
  }, []);
  return count;
}

function Index() {
  const aoCount = useAOCount();

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(245,166,35,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,180,216,0.25), transparent 50%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3 w-3 text-accent" />
              Copilote intelligent de soumission — Afrique de l'Ouest
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Trouvez.<span className="text-accent"> Analysez.</span> Remportez.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl">
              La première plateforme d'intelligence sur les appels d'offres en Afrique de l'Ouest.
              Centralisez la veille, scorez votre pertinence et préparez des dossiers gagnants.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-gold-gradient text-accent-foreground font-semibold shadow-elegant hover:opacity-95">
                <Link to="/register">Commencer gratuitement <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/25 text-white hover:bg-white/10 hover:text-white">
                <Link to="/appels-offres">Voir les AO du jour</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/65">
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                {aoCount !== null ? `${aoCount} AO actifs aujourd'hui` : "AO actifs aujourd'hui"}
              </span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" /> 10 pays couverts</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" /> 8 bailleurs majeurs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bailleurs band */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Couvre les principaux bailleurs et autorités de régulation
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {BAILLEURS.map((b) => (
              <span key={b} className="font-display text-base md:text-lg font-bold text-primary/60 hover:text-primary transition-colors">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Comment ça marche</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground">
            Trois étapes pour transformer votre veille
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Créez votre profil sectoriel", d: "Pays, secteurs, types de marchés, références. Notre moteur apprend votre ADN." },
            { n: "02", t: "Recevez les AO qui vous correspondent", d: "Veille agrégée, filtrée et notifiée. Plus jamais d'AO manqué." },
            { n: "03", t: "Préparez votre dossier avec l'assistant", d: "Notes méthodo, CV normalisés, checklists. Calibrés par bailleur." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-xl border border-border bg-card p-7 shadow-card-soft">
              <span className="font-display text-4xl font-bold text-accent/40">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Pourquoi AO Insights Africa</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Le copilote dont les soumissionnaires rêvaient</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, t: "Veille centralisée", d: "Plus besoin de surveiller 20 sites. Tout est ici, à jour, en un coup d'œil." },
              { icon: Target, t: "Score de pertinence", d: "Chaque AO scoré selon votre profil. Concentrez-vous sur ce qui a du sens." },
              { icon: FileText, t: "Assistant rédaction", d: "Templates calibrés par bailleur. Gagnez 60% du temps de préparation." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl bg-background p-7 border border-border shadow-card-soft">
                <div className="h-11 w-11 rounded-lg bg-gold-gradient flex items-center justify-center shadow-card-soft">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Tarifs</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">Un plan pour chaque ambition</h2>
          <p className="mt-3 text-muted-foreground">Démarrez gratuitement, montez en puissance quand vous êtes prêt.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Gratuit", price: "0", desc: "Pour découvrir la plateforme", features: ["Veille AO basique", "3 détails / jour", "Recherche par mots-clés"], cta: "Commencer", href: "/register", isWhatsApp: false, featured: false },
            { name: "Pro", price: "15 000", desc: "Pour les soumissionnaires actifs", features: ["Veille illimitée", "Score de pertinence IA", "Assistant rédaction illimité", "Alertes email"], cta: "Démarrer le Pro", href: "/tarifs", isWhatsApp: false, featured: true },
            { name: "Expert", price: "30 000", desc: "Pour gagner les gros marchés", features: ["Tout du Pro", "Revue dossier humaine 2/mois", "Support prioritaire", "Onboarding personnalisé"], cta: "Contacter Gunguë", href: WHATSAPP_EXPERT, isWhatsApp: true, featured: false },
          ].map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-8 ${p.featured ? "border-accent bg-card shadow-elegant scale-[1.02]" : "border-border bg-card shadow-card-soft"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                  Le plus populaire
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">FCFA{p.name !== "Gratuit" && " / mois"}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-success shrink-0" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.isWhatsApp ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 w-full inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  {p.cta}
                </a>
              ) : (
                <Button asChild className={`mt-7 w-full ${p.featured ? "bg-gold-gradient text-accent-foreground hover:opacity-95" : ""}`} variant={p.featured ? "default" : "outline"}>
                  <Link to={p.href as any}>{p.cta}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
