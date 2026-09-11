import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const STORAGE_KEY = "apex-gate-done";

export function EntryGate() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState<"male" | "female">("male");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function close() {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  function onEnter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    close();
    if (gender === "female") navigate({ to: "/ladies" });
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/95 px-4 py-8 backdrop-blur">
      <div className="surface-card w-full max-w-lg rounded-sm p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="display text-lg font-black uppercase tracking-[0.18em] text-primary">
            AFC
          </span>
          <div>
            <h2 className="text-xl leading-none">Welcome to Apex Fit Club</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Please select your section to continue.
            </p>
          </div>
        </div>

        <form onSubmit={onEnter} className="mt-6 space-y-6" noValidate>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wide text-muted-foreground">
              Select Gender
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {(["male", "female"] as const).map((g) => (
                <Button
                  key={g}
                  type="button"
                  variant={gender === g ? "default" : "secondary"}
                  onClick={() => setGender(g)}
                  aria-pressed={gender === g}
                >
                  {g === "male" ? "Male (Gents)" : "Female (Ladies)"}
                </Button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enter Site
          </Button>
        </form>
      </div>
    </div>
  );
}
