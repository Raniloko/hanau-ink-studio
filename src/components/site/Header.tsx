import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";

import { Logo } from "./Logo";

export function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      return;
    }

    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const focusTimer = window.setTimeout(() => focusables()[0]?.focus({ preventScroll: true }), 380);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);



  const links = [
    { to: "/", label: t.nav.home },
    { to: "/gallery", label: t.nav.gallery },
    { to: "/artists", label: t.nav.artists },
    { to: "/info", label: t.nav.info },
    { to: "/contact", label: t.nav.contact },
  ] as const;

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 text-foreground backdrop-blur-xl">

      <div className="mx-auto grid h-20 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <Logo className="h-11 sm:h-12 lg:h-14" />
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

        <div className="flex shrink-0 items-center gap-3">
          <div
            className="hidden items-center gap-1 border border-border px-1 py-1 sm:flex"
            aria-label={t.common.langLabel}
          >
            {(["de", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`px-2 py-0.5 font-display text-[0.6rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  locale === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-1 sm:flex">
            <a
              href={STUDIO.instagramStudio}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @ptah_tattoos"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={STUDIO.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok @tijeeq"
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Music2 className="h-4 w-4" />
            </a>
          </div>

          <Link
            to="/contact"
            className="hidden border border-primary px-4 py-2 font-display text-[0.65rem] uppercase tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            {t.nav.cta}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border lg:hidden"
            aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-4 w-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 block h-[1.5px] w-5 bg-foreground transition-all duration-300 ease-out ${
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
    </header>

      {/* Slide-in panel below the navbar */}
      <div
        className={`fixed inset-x-0 top-20 bottom-0 z-[60] overflow-hidden lg:hidden ${open ? "" : "pointer-events-none"}`}

        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuLabel}
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm transform-gpu flex-col overflow-y-auto border-l border-border bg-card shadow-2xl transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] [backface-visibility:hidden] [will-change:transform] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav aria-label={t.nav.menuLabel} className="flex flex-col px-6 py-4">
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
            <div className="mt-6 flex items-center gap-2">
              <a
                href={STUDIO.instagramStudio}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 border border-border py-3 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={STUDIO.tiktok}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 border border-border py-3 font-display text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Music2 className="h-4 w-4" />
                TikTok
              </a>
            </div>
          </nav>
        </aside>
      </div>
    </>

  );
}
