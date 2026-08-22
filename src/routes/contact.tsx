import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MapPin, Music2 } from "lucide-react";

import { BookingWizard } from "@/components/site/BookingWizard";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Termin anfragen — PTAH Tattoo Hanau" },
      {
        name: "description",
        content:
          "Tattoo-Termin im PTAH Studio Hanau anfragen: Idee, Körperstelle und Wunschzeitraum senden – wir melden uns per E-Mail.",
      },
      { property: "og:title", content: "Termin anfragen — PTAH Tattoo Hanau" },
      {
        property: "og:description",
        content: "Anfrageformular, Adresse und Öffnungszeiten des PTAH Tattoo Studios in Hanau.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-20 sm:pb-28">
      <BookingWizard />

      <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3">

          <div className="soft-panel lift border border-border p-6">
            <h2 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
              {t.contact.studioTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {STUDIO.street}
                  <br />
                  {STUDIO.zip}
                </span>
              </li>
            </ul>
          </div>

          <div className="soft-panel lift border border-border p-6">
            <h2 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
              {t.contact.hoursTitle}
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {t.contact.hours.map((entry) => (
                <div key={entry.day} className="flex justify-between py-2 text-sm">
                  <dt className="text-muted-foreground">{entry.day}</dt>
                  <dd>{entry.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">{t.contact.hoursNote}</p>
          </div>

          <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-border bg-card/20 font-display text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            {t.contact.mapPlaceholder}
          </div>

          <div className="soft-panel lift border border-border p-6">
            <h2 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
              {t.contact.socialTitle}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={STUDIO.instagramStudio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Instagram className="h-3.5 w-3.5" /> @ptah_tattoos
              </a>
              <a
                href={STUDIO.instagramArtist}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Instagram className="h-3.5 w-3.5" /> @tijeq
              </a>
              <a
                href={STUDIO.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Music2 className="h-3.5 w-3.5" /> TikTok
              </a>
            </div>
          </div>
      </div>
    </div>
  );
}
