import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useState } from "react";

import { PlaceholderFrame } from "@/components/site/PlaceholderFrame";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie — PTAH Tattoo Hanau" },
      {
        name: "description",
        content:
          "Portfolio des PTAH Tattoo Studios in Hanau: Blackwork, Lettering, Fineline, Realistic, Chicano und Cover-Ups.",
      },
      { property: "og:title", content: "Galerie — PTAH Tattoo Hanau" },
      {
        property: "og:description",
        content: "Arbeiten aus dem PTAH Tattoo Studio in Hanau.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const styles = t.styles.items.map((item) => item.name);
  const slots = styles.flatMap((style) => [style, style, style]);
  const visible = filter === "all" ? slots : slots.filter((style) => style === filter);

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading kicker="Portfolio" title={t.gallery.title} text={t.gallery.text} />

      <div className="mt-10 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.25em] transition-colors ${
            filter === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {t.gallery.all}
        </button>
        {styles.map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => setFilter(style)}
            className={`border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.25em] transition-colors ${
              filter === style
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-12 text-sm text-muted-foreground">{t.gallery.empty}</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {visible.map((style, index) => (
            <PlaceholderFrame
              key={`${style}-${index}`}
              label={t.gallery.placeholder}
              caption={style}
            />
          ))}
        </div>
      )}

      <a
        href={STUDIO.instagramStudio}
        target="_blank"
        rel="noreferrer"
        className="mt-14 inline-flex items-center gap-2 border border-border px-6 py-3 font-display text-[0.65rem] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Instagram className="h-4 w-4" />
        {t.gallery.social}
      </a>
    </div>
  );
}
