import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown, LogOut, User as UserIcon } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md bg-hero-gradient flex items-center justify-center shadow-card-soft">
        <span className="font-display font-bold text-white text-sm">AO</span>
      </div>
      <span className="font-display font-semibold text-foreground text-lg tracking-tight">
        AO Insights<span className="text-accent">.</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { user, firstName, plan, signOut } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-accent ${
        path === to ? "text-accent" : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            {navLink("/appels-offres", "Appels d'offres")}
            {user && navLink("/assistant", "Assistant")}
            {user && navLink("/dashboard", "Dashboard")}
            {navLink("/tarifs", "Tarifs")}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button className="relative h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-accent" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-muted">
                    <div className="h-7 w-7 rounded-full bg-hero-gradient text-white flex items-center justify-center text-xs font-semibold">
                      {firstName.slice(0, 1).toUpperCase() || "U"}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">{firstName}</span>
                    <span className="hidden sm:inline text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent/15 text-accent uppercase">
                      {plan}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem onClick={() => navigate({ to: "/profil" })}>
                    <UserIcon className="h-4 w-4 mr-2" /> Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/dashboard" })}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => {
                      await signOut();
                      navigate({ to: "/" });
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Connexion</Link>
              </Button>
              <Button size="sm" asChild className="bg-gold-gradient text-accent-foreground hover:opacity-90 font-semibold shadow-card-soft">
                <Link to="/register">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}