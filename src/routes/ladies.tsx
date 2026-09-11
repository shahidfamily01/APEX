import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/SectionHeading";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import {
  AboutBlock,
  LocationBlock,
  PlansTable,
  ReviewsBlock,
  ServicesGrid,
  TimingsBlock,
} from "@/components/site/blocks";
import { Button } from "@/components/ui/button";
import { TrainerCard } from "@/components/site/TrainerCard";
import { GYM, ladiesTrainers, logoUrl, waLink } from "@/lib/gym";

export const Route = createFileRoute("/ladies")({
  head: () => ({
    meta: [
      { title: "Ladies Section | Apex Fit Club Rawalpindi" },
      {
        name: "description",
        content:
          "The private Apex Fit Club ladies portal: services, membership plans, ladies-only timings 10 AM–4 PM, location and registration.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Apex Fit Club — Ladies Section" },
      { property: "og:description", content: "A private training space for our women members." },
    ],
  }),
  component: Ladies,
});

function Ladies() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Apex Fit Club logo" className="h-10 w-auto object-contain" />
            <span className="display text-lg leading-none">Apex Fit Club · Ladies</span>
          </div>
          <Button asChild size="sm" variant="secondary">
            <Link to="/">Exit</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading
          as="h1"
          eyebrow="Ladies Section"
          title="Your own private training space"
          subtitle="A women-only portal with dedicated hours, the same equipment and full privacy. Nothing here is linked from the general site."
        />
        <AboutBlock />

        <section className="mt-20">
          <SectionHeading eyebrow="Services" title="What's included" />
          <ServicesGrid />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Trainers" title="Ladies master trainer" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ladiesTrainers.map((t) => (
              <TrainerCard key={t.name} trainer={t} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Membership" title="Plans & pricing" />
          <PlansTable />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Timings" title="Ladies-only hours" />
          <TimingsBlock scope="ladies" />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Location" title="Where to find us" />
          <LocationBlock />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Events" title="Upcoming events" />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="surface-card flex items-center justify-center rounded-sm p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No events scheduled right now — check back soon!
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl">Event Registration</h3>
              <RegistrationForm kind="event" gender="female" showPlan={false} />
            </div>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Reviews" title="From our members" />
          <ReviewsBlock />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Join Now" title="Register your membership" />
          <div className="max-w-xl">
            <RegistrationForm gender="female" />
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Contact" title="Talk to us" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Button asChild size="lg">
              <a
                href={waLink(GYM.whatsapp, "Hi Apex Fit Club, I'm asking about the ladies section.")}
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
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
