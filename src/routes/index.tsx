import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import heroAsset from "@/assets/studio-hero.png.asset.json";
import { Logo } from "@/components/site/Logo";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SocialFeed } from "@/components/site/SocialFeed";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";
import { GALLERY } from "@/lib/gallery";


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
      <section className="relative grain min-h-[88vh] overflow-hidden bg-ink">
        <img
          src={heroAsset.url}
          alt="Innenansicht des PTAH Tattoo Studios in Hanau"
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--ink) 55%, transparent) 0%, color-mix(in oklab, var(--ink) 25%, transparent) 38%, color-mix(in oklab, var(--ink) 82%, transparent) 78%, color-mix(in oklab, var(--ink) 78%, transparent) 93%, var(--background) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "radial-gradient(60% 120% at 50% 0%, color-mix(in oklab, var(--primary) 22%, transparent), transparent)",
          }}
        />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-24 pt-28">
          <div className="reveal max-w-3xl">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.5em] text-primary">
              {t.hero.kicker}
            </p>
            <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-on-dark sm:text-7xl">
              {t.hero.title}
              <span className="mt-2 block font-gothic text-6xl normal-case tracking-normal text-primary text-glow sm:text-8xl">
                {t.hero.titleAccent}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-relaxed text-on-dark-muted sm:text-base">
              {t.hero.text}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="sheen inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 border border-on-dark-muted/40 px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-on-dark backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-b border-border bg-background py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5">
          {t.marquee.map((word, i) => (
            <Reveal key={word} delay={i * 60}>
              <span className="font-display text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                {word}
              </span>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="aurora relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <Reveal>
          <SectionHeading kicker={t.intro.kicker} title={t.intro.title} text={t.intro.text} />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {t.intro.points.map((point, i) => (
            <Reveal key={point.title} delay={i * 110}>
              <div className="soft-panel lift h-full border border-border p-7">
                <Logo className="h-7 w-7" />
                <h3 className="mt-5 font-display text-sm uppercase tracking-[0.2em]">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--background)_0%,color-mix(in_oklab,var(--primary)_7%,var(--background))_35%,color-mix(in_oklab,var(--primary)_7%,var(--background))_65%,var(--background)_100%)]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
          <Reveal>
            <SectionHeading kicker={t.styles.kicker} title={t.styles.title} text={t.styles.text} />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.styles.items.map((item, index) => (
              <Reveal key={item.name} delay={index * 90}>
                <div className="sheen lift group h-full border border-border bg-card p-6">
                  <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-gothic text-3xl text-foreground transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              kicker={t.galleryTeaser.kicker}
              title={t.galleryTeaser.title}
              text={t.galleryTeaser.text}
            />
          </Reveal>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary hover:underline"
          >
            {t.galleryTeaser.link}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GALLERY.slice(0, 4).map((item, i) => (
            <Reveal key={item.url} delay={i * 100}>
              <figure className="group relative aspect-[4/5] overflow-hidden bg-card hairline">
                <img
                  src={item.url}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <SocialFeed />


      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--background) 0%, color-mix(in oklab, var(--primary) 88%, var(--ink)) 18%, color-mix(in oklab, var(--primary) 70%, var(--ink)) 82%, var(--background) 100%)",
          }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-24 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="font-display text-2xl uppercase tracking-tight text-on-dark sm:text-4xl">
              {t.hero.ctaPrimary}
            </h2>
            <p className="mt-2 text-sm text-on-dark-muted">
              {STUDIO.street}, {STUDIO.zip}
            </p>
          </Reveal>
          <Link
            to="/contact"
            className="sheen inline-flex items-center gap-2 bg-card px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary transition-transform hover:-translate-y-0.5"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

