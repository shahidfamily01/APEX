import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServicesGrid } from "@/components/site/blocks";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Gym Services — Personal Training, Cardio & Yoga | Apex Fit Club" },
      {
        name: "description",
        content:
          "Personal training, group classes, cardio and CrossFit, nutrition counseling, physiotherapy, yoga and locker rooms at Apex Fit Club Rawalpindi.",
      },
      { property: "og:title", content: "Services at Apex Fit Club" },
      {
        property: "og:description",
        content: "Training, cardio, nutrition, physiotherapy and yoga under one roof.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Services"
        title="Everything you need on one floor"
        subtitle="From your first assessment to your strongest lift — coaching, conditioning, recovery and nutrition."
      />
      <ServicesGrid />
    </PageShell>
  );
}
