import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useSavedAOs } from "@/lib/saved-aos";
import { MOCK_AOS, daysUntil, formatDate } from "@/lib/mock-aos";
import { Activity, AlertCircle, Bell, Bookmark, FileText, Plus, Trash2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AO Insights Africa" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user, firstName, plan, loading } = useAuth();
  const { ids, remove } = useSavedAOs();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (!user) return null;

  const savedAOs = ids.map((id) => MOCK_AOS.find((a) => a.id === id)).filter(Boolean) as typeof MOCK_AOS;
  const urgent = savedAOs.filter((a) => daysUntil(a.deadline) <= 7);

  const stats = [
    { label: "AO sauvegardés", value: savedAOs.length, icon: Bookmark, color: "text-secondary" },
    { label: "Deadline < 7j", value: urgent.length, icon: AlertCircle, color: "text-destructive" },
    { label: "Documents générés", value: 0, icon: FileText, color: "text-accent" },
    { label: "Score moyen", value: "78%", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Bonjour {firstName} 👋</h1>
            <p className="text-muted-foreground mt-1">Voici ce qui vous attend aujourd'hui.</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent/15 text-accent">
            Plan {plan}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card-soft">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-card-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Mes AO sauvegardés</h2>
              <Link to="/appels-offres" className="text-xs text-secondary hover:underline">Parcourir plus →</Link>
            </div>
            {savedAOs.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">Aucun AO sauvegardé. <Link to="/appels-offres" className="text-secondary hover:underline">Explorer</Link></p>
            ) : (
              <ul className="divide-y divide-border">
                {savedAOs.map((ao) => {
                  const d = daysUntil(ao.deadline);
                  const status = d < 0 ? "Expiré" : d <= 7 ? "Urgent" : "En cours";
                  const statusColor = d < 0 ? "text-muted-foreground" : d <= 7 ? "text-destructive" : "text-success";
                  return (
                    <li key={ao.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{ao.titre}</p>
                        <p className="text-xs text-muted-foreground">{ao.bailleur} · {ao.pays} · échéance {formatDate(ao.deadline)} · <span className={statusColor}>{status}</span></p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" asChild><Link to="/appels-offres/$id" params={{ id: ao.id }}>Voir</Link></Button>
                        <Button size="sm" variant="ghost" onClick={() => remove(ao.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-display text-base font-semibold inline-flex items-center gap-2"><Bell className="h-4 w-4 text-accent" /> Alertes</h2>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between p-2 rounded bg-muted/50"><span>Santé · Sénégal</span><span className="text-xs text-success">Actif</span></li>
                <li className="flex items-center justify-between p-2 rounded bg-muted/50"><span>Numérique · Côte d'Ivoire</span><span className="text-xs text-success">Actif</span></li>
              </ul>
              <Button variant="outline" size="sm" className="w-full mt-3"><Plus className="h-3 w-3 mr-1" /> Ajouter une alerte</Button>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft">
              <h2 className="font-display text-base font-semibold inline-flex items-center gap-2 mb-3"><Activity className="h-4 w-4 text-accent" /> Activité récente</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><span className="h-2 w-2 mt-1.5 rounded-full bg-accent shrink-0" /> <span><span className="font-medium">Bienvenue</span> sur AO Insights Africa <span className="text-xs text-muted-foreground block">À l'instant</span></span></li>
                <li className="flex gap-3"><span className="h-2 w-2 mt-1.5 rounded-full bg-secondary shrink-0" /> <span>Compte créé <span className="text-xs text-muted-foreground block">Aujourd'hui</span></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}