import { Logo } from "./Logo";

export function PlaceholderFrame({
  label,
  ratio = "aspect-[4/5]",
  caption,
}: {
  label: string;
  ratio?: string;
  caption?: string;
}) {
  return (
    <figure
      className={`group relative ${ratio} overflow-hidden bg-card hairline transition-colors duration-500 hover:border-primary`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_46%,color-mix(in_oklab,var(--primary)_12%,transparent)_50%,transparent_54%)]" />
      <div className="absolute inset-3 border border-dashed border-border" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
        <Logo className="h-10 w-10 opacity-70" />
        <span className="font-display text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          {label}
        </span>
      </div>
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 px-3 py-2 font-display text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
