import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Instagram, Music2 } from "lucide-react";
import { useEffect } from "react";

import { getInstagramFeed } from "@/lib/instagram.functions";


import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";
import { GALLERY } from "@/lib/gallery";

function TikTokEmbed() {
  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>("script[src='https://www.tiktok.com/embed.js']");
    if (existing) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return (
    <blockquote
      className="tiktok-embed w-full"
      cite="https://www.tiktok.com/@tijeeq"
      data-unique-id="tijeeq"
      data-embed-type="creator"
      style={{ maxWidth: "780px", minWidth: "288px" }}
    >
      <section>
        <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@tijeeq?refer=creator_embed">
          @tijeeq
        </a>
      </section>
    </blockquote>
  );
}

export function SocialFeed() {
  const { t } = useLanguage();
  const { data } = useQuery({
    queryKey: ["instagram-feed"],
    queryFn: () => getInstagramFeed(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const live = (data?.items ?? []).slice(0, 9);
  const tiles =
    live.length > 0
      ? live.map((post) => ({
          url: post.url,
          alt: post.caption || "Tattoo von PTAH Tattoo Hanau",
          href: post.permalink,
        }))
      : GALLERY.slice(0, 6).map((item) => ({
          url: item.url,
          alt: item.alt,
          href: STUDIO.instagramStudio,
        }));


  return (
    <section className="relative mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <Reveal>
        <SectionHeading kicker={t.social.kicker} title={t.social.title} text={t.social.text} />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="soft-panel border border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.3em] text-foreground">
                <Instagram className="h-4 w-4 text-primary" />
                @ptah_tattoos
              </span>
              <a
                href={STUDIO.instagramStudio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-display text-[0.6rem] uppercase tracking-[0.25em] text-primary hover:underline"
              >
                {t.social.follow}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {tiles.map((item) => (
                <a
                  key={item.url}
                  href={STUDIO.instagramStudio}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square overflow-hidden bg-card"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[color-mix(in_oklab,var(--primary)_45%,transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="soft-panel border border-border p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 font-display text-[0.65rem] uppercase tracking-[0.3em] text-foreground">
                <Music2 className="h-4 w-4 text-primary" />
                @tijeeq
              </span>
              <a
                href={STUDIO.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-display text-[0.6rem] uppercase tracking-[0.25em] text-primary hover:underline"
              >
                {t.social.follow}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-5 overflow-hidden">
              <TikTokEmbed />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
