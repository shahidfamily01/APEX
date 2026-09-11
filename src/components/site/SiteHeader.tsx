import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";


import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/trainers", label: "Trainers" },
  { to: "/membership", label: "Membership" },
  { to: "/timings", label: "Timings" },
  { to: "/location", label: "Location" },
  { to: "/events", label: "Events" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="display text-xl font-black uppercase leading-none tracking-[0.18em] text-foreground">
            Apex <span className="text-primary">Fit Club</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/register">Join Now</Link>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            className="rounded-sm border border-border p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {[...links, { to: "/register", label: "Join Now" } as const].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
