import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export type Plan = "Gratuit" | "Pro" | "Expert";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  plan: Plan;
  firstName: string;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan>("Gratuit");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    if (typeof window !== "undefined") {
      const p = localStorage.getItem("ao_plan") as Plan | null;
      if (p) setPlan(p);
    }
    return () => sub.subscription.unsubscribe();
  }, []);

  const firstName =
    (user?.user_metadata?.first_name as string | undefined) ?? user?.email?.split("@")[0] ?? "";

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        plan,
        firstName,
        async signIn(email, password) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          return { error: error?.message ?? null };
        },
        async signUp(email, password, first_name, last_name) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
              data: { first_name, last_name },
            },
          });
          return { error: error?.message ?? null };
        },
        async signOut() {
          await supabase.auth.signOut();
        },
        async resetPassword(email) {
          const redirectTo =
            typeof window !== "undefined" ? `${window.location.origin}/reset-password` : undefined;
          const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
          return { error: error?.message ?? null };
        },
        async updatePassword(currentPassword, newPassword) {
          const email = user?.email;
          if (!email) return { error: "Utilisateur non connecté" };
          const { error: reauthErr } = await supabase.auth.signInWithPassword({
            email,
            password: currentPassword,
          });
          if (reauthErr) return { error: "Mot de passe actuel incorrect" };
          const { error } = await supabase.auth.updateUser({ password: newPassword });
          return { error: error?.message ?? null };
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function setPlanLocal(p: Plan) {
  if (typeof window !== "undefined") localStorage.setItem("ao_plan", p);
}