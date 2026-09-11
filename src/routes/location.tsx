import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocationBlock } from "@/components/site/blocks";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location & Directions — Range Road, Rawalpindi | Apex Fit Club" },
      {
        name: "description",
        content:
          "Find Apex Fit Club at 1st Floor, Madina Tower, above Meezan Bank, Range Road, Rawalpindi. Open the map and get directions.",
      },
      { property: "og:title", content: "Apex Fit Club Location" },
      { property: "og:description", content: "Madina Tower, Range Road, Rawalpindi." },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Location"
        title="Find us on Range Road"
        subtitle="1st Floor, Madina Tower — directly above Meezan Bank, near Punjab Cash & Carry."
      />
      <LocationBlock />
    </PageShell>
  );
}
