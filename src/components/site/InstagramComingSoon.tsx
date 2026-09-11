import { useState } from "react";
import { Instagram, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function InstagramModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm border-0 bg-transparent p-0 shadow-2xl [&>button]:hidden">
        <DialogTitle className="sr-only">Instagram Coming Soon</DialogTitle>

        <div className="relative overflow-hidden rounded-3xl">
          {/* Instagram gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)",
            }}
          />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px",
            }}
          />

          {/* Soft light blob */}
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-20 rounded-full bg-black/20 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/35"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="relative z-10 flex flex-col px-8 pb-9 pt-10 text-white">

            {/* Icon row */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <Instagram className="h-6 w-6 text-white" strokeWidth={1.5} />
              </div>
              <span
                className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                @apexfitclub
              </span>
            </div>

            {/* Big headline — Bebas Neue */}
            <h2
              className="mt-5 text-[3.5rem] leading-none text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              Coming<br />Soon
            </h2>

            {/* Accent rule */}
            <div className="mt-3 h-[3px] w-14 rounded-full bg-white/50" />

            {/* Body — Space Grotesk */}
            <p
              className="mt-4 text-[0.82rem] font-light leading-relaxed text-white/80"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Our Instagram is on its way. Stay tuned for behind-the-scenes content,
              member results and updates from the floor at{" "}
              <span className="font-semibold text-white">Apex Fit Club</span>.
            </p>

            {/* TikTok nudge */}
            <div
              className="mt-5 flex items-center gap-2 rounded-xl bg-black/20 px-4 py-3 backdrop-blur-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span className="text-xs text-white/60">Meanwhile, find us on</span>
              <a
                href="https://www.tiktok.com/@apexfitclub_official"
                target="_blank"
                rel="noreferrer noopener"
                className="text-xs font-bold text-white underline-offset-2 hover:underline"
              >
                TikTok
              </a>
            </div>

            {/* CTA */}
            <Button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-white py-2.5 text-sm font-bold uppercase tracking-widest text-purple-700 shadow-lg hover:bg-white/90"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function InstagramComingSoon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className={className}
        onClick={(e) => { e.preventDefault(); setOpen(true); }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); }
        }}
      >
        {children}
      </span>
      <InstagramModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
