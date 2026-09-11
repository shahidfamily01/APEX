import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { AboutBlock } from "@/components/site/blocks";
import { najamUrl } from "@/lib/gym";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Apex Fit Club" },
      {
        name: "description",
        content:
          "Apex Fit Club is a strength and cardio gym on Range Road, Rawalpindi, owned and led by head trainer Najam Ali Tariq.",
      },
      { property: "og:title", content: "About Apex Fit Club" },
      {
        property: "og:description",
        content: "Strength, cardio and coaching in Range Road, Rawalpindi.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="About Us"
        title="A gym built for people who show up"
        subtitle="Apex Fit Club is more than machines and mirrors. It's a coached training floor where members are pushed, tracked and looked after."
      />
      <AboutBlock />
      <div className="mt-14 grid gap-8 md:grid-cols-2">
        <img
          src={najamUrl}
          alt="Najam Ali Tariq, owner and head trainer of Apex Fit Club"
          className="w-full rounded-sm object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="text-2xl">Owner's note</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            "I opened Apex Fit Club to give Rawalpindi a gym where every member gets real coaching,
            not just a card swipe at the door. Whether you want your first pull-up or a competition
            physique, we build the plan with you and stay with you through it."
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-primary">
            Najam Ali Tariq, Owner &amp; Head Trainer
          </p>
        </div>
      </div>
    </PageShell>
  );
}
