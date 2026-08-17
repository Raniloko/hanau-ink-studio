export function SectionHeading({
  kicker,
  title,
  text,
  align = "left",
}: {
  kicker?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {kicker ? (
        <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl uppercase tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {text ? <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{text}</p> : null}
    </div>
  );
}
