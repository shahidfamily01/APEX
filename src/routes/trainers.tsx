import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, UserRound } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { trainers, waLink } from "@/lib/gym";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Our Trainers — Najam, Adeel & Fasih | Apex Fit Club" },
      {
        name: "description",
        content:
          "Meet the Apex Fit Club coaching team: owner Najam Ali Tariq, Adeel and Fasih. Message any trainer directly on WhatsApp.",
      },
      { property: "og:title", content: "Apex Fit Club Trainers" },
      {
        property: "og:description",
        content: "Coaching team with 5–10 years of experience each.",
      },
    ],
  }),
  component: Trainers,
});

function Trainers() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Trainers"
        title="Coaches who train with you"
        subtitle="Tap any coach to message them directly on WhatsApp and plan your first session."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trainers.map((t) => (
          <article key={t.name} className="surface-card glow-hover overflow-hidden rounded-sm">
            <div className="relative">
              {t.photo ? (
                <img
                  src={t.photo}
                  alt={`${t.name}, ${t.role} at Apex Fit Club`}
                  className="h-80 w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center bg-secondary">
                  <UserRound className="h-24 w-24 text-muted-foreground" aria-hidden />
                  <span className="sr-only">Photo coming soon</span>
                </div>
              )}
              {t.owner ? (
                <span className="absolute left-4 top-4 rounded-sm bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                  Owner
                </span>
              ) : null}
            </div>
            <div className="p-6">
              <h2 className="text-xl leading-tight">{t.name}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary">{t.role}</p>
              {t.experience ? (
                <p className="mt-1 text-xs text-muted-foreground">{t.experience}</p>
              ) : null}
              {t.specialties.length > 0 ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.specialties.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm border border-border px-2 py-1 text-[11px] uppercase tracking-wide text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
              <Button asChild className="mt-6 w-full">
                <a
                  href={waLink(t.whatsapp, `Hi ${t.name}, I'd like to train at Apex Fit Club.`)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp {t.phoneDisplay}
                </a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
