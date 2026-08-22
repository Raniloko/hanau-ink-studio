import { Link, createFileRoute } from "@tanstack/react-router";
import { Instagram, Music2 } from "lucide-react";

import { SectionHeading } from "@/components/site/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: [
      { title: "Artists — PTAH Tattoo Hanau" },
      {
        name: "description",
        content:
          "Die Artists des PTAH Tattoo Studios in Hanau: Schwerpunkte, Handschrift und Social-Profile.",
      },
      { property: "og:title", content: "Artists — PTAH Tattoo Hanau" },
      { property: "og:description", content: "Zwei Handschriften, ein Studio in Hanau." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/artists" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/artists" }],
  }),
  component: ArtistsPage,
});

function ArtistsPage() {
  const { t } = useLanguage();
  const socials = [
    { href: STUDIO.instagramArtist, label: "@tijeq", icon: Instagram },
    { href: STUDIO.tiktok, label: "@tijeeq", icon: Music2 },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading kicker="Crew" title={t.artists.title} text={t.artists.text} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {t.artists.list.map((artist, index) => (
          <article key={artist.name} className="soft-panel lift border border-border">
            <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
              <img
                src={
                  index === 0
                    ? "/__l5e/assets-v1/3cf0f582-c77b-4e43-ac70-22e753448de6/tijeq-portrait.jpg"
                    : "/__l5e/assets-v1/66517466-4244-4aaf-97c6-0702645fab50/ano-portrait.jpg"
                }
                alt={`Portrait von ${artist.name}, Tattoo Artist bei PTAH Hanau`}
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-7">
              <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary">
                {artist.role}
              </p>
              <h2 className="mt-3 font-gothic text-4xl text-foreground">{artist.name}</h2>
              {index === 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <social.icon className="h-3.5 w-3.5" />
                      {social.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  href={STUDIO.instagramAno}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  @anotattoo
                </a>
              )}
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary hover:underline"
                >
                  {t.artists.book}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
