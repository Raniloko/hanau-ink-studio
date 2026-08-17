import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import heroAsset from "@/assets/studio-hero.png.asset.json";
import { Logo } from "@/components/site/Logo";
import { PlaceholderFrame } from "@/components/site/PlaceholderFrame";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PTAH Tattoo Hanau — Custom Blackwork & Lettering" },
      {
        name: "description",
        content:
          "Modernes Tattoo Studio in Hanau: Custom Blackwork, Lettering, Fineline und Cover-Ups. Termin online anfragen.",
      },
      { property: "og:title", content: "PTAH Tattoo Hanau — Custom Blackwork & Lettering" },
      {
        property: "og:description",
        content: "Custom Tattoos aus Hanau. Blackwork, Lettering, Fineline. Jetzt Termin anfragen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="relative grain min-h-[88vh] overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Innenansicht des PTAH Tattoo Studios in Hanau"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_65%,transparent)_0%,color-mix(in_oklab,var(--background)_55%,transparent)_40%,var(--background)_100%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28">
          <div className="reveal max-w-3xl">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.5em] text-primary">
              {t.hero.kicker}
            </p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight sm:text-7xl">
              {t.hero.title}
              <span className="mt-2 block font-gothic text-6xl normal-case tracking-normal text-primary text-glow sm:text-8xl">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t.hero.text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-card/40 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5">
          {t.marquee.map((word) => (
            <span
              key={word}
              className="font-display text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <SectionHeading kicker={t.intro.kicker} title={t.intro.title} text={t.intro.text} />
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
          {t.intro.points.map((point) => (
            <div key={point.title} className="bg-background p-7">
              <Logo className="h-7 w-7" />
              <h3 className="mt-5 font-display text-sm uppercase tracking-[0.2em]">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
          <SectionHeading kicker={t.styles.kicker} title={t.styles.title} text={t.styles.text} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.styles.items.map((item, index) => (
              <div
                key={item.name}
                className="group relative overflow-hidden border border-border bg-background p-6 transition-colors hover:border-primary"
              >
                <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-gothic text-3xl text-foreground">{item.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker={t.galleryTeaser.kicker}
            title={t.galleryTeaser.title}
            text={t.galleryTeaser.text}
          />
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary hover:underline"
          >
            {t.galleryTeaser.link}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.styles.items.slice(0, 4).map((item) => (
            <PlaceholderFrame key={item.name} label={t.gallery.placeholder} caption={item.name} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
              {t.hero.ctaPrimary}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {STUDIO.street}, {STUDIO.zip}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
