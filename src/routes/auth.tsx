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
      { title: "Admin Sign In | Apex Fit Club" },
      { name: "description", content: "Private sign-in for Apex Fit Club gym administration." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Apex Fit Club Admin" },
      { property: "og:description", content: "Private administration area." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      navigate({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/admin" },
      });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      if (!data.session) { toast.success("Check your email to confirm the account."); return; }
      navigate({ to: "/admin" });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="surface-card w-full max-w-md rounded-sm p-8">
        <p className="display text-center text-2xl font-black uppercase tracking-[0.2em] text-primary">
          Apex Fit Club
        </p>
        <h1 className="mt-6 text-center text-2xl">Admin Access</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Registrations are visible only to the gym owner.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Email</Label>
            <Input name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">Password</Label>
            <Input
              name="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-xs uppercase tracking-wide text-muted-foreground hover:text-primary"
        >
          {mode === "signin" ? "Create an admin account" : "I already have an account"}
        </button>
      </div>
    </div>
  );
}
