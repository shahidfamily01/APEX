import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { PlansTable } from "@/components/site/blocks";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership Plans & Fees | Apex Fit Club Rawalpindi" },
      {
        name: "description",
        content:
          "Apex Fit Club fees: admission Rs. 1,000, strength Rs. 2,500/month, cardio Rs. 3,000/month, combo Rs. 5,000/month, day pass from Rs. 200.",
      },
      { property: "og:title", content: "Apex Fit Club Membership Plans" },
      {
        property: "og:description",
        content: "Monthly plans, day passes and upfront-payment free months.",
      },
    ],
  }),
  component: Membership,
});

function Membership() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Membership"
        title="Simple plans, no hidden fees"
        subtitle="Pick the plan that matches your training. Admission fee is one-time; everything else is monthly."
      />
      <PlansTable />
      <div className="mt-12">
        <Button asChild size="lg">
          <Link to="/register">Join Now</Link>
        </Button>
      </div>
    </PageShell>
  );
}
