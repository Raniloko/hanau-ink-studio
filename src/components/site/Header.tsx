import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

import { Logo } from "./Logo";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/artists", label: t.nav.artists },
    { to: "/info", label: t.nav.info },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-sm uppercase tracking-[0.4em] text-foreground">
            {STUDIO.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="font-display text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className="hidden items-center gap-1 border border-border px-1 py-1 sm:flex"
            aria-label={t.common.langLabel}
          >
            {(["de", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`px-2 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.2em] transition-colors ${
                  locale === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="hidden border border-primary px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            {t.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border py-4 font-display text-sm uppercase tracking-[0.25em] text-muted-foreground last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-4">
              {(["de", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`border border-border px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.2em] ${
                    locale === code ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
