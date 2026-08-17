import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useLanguage } from "@/i18n/LanguageProvider";

import { Logo } from "./Logo";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/artists", label: t.nav.artists },
    { to: "/info", label: t.nav.info },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  const dark = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-500 ease-out ${
        dark
          ? "border-primary/40 bg-primary/95 text-primary-foreground"
          : "border-border bg-background/85 text-foreground"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo className="h-7 sm:h-8" inverted={dark} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              activeProps={{ className: dark ? "opacity-100" : "text-primary" }}
              className={`font-display text-[0.7rem] uppercase tracking-[0.25em] transition-colors duration-500 ${
                dark ? "text-primary-foreground/75 hover:text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`hidden items-center gap-1 border px-1 py-1 transition-colors duration-500 sm:flex ${
              dark ? "border-primary-foreground/40" : "border-border"
            }`}
            aria-label={t.common.langLabel}
          >
            {(["de", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`px-2 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  locale === code
                    ? dark
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary text-primary-foreground"
                    : dark
                      ? "text-primary-foreground/70 hover:text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className={`hidden border px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.25em] transition-colors duration-500 sm:inline-flex ${
              dark
                ? "border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {t.nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`relative inline-flex h-9 w-9 items-center justify-center border transition-colors duration-500 lg:hidden ${
              dark ? "border-primary-foreground/50" : "border-border"
            }`}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 block h-[1.5px] w-5 transition-all duration-300 ease-out ${
                    dark ? "bg-primary-foreground" : "bg-foreground"
                  } ${
                    i === 0
                      ? open
                        ? "top-1/2 -translate-y-1/2 rotate-45"
                        : "top-0"
                      : i === 1
                        ? `top-1/2 -translate-y-1/2 ${open ? "opacity-0" : "opacity-100"}`
                        : open
                          ? "top-1/2 -translate-y-1/2 -rotate-45"
                          : "bottom-0"
                  }`}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Slide-in panel below the navbar */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-primary/30 bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border py-4 font-display text-sm uppercase tracking-[0.25em] text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-5">
              {(["de", "en"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`border px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.2em] transition-colors ${
                    locale === code
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="border border-primary px-4 py-3 text-center font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.nav.cta}
            </Link>
          </nav>
        </aside>
      </div>
    </header>
  );
}
