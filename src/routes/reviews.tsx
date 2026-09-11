import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ReviewsBlock } from "@/components/site/blocks";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Member Reviews & Social | Apex Fit Club" },
      {
        name: "description",
        content:
          "Read what Apex Fit Club members say on TikTok, Instagram and Facebook — and leave your own review.",
      },
      { property: "og:title", content: "Apex Fit Club Reviews" },
      { property: "og:description", content: "Member reviews on TikTok, Instagram and Facebook." },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <PageShell>
      <SectionHeading
        as="h1"
        eyebrow="Reviews"
        title="Hear it from the members"
        subtitle="Our community posts their progress every week. Follow along and share your own experience."
      />
      <ReviewsBlock />
    </PageShell>
  );
}
