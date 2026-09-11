import { Mail, MapPin, MessageCircle } from "lucide-react";

import { GYM, mapEmbedSrc, waLink } from "@/lib/gym";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <p className="display text-2xl font-black uppercase leading-none tracking-[0.18em]">
            Apex <span className="text-primary">Fit Club</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Rawalpindi's training floor for strength, cardio and conditioning. Owned &amp; led by
            Najam Ali Tariq.
          </p>
          <div className="mt-5 flex gap-4 text-sm font-medium uppercase tracking-wide">
            {GYM.socials.tiktok && (
              <a
                href={GYM.socials.tiktok}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-primary"
              >
                TikTok
              </a>
            )}
            {GYM.socials.instagram && (
              <a
                href={GYM.socials.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted-foreground hover:text-primary"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4 text-sm">
          <h2 className="display text-base tracking-wide">Contact</h2>
          <a href={`mailto:${GYM.email}`} className="flex items-start gap-2 text-muted-foreground hover:text-primary">
            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
            {GYM.email}
          </a>
          <a
            href={waLink(GYM.whatsapp, "Hi Apex Fit Club, I want to know about membership.")}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-start gap-2 text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
            WhatsApp {GYM.whatsappDisplay}
          </a>
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {GYM.address}
          </p>
        </div>

        <div>
          <h2 className="display mb-4 text-base tracking-wide">Find Us</h2>
          <div className="overflow-hidden rounded-sm border border-border">
            <iframe
              title="Apex Fit Club location map"
              src={mapEmbedSrc}
              className="h-48 w-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Apex Fit Club, Rawalpindi. All rights reserved.
      </div>
    </footer>
  );
}
