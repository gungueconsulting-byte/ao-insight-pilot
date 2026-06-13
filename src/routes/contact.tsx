import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — AO Insights Africa" }] }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.nom || !form.email || !form.message) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    // Ouvre le client email avec les données pré-remplies
    const mailto = `mailto:oumar.nguirane@gungueconsulting.com?subject=Message de ${encodeURIComponent(form.nom)} via AO Insights Africa&body=${encodeURIComponent(form.message)}%0A%0A-- %0A${encodeURIComponent(form.nom)}%0A${encodeURIComponent(form.email)}`;
    window.open(mailto, "_blank");
    setSent(true);
    toast.success("Votre client email s'est ouvert. Envoyez le message pour nous contacter.");
    setForm({ nom: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="mx-auto max-w-3xl w-full px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-display text-3xl font-bold">Contact</h1>
        <p className="text-muted-foreground mt-2">Une question, un retour, une demande ? Nous vous répondons sous 24h.</p>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Email</p>
                <a href="mailto:oumar.nguirane@gungueconsulting.com" className="text-sm text-accent underline">
                  oumar.nguirane@gungueconsulting.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-sm">Adresse</p>
                <p className="text-sm text-muted-foreground">Dakar, Sénégal</p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed">
              AO Insights Africa est développé par <span className="font-medium text-foreground">Gunguë Consulting</span> — Dakar, Sénégal.
              Cabinet de conseil stratégique spécialisé dans l'accompagnement des soumissionnaires en Afrique de l'Ouest.
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card-soft space-y-4">
            <div>
              <Label>Nom</Label>
              <Input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="mt-1" placeholder="Votre nom" />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" placeholder="votre@email.com" />
            </div>
            <div>
              <Label>Message</Label>
              <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1" rows={5} placeholder="Votre message..." />
            </div>
            <Button onClick={handleSubmit} className="w-full bg-gold-gradient text-accent-foreground hover:opacity-95">
              Envoyer
            </Button>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
