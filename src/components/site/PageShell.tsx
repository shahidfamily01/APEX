import type { ReactNode } from "react";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children, chrome = true }: { children: ReactNode; chrome?: boolean }) {
  return (
    <div className="min-h-screen bg-background">
      {chrome ? <SiteHeader /> : null}
      <main className="mx-auto max-w-6xl px-4 py-14">{children}</main>
      <SiteFooter />
    </div>
  );
}
