import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";
import { GALLERY } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie — PTAH Tattoo Hanau" },
      {
        name: "description",
        content:
          "Portfolio des PTAH Tattoo Studios in Hanau: Blackwork, Lettering, Fineline, Realistic und Chicano.",
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

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <Reveal>
        <SectionHeading kicker="Portfolio" title={t.gallery.title} text={t.gallery.text} />
      </Reveal>

      <div className="mt-12 columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
        {GALLERY.map((item, index) => (
          <Reveal key={item.url} delay={(index % 3) * 90}>
            <figure className="group relative overflow-hidden bg-card hairline">
              <img
                src={item.url}
                alt={item.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </figure>
          </Reveal>
        ))}
      </div>

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

