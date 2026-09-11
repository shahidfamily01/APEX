export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Tag className="rule-accent text-3xl leading-none sm:text-4xl md:text-5xl">{title}</Tag>
      {subtitle ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}
