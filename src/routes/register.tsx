import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { PlansTable } from "@/components/site/blocks";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Join Now — Register for Membership | Apex Fit Club" },
      {
        name: "description",
        content:
          "Register for an Apex Fit Club membership in Rawalpindi. Choose your plan and our team will confirm your joining.",
      },
      { property: "og:title", content: "Join Apex Fit Club" },
      { property: "og:description", content: "Register online and start training this week." },
    ],
  }),
  component: Register,
});

function Register() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Join Now"
        title="Start training this week"
        subtitle="Fill the form and our team will call you to confirm your plan and first session."
      />
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <RegistrationForm />
        <div>
          <h2 className="mb-6 text-xl">Plans &amp; Pricing</h2>
          <PlansTable />
        </div>
      </div>
    </PageShell>
  );
}
