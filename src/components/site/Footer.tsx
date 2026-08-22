import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Music2 } from "lucide-react";

import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-display text-sm uppercase tracking-[0.4em]">{STUDIO.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={STUDIO.instagramStudio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
              @ptah_tattoos
            </a>
            <a
              href={STUDIO.instagramArtist}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
              @tijeq
            </a>
            <a
              href={STUDIO.tiktok}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Music2 className="h-4 w-4" />
              @tijeeq
            </a>
          </div>
          <p className="mt-6 font-gothic text-4xl text-primary/70">Ptah</p>
        </div>

        <div>
          <h3 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
            {t.footer.nav}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="transition-colors hover:text-foreground">
                {t.nav.gallery}
              </Link>
            </li>
            <li>
              <Link to="/artists" className="transition-colors hover:text-foreground">
                {t.nav.artists}
              </Link>
            </li>
            <li>
              <Link to="/info" className="transition-colors hover:text-foreground">
                {t.nav.info}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                {t.nav.contact}
              </Link>
            </li>
            <li>
              <Link to="/auth" className="transition-colors hover:text-foreground">
                Intern
              </Link>
            </li>
          </ul>

        </div>

        <div>
          <h3 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
            {t.footer.contact}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                {STUDIO.street}
                <br />
                {STUDIO.zip}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              <a href={`mailto:${STUDIO.email}`} className="transition-colors hover:text-foreground">
                {STUDIO.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={`tel:${STUDIO.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                {STUDIO.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 shrink-0 text-primary" />
              <a
                href={STUDIO.instagramStudio}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                @ptah_tattoos
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Music2 className="h-4 w-4 shrink-0 text-primary" />
              <a
                href={STUDIO.tiktok}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                @tijeeq
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {STUDIO.name} · {t.footer.rights}
          </span>
          <span>{t.footer.imprintNote}</span>
        </div>
      </div>
    </footer>
  );
}
