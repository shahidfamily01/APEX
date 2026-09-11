import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { TimingsBlock } from "@/components/site/blocks";

export const Route = createFileRoute("/timings")({
  head: () => ({
    meta: [
      { title: "Gym Timings — Gents & Ladies Hours | Apex Fit Club" },
      {
        name: "description",
        content:
          "Apex Fit Club timings: gents 6:00–10:00 AM and 4:00 PM–1:00 AM, ladies 10:00 AM–4:00 PM, Range Road Rawalpindi.",
      },
      { property: "og:title", content: "Apex Fit Club Timings" },
      { property: "og:description", content: "Separate gents and ladies training hours." },
    ],
  }),
  component: Timings,
});

function Timings() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Timings"
        title="When the floor is open"
        subtitle="Separate hours keep the gents and ladies sessions comfortable and private."
      />
      <TimingsBlock />
    </PageShell>
  );
}
