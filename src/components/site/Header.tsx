import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

import { Logo } from "./Logo";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/artists", label: t.nav.artists },
    { to: "/info", label: t.nav.info },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  const langToggle = (
    <div
      className="flex shrink-0 items-center gap-1 border border-border p-1"
      aria-label={t.common.langLabel}
    >
      {(["de", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-2 py-1 font-display text-[0.6rem] uppercase leading-none tracking-[0.2em] transition-colors ${
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-5 lg:flex lg:justify-between lg:gap-6">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-foreground sm:h-12 sm:w-12">
            <Logo className="h-7 w-7" blend={false} />
          </span>
          <span className="truncate font-display text-[0.75rem] uppercase tracking-[0.32em] text-foreground sm:text-sm sm:tracking-[0.4em]">
            {STUDIO.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-7">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="whitespace-nowrap font-display text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground xl:tracking-[0.25em]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden lg:block">{langToggle}</div>

          <Link
            to="/contact"
            className="hidden whitespace-nowrap border border-primary px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex"
          >
            {t.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-foreground lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="absolute inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border py-4 font-display text-sm uppercase tracking-[0.22em] text-muted-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-3 py-6">
              {langToggle}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center whitespace-nowrap bg-primary px-5 py-3 font-display text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground"
              >
                {t.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
