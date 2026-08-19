import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Studio-Login — PTAH Tattoo Hanau" },
      { name: "description", content: "Interner Login für das PTAH Tattoo Team in Hanau." },
      { property: "og:title", content: "Studio-Login — PTAH Tattoo Hanau" },
      { property: "og:description", content: "Interner Login für das PTAH Tattoo Team." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Willkommen zurück");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Konto erstellt — bitte E-Mail bestätigen.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center bg-ink px-4 py-20">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
        <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          Intern
        </p>
        <h1 className="mt-3 font-display text-3xl uppercase tracking-tight text-on-dark">
          Studio-Login
        </h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-on-dark-muted">
              E-Mail
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-white/15 bg-white/5 text-on-dark placeholder:text-on-dark-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-on-dark-muted">
              Passwort
            </Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-white/15 bg-white/5 text-on-dark placeholder:text-on-dark-muted"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "..." : mode === "signin" ? "Anmelden" : "Konto erstellen"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-xs uppercase tracking-[0.25em] text-on-dark-muted transition-colors hover:text-primary"
        >
          {mode === "signin" ? "Neues Konto anlegen" : "Zurück zum Login"}
        </button>
      </div>
    </section>
  );
}
