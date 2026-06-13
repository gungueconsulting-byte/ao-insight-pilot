import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/cgu")({
  head: () => ({ meta: [{ title: "Conditions Générales d'Utilisation — AO Insights Africa" }] }),
  component: CGU,
});

function CGU() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-3xl font-bold">Conditions Générales d'Utilisation</h1>
        <p className="text-muted-foreground mt-2 text-sm">Dernière mise à jour : juin 2026</p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground">

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">1. Objet du service</h2>
            <p>
              AO Insights Africa est une plateforme de veille et d'intelligence sur les appels d'offres en Afrique de l'Ouest,
              développée et opérée par Gunguë Consulting, cabinet de conseil stratégique basé à Dakar, Sénégal.
              La plateforme permet aux utilisateurs de centraliser la veille sur les appels d'offres publics et bailleurs,
              de bénéficier d'un score de pertinence personnalisé et d'accéder à des outils d'assistance à la rédaction de dossiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">2. Conditions d'accès</h2>
            <p>
              L'accès à la plateforme est réservé aux personnes physiques ou morales disposant de la capacité juridique
              pour s'engager contractuellement. L'inscription est gratuite pour le plan Gratuit. L'accès aux fonctionnalités
              avancées (plans Pro et Expert) est conditionné au paiement de l'abonnement correspondant.
              L'utilisateur s'engage à fournir des informations exactes lors de son inscription et à maintenir la
              confidentialité de ses identifiants de connexion.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">3. Abonnements et paiements</h2>
            <p>
              Les abonnements sont disponibles en trois formules : Gratuit (0 FCFA), Pro (15 000 FCFA/mois) et
              Expert (30 000 FCFA/mois). Les paiements sont effectués via Wave ou Orange Money, avec le libellé
              indiqué lors de la souscription. L'activation de l'abonnement intervient sous 24h après confirmation
              du paiement par l'équipe Gunguë Consulting. Les abonnements sont sans engagement et peuvent être
              résiliés à tout moment. Aucun remboursement n'est effectué pour le mois en cours au moment de la résiliation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">4. Données personnelles</h2>
            <p>
              Les données collectées lors de l'inscription (nom, email, organisation, secteurs d'activité, références)
              sont utilisées exclusivement pour personnaliser l'expérience utilisateur sur la plateforme et améliorer
              la pertinence des recommandations. Ces données ne sont pas transmises à des tiers sans consentement
              explicite de l'utilisateur. Conformément à la loi n°2008-12 du 25 janvier 2008 sur la protection des
              données personnelles au Sénégal, l'utilisateur dispose d'un droit d'accès, de rectification et de
              suppression de ses données en contactant contact@gungueconsulting.com.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">5. Limitation de responsabilité</h2>
            <p>
              AO Insights Africa s'efforce de maintenir des informations à jour et exactes sur les appels d'offres
              disponibles. Toutefois, la plateforme ne saurait être tenue responsable d'erreurs, d'omissions ou
              d'informations obsolètes provenant des sources tierces (portails gouvernementaux, bailleurs internationaux).
              L'utilisateur est invité à vérifier les informations directement auprès des sources officielles avant
              toute soumission. Gunguë Consulting ne garantit pas le succès des soumissions réalisées à l'aide des
              outils de la plateforme.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">6. Droit applicable</h2>
            <p>
              Les présentes Conditions Générales d'Utilisation sont régies par le droit sénégalais.
              Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis aux juridictions
              compétentes de Dakar, Sénégal.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold mb-3">7. Contact</h2>
            <p>
              Pour toute question relative aux présentes CGU, vous pouvez contacter Gunguë Consulting à l'adresse
              suivante : <a href="mailto:contact@gungueconsulting.com" className="text-accent underline">contact@gungueconsulting.com</a>
            </p>
          </section>

        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
