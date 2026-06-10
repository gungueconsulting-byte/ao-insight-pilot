import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs — AO Insights Africa" },
      { name: "description", content: "Démarrez gratuitement, montez en puissance avec Pro ou Expert." },
    ],
  }),
  component: Tarifs,
});

const ROWS: Array<{ k: string; g: string | boolean; p: string | boolean; e: string | boolean }> = [
  { k: "Veille AO", g: "Basique", p: "Complète", e: "Complète" },
  { k: "Détails AO", g: "3 / jour", p: "Illimité", e: "Illimité" },
  { k: "Score de pertinence", g: false, p: true, e: true },
  { k: "Assistant rédaction", g: false, p: "Illimité", e: "Illimité" },
  { k: "Alertes email", g: false, p: true, e: true },
  { k: "Revue dossier humaine", g: false, p: false, e: "2 / mois" },
  { k: "Support", g: false, p: "Email", e: "Prioritaire" },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="h-4 w-4 text-success mx-auto" />;
  if (v === false) return <X className="h-4 w-4 text-muted-foreground/50 mx-auto" />;
  return <span className="text-sm">{v}</span>;
}

function Tarifs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ prenom: "", email: "", phone: "" });
  const [expertOpen, setExpertOpen] = useState(false);
  const [expertConfirmed, setExpertConfirmed] = useState(false);
  const [expertForm, setExpertForm] = useState({ nom: "", email: "", message: "" });

  const startFree = () => {
    if (user) navigate({ to: "/dashboard" });
    else navigate({ to: "/register" });
  };

  const startPro = () => {
    if (!user) {
      toast.info("Créez d'abord un compte gratuit pour activer votre plan Pro.");
      navigate({ to: "/register" });
      return;
    }
    setConfirmed(false);
    setOpen(true);
  };

  const submitExpert = () => {
    setExpertConfirmed(true);
    setExpertForm({ nom: "", email: "", message: "" });
  };

  const submit = () => {
    setConfirmed(true);
    setForm({ prenom: "", email: "", phone: "" });
  };

  const plans: Array<{
    name: string;
    price: string;
    subtitle: string;
    featured: boolean;
    cta: string;
    ctaSubtitle?: string;
    action: () => void;
    features: string[];
  }> = [
    {
      name: "Gratuit",
      price: "0",
      subtitle: "Pour commencer votre veille AO",
      featured: false,
      cta: "Commencer",
      ctaSubtitle: user ? undefined : "Compte gratuit — aucune carte requise",
      action: startFree,
      features: [
        "Veille AO basique",
        "3 détails d'AO par jour",
        "Sauvegarde d'AO",
        "Alerte deadline J-7 par email sur les AO sauvegardés",
      ],
    },
    {
      name: "Pro",
      price: "15 000",
      subtitle: "Pour répondre efficacement",
      featured: true,
      cta: "Démarrer — 15 000 FCFA/mois",
      action: startPro,
      features: [
        "Veille AO complète",
        "Détails illimités",
        "Score de pertinence",
        "Assistant rédaction illimité",
        "Alertes deadline configurables J-14, J-7, J-3, J-1",
        "Alertes nouveaux AO selon votre profil",
        "Récapitulatif hebdomadaire personnalisé chaque lundi",
        "Notifications de mise à jour sur vos AO suivis",
      ],
    },
    {
      name: "Expert",
      price: "30 000",
      subtitle: "Pour les acteurs qui veulent un accompagnement sur mesure",
      featured: false,
      cta: "Contacter un expert",
      action: () => {},
      features: [
        "Tout du plan Pro",
        "Revue de dossier humaine (2 / mois)",
        "Support prioritaire",
        "Briefing mensuel avec un expert Gunguë Consulting, opportunités à venir dans votre secteur",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Tarifs</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold">Choisissez votre plan</h1>
          <p className="mt-3 text-muted-foreground">Sans engagement. Annulation à tout moment.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-8 flex flex-col ${p.featured ? "border-accent bg-card shadow-elegant scale-[1.02]" : "border-border bg-card shadow-card-soft"}`}>
              {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">Recommandé</span>}
              <h3 className="font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">FCFA{p.name !== "Gratuit" && " / mois"}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-success shrink-0 mt-0.5" /><span>{f}</span></li>
                ))}
              </ul>
              <div className="mt-6">
                <Button onClick={p.action} className={`w-full ${p.featured ? "bg-gold-gradient text-accent-foreground hover:opacity-95" : ""}`} variant={p.featured ? "default" : "outline"}>
                  {p.cta}
                </Button>
                {p.ctaSubtitle && (
                  <p className="mt-2 text-xs text-center text-muted-foreground">{p.ctaSubtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 overflow-x-auto rounded-xl border border-border bg-card shadow-card-soft">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left font-display p-4 text-sm">Fonctionnalité</th>
                <th className="font-display p-4 text-sm">Gratuit</th>
                <th className="font-display p-4 text-sm text-accent">Pro</th>
                <th className="font-display p-4 text-sm">Expert</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.k} className="border-b border-border last:border-0">
                  <td className="p-4 text-sm font-medium">{r.k}</td>
                  <td className="p-4 text-center"><Cell v={r.g} /></td>
                  <td className="p-4 text-center bg-accent/5"><Cell v={r.p} /></td>
                  <td className="p-4 text-center"><Cell v={r.e} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-center mb-6">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="rounded-xl border border-border bg-card">
            <AccordionItem value="1" className="px-5"><AccordionTrigger>Puis-je annuler à tout moment ?</AccordionTrigger><AccordionContent>Oui, sans engagement. Votre abonnement s'arrête à la fin du mois en cours.</AccordionContent></AccordionItem>
            <AccordionItem value="2" className="px-5"><AccordionTrigger>Quels moyens de paiement acceptez-vous ?</AccordionTrigger><AccordionContent>Wave, Orange Money et virement bancaire. Le paiement est manuel pour cette phase MVP.</AccordionContent></AccordionItem>
            <AccordionItem value="3" className="px-5"><AccordionTrigger>Combien d'utilisateurs par compte ?</AccordionTrigger><AccordionContent>Un seul compte par licence. Pour les équipes, contactez-nous via le plan Expert.</AccordionContent></AccordionItem>
            <AccordionItem value="4" className="px-5"><AccordionTrigger>D'où viennent vos données d'AO ?</AccordionTrigger><AccordionContent>Sources officielles : BM, BAD, PNUD, UE, AFD, GIZ, ARMP, DGMP et les portails gouvernementaux d'Afrique de l'Ouest.</AccordionContent></AccordionItem>
          </Accordion>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {confirmed ? (
            <>
              <DialogHeader>
                <DialogTitle>Demande reçue</DialogTitle>
                <DialogDescription>
                  Votre demande est reçue. Votre accès sera activé sous 24h.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setOpen(false)} className="bg-gold-gradient text-accent-foreground hover:opacity-95">Fermer</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Activer le plan Pro</DialogTitle>
                <DialogDescription asChild>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    Effectuez votre paiement <span className="font-semibold text-foreground">Wave ou Orange Money</span> avec le libellé&nbsp;:
                    <span className="block mt-2 font-mono text-xs bg-muted px-2 py-1.5 rounded text-foreground">
                      AO Insights Africa - Pro - [votre email]
                    </span>
                    <span className="block mt-2">Vous recevrez une confirmation d'activation de votre accès sous 24h.</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div><Label>Prénom</Label><Input value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} className="mt-1" /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
                <div><Label>Numéro ayant effectué le paiement</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" /></div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={submit} className="bg-gold-gradient text-accent-foreground hover:opacity-95" disabled={!form.email || !form.prenom || !form.phone}>Confirmer</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}