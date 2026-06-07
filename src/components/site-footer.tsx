import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-gold-gradient flex items-center justify-center">
                <span className="font-display font-bold text-accent-foreground text-sm">AO</span>
              </div>
              <span className="font-display font-semibold text-lg">AO Insights Africa</span>
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-md">
              La plateforme d'intelligence sur les appels d'offres en Afrique de l'Ouest.
              Trouvez, analysez et remportez vos prochains marchés.
            </p>
            <p className="mt-6 text-xs text-white/50">
              Plateforme copilote développée par <span className="text-accent font-medium">Gunguë Consulting</span> — Dakar, Sénégal
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/appels-offres" className="hover:text-accent">Appels d'offres</Link></li>
              <li><Link to="/tarifs" className="hover:text-accent">Tarifs</Link></li>
              <li><Link to="/assistant" className="hover:text-accent">Assistant IA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">Légal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-accent">À propos</a></li>
              <li><a href="#" className="hover:text-accent">Contact</a></li>
              <li><a href="#" className="hover:text-accent">CGU</a></li>
            </ul>
            <div className="mt-4 flex gap-3 text-white/60">
              <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4 hover:text-accent" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-accent" /></a>
              <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4 hover:text-accent" /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} AO Insights Africa. Tous droits réservés.</span>
          <span>Made with care in Dakar 🇸🇳</span>
        </div>
      </div>
    </footer>
  );
}