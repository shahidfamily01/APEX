import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MemberCounter } from "@/components/site/MemberCounter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { EntryGate } from "@/components/site/EntryGate";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  AboutBlock,
  LocationBlock,
  PlansTable,
  ServicesGrid,
  TimingsBlock,
  TimingBar,
} from "@/components/site/blocks";
import { RegistrationForm } from "@/components/site/RegistrationForm";
import { TrainerCard } from "@/components/site/TrainerCard";
import { Button } from "@/components/ui/button";
import { GYM, logoUrl, najamUrl, waLink, trainers } from "@/lib/gym";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex Fit Club" },
      {
        name: "description",
        content:
          "Apex Fit Club: strength, cardio and CrossFit gym on Range Road, Rawalpindi. Owned and led by Najam Ali Tariq. Separate gents and ladies timings.",
      },
      { property: "og:title", content: "Apex Fit Club — Rawalpindi" },
      {
        property: "og:description",
        content: "Strength, cardio and coaching on Range Road, Rawalpindi.",
      },
      { property: "og:image", content: najamUrl.startsWith("http") ? najamUrl : "" },
    ].filter((m) => !("content" in m && m.content === "")),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ExerciseGym",
          name: "Apex Fit Club",
          description:
            "Strength, cardio and CrossFit gym on Range Road, Rawalpindi with separate gents and ladies hours.",
          telephone: "+923305966918",
          email: "apexfitclub@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "1st Floor, Madina Tower, Near Punjab Cash & Carry, Range Road",
            addressLocality: "Rawalpindi",
            addressCountry: "PK",
          },
          openingHours: ["Mo-Su 06:00-10:00", "Mo-Su 16:00-25:00"],
          sameAs: ["https://www.tiktok.com/@apexfitclub_official"],
        }),
      },
    ],
  }),
  component: Home,
});

const HERO_PHRASES = [
  "Strength. Cardio. CrossFit.",
  "A coached training floor.",
  "Separate gents and ladies hours.",
  "Madina Tower, Range Road, Rawalpindi.",
];

function useTypewriter(phrases: string[], typingSpeed = 55, pauseMs = 1800, deleteSpeed = 30) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const current = phrases[phraseIndex];
    if (!deleting && charIndex < current.length) {
      timeout.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else if (!deleting && charIndex === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIndex > 0) {
      timeout.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, deleteSpeed);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
    }
    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [charIndex, deleting, phraseIndex, phrases, typingSpeed, pauseMs, deleteSpeed]);

  return displayed;
}

function Home() {
  const typed = useTypewriter(HERO_PHRASES);
  return (
    <div className="min-h-screen bg-background">
      <EntryGate />
      <SiteHeader />

      <section className="relative isolate min-h-[86vh] overflow-hidden">
        <img
          src={najamUrl}
          alt="Najam Ali Tariq, owner of Apex Fit Club, standing in the gym"
          className="absolute inset-0 h-full w-full object-cover object-top"
          fetchPriority="high"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-between px-4 py-10">
          <img
            src={logoUrl}
            alt="Apex Fit Club logo"
            className="h-20 w-auto self-start object-contain object-left sm:h-24 max-w-[220px] sm:max-w-[260px]"
          />
          <div className="max-w-3xl pb-6">
            <h1 className="text-5xl leading-[0.95] sm:text-7xl md:text-8xl">Apex Fit Club</h1>
            <p className="mt-4 text-base font-semibold uppercase tracking-[0.25em] text-primary sm:text-lg">
              Owned &amp; Led by Najam Ali Tariq.
            </p>
            <p className="mt-5 flex min-h-[1.5rem] max-w-xl items-center gap-1 text-sm leading-relaxed text-muted-foreground sm:min-h-[1.75rem] sm:text-base" aria-live="polite">
              <span>{typed}</span>
              <span className="inline-block h-[1.1em] w-[2px] animate-pulse bg-primary align-middle" aria-hidden />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/register">Join Now</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a
                  href={waLink(GYM.whatsapp, "Hi Apex Fit Club, I want to join the gym.")}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </Button>
            </div>
            <MemberCounter />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-20">
        <section>
          <TimingBar />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Membership" title="Plans & pricing" />
          <PlansTable />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Services" title="What we offer" />
          <ServicesGrid />
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Trainers" title="Meet the team" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trainers.map((t) => (
              <TrainerCard key={t.name} trainer={t} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading eyebrow="Join Now" title="Register your membership" />
          <div className="max-w-xl">
            <RegistrationForm gender="male" />
          </div>
        </section>

        <section className="mt-20 border-t border-border pt-20">
          <SectionHeading eyebrow="Location" title="Madina Tower, Range Road" />
          <LocationBlock />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
