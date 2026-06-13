import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/a-propos")({
  head: () => ({ meta: [{ title: "À propos — AO Insights Africa" }] }),
  component: APropos,
});

function APropos() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-3xl font-bold">À propos d'AO Insights Africa</h1>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-foreground">
          <p className="text-base">
            AO Insights Africa est la première plateforme d'intelligence sur les appels d'offres en Afrique de l'Ouest.
            Développée par Gunguë Consulting, elle aide consultants, PME et ONG à trouver, analyser et remporter leurs marchés.
          </p>

          <p>
            Gunguë Consulting est un cabinet de conseil stratégique basé à Dakar, Sénégal, avec des références terrain
            sur des projets GIZ, AFD, UE et Banque Mondiale.
          </p>

          <p>
            La plateforme est née d'un constat simple : les opportunités existent, les opérateurs sont compétents,
            mais le temps et les outils manquent pour transformer la veille en victoires. AO Insights Africa vient
            combler ce vide en centralisant l'information, en qualifiant les opportunités et en assistant la préparation
            des dossiers — le tout ancré dans les réalités de l'écosystème ouest-africain.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <p className="font-semibold text-foreground">Gunguë Consulting</p>
            <p className="text-muted-foreground">Cabinet de conseil stratégique — Dakar, Sénégal</p>
            <p className="text-muted-foreground">
              Contact :{" "}
              <a href="mailto:contact@gungueconsulting.com" className="text-accent underline">
                contact@gungueconsulting.com
              </a>
            </p>
            <a href="https://www.gungueconsulting.com" target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm">
              www.gungueconsulting.com
            </a>
          </div>

          <div className="pt-4">
            <Button asChild className="bg-gold-gradient text-accent-foreground hover:opacity-95">
              <Link to="/register">Commencer gratuitement <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
