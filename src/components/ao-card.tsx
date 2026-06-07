import { Link } from "@tanstack/react-router";
import { Bookmark, Calendar, MapPin } from "lucide-react";
import { BAILLEUR_COLORS, daysUntil, formatDate, type AO } from "@/lib/mock-aos";
import { useSavedAOs } from "@/lib/saved-aos";

export function AOCard({ ao }: { ao: AO }) {
  const { isSaved, toggle } = useSavedAOs();
  const days = daysUntil(ao.deadline);
  const urgent = days <= 7;

  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-card p-5 shadow-card-soft transition hover:shadow-elegant hover:-translate-y-0.5">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${BAILLEUR_COLORS[ao.bailleur]}`}>
            {ao.bailleur}
          </span>
          <span className="text-[10px] font-medium px-2 py-1 rounded bg-muted text-muted-foreground inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {ao.pays}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(ao.id);
          }}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-accent"
          aria-label="Sauvegarder"
        >
          <Bookmark className={`h-4 w-4 ${isSaved(ao.id) ? "fill-accent text-accent" : ""}`} />
        </button>
      </div>

      <Link to="/appels-offres/$id" params={{ id: ao.id }} className="flex-1 flex flex-col">
        <h3 className="font-display font-semibold text-base leading-snug text-foreground group-hover:text-primary line-clamp-3">
          {ao.titre}
        </h3>
        <p className="mt-2 text-xs text-muted-foreground">{ao.secteur} · {ao.type}</p>

        <div className="mt-4 flex items-center justify-between text-xs">
          <span className={`inline-flex items-center gap-1 font-medium ${urgent ? "text-destructive" : "text-muted-foreground"}`}>
            <Calendar className="h-3.5 w-3.5" />
            {urgent ? `⚠ ${days}j restants` : `Échéance ${formatDate(ao.deadline)}`}
          </span>
          {ao.montant && <span className="font-semibold text-foreground">{ao.montant}</span>}
        </div>
      </Link>

      <Link
        to="/appels-offres/$id"
        params={{ id: ao.id }}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-glow transition-colors"
      >
        Voir le détail
      </Link>
    </article>
  );
}