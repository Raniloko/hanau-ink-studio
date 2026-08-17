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

const introIcons = [Hand, Biohazard, Lock];

function Index() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="relative grain overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Innenansicht des PTAH Tattoo Studios in Hanau"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_60%,transparent)_0%,color-mix(in_oklab,var(--background)_70%,transparent)_55%,var(--background)_100%)]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-14 text-center sm:pb-24 sm:pt-20">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
            {t.hero.kicker}
          </p>
          <h1 className="mt-5 font-display text-4xl uppercase leading-[1] tracking-tight sm:text-6xl">
            {t.hero.title}
            <span className="mt-1 block font-gothic text-4xl normal-case tracking-normal text-primary text-glow sm:text-6xl">
              {t.hero.titleAccent}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[0.8rem] leading-relaxed text-muted-foreground sm:text-base">
            {t.hero.text}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-foreground px-5 py-3 font-display text-[0.7rem] uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 font-display text-[0.7rem] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-b border-border px-5 py-14 sm:py-20">
        <p className="text-center font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          {t.intro.kicker}
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
          {t.intro.points.map((point, index) => {
            const Icon = introIcons[index] ?? Hand;
            return (
              <div key={point.title} className="flex flex-col items-center text-center">
                <Icon className="h-9 w-9 text-foreground" strokeWidth={1} />
                <h3 className="mt-4 font-display text-[0.7rem] uppercase tracking-[0.18em] sm:text-sm">
                  {point.title}
                </h3>
                <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground sm:text-sm">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <h2 className="text-center font-display text-2xl uppercase tracking-tight sm:text-4xl">
          {t.styles.title}
        </h2>
        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
          {t.styles.items.slice(0, 3).map((item, index) => (
            <div key={item.name}>
              <span className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-gothic text-2xl leading-none text-foreground sm:text-4xl">
                {item.name}
              </h3>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-muted-foreground sm:text-sm">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <p className="border-t border-primary pt-6 font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
          {t.galleryTeaser.kicker}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {t.styles.items.slice(0, 4).map((item) => (
            <div key={item.name} className="border border-border bg-card/40 p-2">
              <PlaceholderFrame label={t.gallery.placeholder} ratio="aspect-[4/3]" />
              <p className="px-1 pb-1 pt-3 font-display text-[0.6rem] uppercase tracking-[0.2em] text-foreground">
                {item.name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary hover:underline"
          >
            {t.galleryTeaser.link}
            <ArrowRight className="h-4 w-4" />
          </Link>
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
