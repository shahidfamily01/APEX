import { Clock } from "lucide-react";

import {
  GYM,
  mapDirectionsUrl,
  mapEmbedSrc,
  offers,
  plans,
  services,
  timings,
} from "@/lib/gym";
import { Button } from "@/components/ui/button";
import { ReviewsSection } from "@/components/site/ReviewsSection";

export function ServicesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <article key={s.title} className="surface-card glow-hover overflow-hidden rounded-sm">
          <img
            src={s.photo}
            alt={`${s.title} at Apex Fit Club, Rawalpindi`}
            className="aspect-[4/3] w-full object-cover object-center"
            loading="lazy"
          />
          <div className="p-6">
            <h3 className="text-lg leading-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TimingBar({ scope = "both" }: { scope?: "both" | "ladies" }) {
  const rows =
    scope === "ladies"
      ? ([["Ladies", timings.ladies]] as const)
      : ([
          ["Gents", timings.gents],
          ["Ladies", timings.ladies],
        ] as const);

  return (
    <div className="border-y border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-3 px-4 py-4">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
          <Clock className="h-4 w-4" aria-hidden /> Timings
        </span>
        {rows.map(([label, times]) => (
          <span key={label} className="text-sm text-muted-foreground">
            <span className="font-semibold uppercase tracking-wide text-foreground">{label}:</span>{" "}
            {times.join("  •  ")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PlansTable() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p) => (
          <article
            key={p.name}
            className={`surface-card rounded-sm p-6 ${"featured" in p && p.featured ? "ring-1 ring-primary" : ""}`}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{p.note}</p>
            <h3 className="mt-3 text-xl leading-tight">{p.name}</h3>
            <p className="mt-4 font-display text-3xl text-primary">Rs. {p.price.toLocaleString()}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {offers.map((o) => (
          <div
            key={o}
            className="rounded-sm border border-primary/40 bg-primary/10 px-5 py-4 text-sm font-semibold uppercase tracking-wide"
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimingsBlock({ scope = "both" }: { scope?: "both" | "ladies" }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {scope === "both" ? (
        <article className="surface-card rounded-sm p-6">
          <h3 className="text-lg">Gents</h3>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            {timings.gents.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
      ) : null}
      <article className="surface-card rounded-sm p-6">
        <h3 className="text-lg">Ladies</h3>
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {timings.ladies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export function LocationBlock() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="overflow-hidden rounded-sm border border-border">
        <iframe
          title="Apex Fit Club on Google Maps"
          src={mapEmbedSrc}
          className="h-[360px] w-full"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="surface-card rounded-sm p-6">
        <h3 className="text-lg">Address</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{GYM.address}</p>
        <Button asChild className="mt-6">
          <a href={mapDirectionsUrl} target="_blank" rel="noreferrer noopener">
            Get Directions
          </a>
        </Button>
      </div>
    </div>
  );
}

export function ReviewsBlock() {
  return (
    <div className="space-y-10">
      <ReviewsSection />

      <div className="grid gap-4 sm:grid-cols-3">
        {/* TikTok */}
        {GYM.socials.tiktok && (
          <a
            href={GYM.socials.tiktok}
            target="_blank"
            rel="noreferrer noopener"
            className="surface-card rounded-sm p-6"
          >
            <h3 className="text-lg">TikTok</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              See what members post and leave your own review.
            </p>
          </a>
        )}

        {GYM.socials.instagram && (
          <a
            href={GYM.socials.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="surface-card cursor-pointer rounded-sm p-6 transition-colors hover:border-primary/40 block"
          >
            <h3 className="text-lg">Instagram</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow us for the latest updates and behind-the-scenes content.
            </p>
          </a>
        )}
      </div>

      <div className="surface-card rounded-sm p-4 sm:p-6">
        <h3 className="text-lg">Latest on TikTok</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          This feed updates automatically whenever a new video is posted.
        </p>
        <div className="mt-4 overflow-hidden rounded-sm">
          <iframe
            title="Apex Fit Club latest TikTok posts"
            src="https://www.tiktok.com/embed/@apexfitclub_official"
            className="h-[560px] w-full border-0"
            loading="lazy"
            allow="encrypted-media"
          />
        </div>
      </div>
    </div>
  );
}

export function AboutBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[
        {
          h: "Built on discipline",
          p: "Apex Fit Club is a serious training floor in the heart of Range Road, Rawalpindi — free weights, machines, cardio rigs and coaches who actually coach.",
        },
        {
          h: "Coached by the owner",
          p: "Najam Ali Tariq trains on the floor every day. Ten years of experience turning beginners into confident, strong lifters.",
        },
        {
          h: "Space for everyone",
          p: "Separate gents and ladies hours with a fully private ladies portal, clean locker rooms, physiotherapy support and nutrition guidance.",
        },
      ].map((c) => (
        <article key={c.h} className="surface-card rounded-sm p-6">
          <h3 className="text-lg leading-tight">{c.h}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.p}</p>
        </article>
      ))}
    </div>
  );
}
