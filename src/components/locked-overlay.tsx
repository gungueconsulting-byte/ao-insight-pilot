import { Lock } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function LockedOverlay({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card">
      <div className="blur-sm select-none pointer-events-none">{children}</div>
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
        <div className="h-10 w-10 rounded-full bg-accent/15 flex items-center justify-center mb-2">
          <Lock className="h-4 w-4 text-accent" />
        </div>
        <p className="text-sm font-medium text-foreground max-w-xs">{label}</p>
        <Link
          to="/tarifs"
          className="mt-3 inline-flex items-center justify-center rounded-md bg-gold-gradient text-accent-foreground px-4 py-2 text-xs font-semibold"
        >
          Passer au plan Pro
        </Link>
      </div>
    </div>
  );
}