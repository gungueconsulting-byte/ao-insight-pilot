import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AOCard } from "@/components/ao-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MOCK_AOS,
  PAYS_LIST,
  SECTEUR_LIST,
  BAILLEUR_LIST,
  TYPE_LIST,
  daysUntil,
  type Bailleur,
  type Pays,
  type Secteur,
  type TypeMarche,
} from "@/lib/mock-aos";
import { useAuth } from "@/lib/auth";
import { Filter, Search, X } from "lucide-react";

export const Route = createFileRoute("/appels-offres/")({
  head: () => ({
    meta: [
      { title: "Appels d'offres en cours — AO Insights Africa" },
      { name: "description", content: "Découvrez tous les appels d'offres actifs en Afrique de l'Ouest." },
    ],
  }),
  component: ListPage,
});

type DeadlineFilter = "all" | "lt7" | "7to30" | "gt30";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}

function ListPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [pays, setPays] = useState<Pays[]>([]);
  const [secteurs, setSecteurs] = useState<Secteur[]>([]);
  const [bailleurs, setBailleurs] = useState<Bailleur[]>([]);
  const [types, setTypes] = useState<TypeMarche[]>([]);
  const [deadline, setDeadline] = useState<DeadlineFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_AOS.filter((ao) => {
      if (search && !ao.titre.toLowerCase().includes(search.toLowerCase())) return false;
      if (pays.length && !pays.includes(ao.pays)) return false;
      if (secteurs.length && !secteurs.includes(ao.secteur)) return false;
      if (bailleurs.length && !bailleurs.includes(ao.bailleur)) return false;
      if (types.length && !types.includes(ao.type)) return false;
      const d = daysUntil(ao.deadline);
      if (deadline === "lt7" && d > 7) return false;
      if (deadline === "7to30" && (d < 7 || d > 30)) return false;
      if (deadline === "gt30" && d <= 30) return false;
      return true;
    });
  }, [search, pays, secteurs, bailleurs, types, deadline]);

  const toggle = <T,>(list: T[], setList: (v: T[]) => void, item: T) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  };

  const reset = () => {
    setPays([]); setSecteurs([]); setBailleurs([]); setTypes([]); setDeadline("all"); setSearch("");
  };

  const perPage = 12;
  const visible = user ? filtered.slice(0, page * perPage) : filtered.slice(0, 6);
  const hasMore = user && visible.length < filtered.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Appels d'offres en cours</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="font-semibold text-foreground">247 AO actifs</span> aujourd'hui
                </span>
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un AO…"
                className="pl-9"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 font-semibold text-sm">
              <Filter className="h-4 w-4 text-accent" /> Filtres
            </div>
            <button onClick={reset} className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1">
              <X className="h-3 w-3" /> Réinitialiser
            </button>
          </div>

          <div className="space-y-4">
            <FilterRow label="Pays">
              {PAYS_LIST.map((p) => (
                <Chip key={p} active={pays.includes(p)} onClick={() => toggle(pays, setPays, p)}>{p}</Chip>
              ))}
            </FilterRow>
            <FilterRow label="Secteur">
              {SECTEUR_LIST.map((s) => (
                <Chip key={s} active={secteurs.includes(s)} onClick={() => toggle(secteurs, setSecteurs, s)}>{s}</Chip>
              ))}
            </FilterRow>
            <FilterRow label="Bailleur">
              {BAILLEUR_LIST.map((b) => (
                <Chip key={b} active={bailleurs.includes(b)} onClick={() => toggle(bailleurs, setBailleurs, b)}>{b}</Chip>
              ))}
            </FilterRow>
            <FilterRow label="Type">
              {TYPE_LIST.map((t) => (
                <Chip key={t} active={types.includes(t)} onClick={() => toggle(types, setTypes, t)}>{t}</Chip>
              ))}
            </FilterRow>
            <FilterRow label="Deadline">
              <Chip active={deadline === "all"} onClick={() => setDeadline("all")}>Toutes</Chip>
              <Chip active={deadline === "lt7"} onClick={() => setDeadline("lt7")}>Moins de 7 jours</Chip>
              <Chip active={deadline === "7to30"} onClick={() => setDeadline("7to30")}>7-30 jours</Chip>
              <Chip active={deadline === "gt30"} onClick={() => setDeadline("gt30")}>Plus de 30 jours</Chip>
            </FilterRow>
          </div>
        </div>

        <div className="mt-4 mb-2 text-sm text-muted-foreground">
          {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((ao, i) => (
            <>
              <AOCard key={ao.id} ao={ao} />
              {!user && i === 2 && (
                <div key="banner" className="sm:col-span-2 lg:col-span-3 my-2 rounded-xl bg-hero-gradient text-white p-8 flex flex-wrap items-center justify-between gap-4 shadow-elegant">
                  <div>
                    <h3 className="font-display text-xl font-semibold">Connectez-vous pour voir tous les AO</h3>
                    <p className="text-sm text-white/75 mt-1">Accès complet à la veille, filtres avancés et alertes personnalisées.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="bg-gold-gradient text-accent-foreground hover:opacity-95">
                      <Link to="/register">S'inscrire gratuitement</Link>
                    </Button>
                    <Button asChild variant="outline" className="bg-white/5 border-white/30 text-white hover:bg-white/10 hover:text-white">
                      <Link to="/login">Se connecter</Link>
                    </Button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 flex justify-center">
            <Button variant="outline" onClick={() => setPage((p) => p + 1)}>Charger plus d'AO</Button>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}