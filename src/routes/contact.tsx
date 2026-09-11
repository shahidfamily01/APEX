import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { LocationBlock } from "@/components/site/blocks";
import { Button } from "@/components/ui/button";
import { GYM, waLink } from "@/lib/gym";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Apex Fit Club — WhatsApp, Email & Address" },
      {
        name: "description",
        content:
          "Contact Apex Fit Club Rawalpindi on WhatsApp 0330-5966918 or apexfitclub@gmail.com. Madina Tower, Range Road.",
      },
      { property: "og:title", content: "Contact Apex Fit Club" },
      { property: "og:description", content: "WhatsApp, email and directions." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Talk to the team"
        subtitle="Questions about plans, timings or personal training? Message us — we reply fast."
      />
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        <Button asChild size="lg">
          <a
            href={waLink(GYM.whatsapp, "Hi Apex Fit Club, I have a question.")}
            target="_blank"
            rel="noreferrer noopener"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp {GYM.whatsappDisplay}
          </a>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={`mailto:${GYM.email}`}>
            <Mail className="h-4 w-4" /> {GYM.email}
          </a>
        </Button>
      </div>
      <LocationBlock />
    </PageShell>
  );
}
