import type React from "react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { translations, type Locale, type Translation } from "./translations";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

const g = globalThis as unknown as { __ptahLanguageContext?: React.Context<LanguageContextValue | null> };
const LanguageContext =
  g.__ptahLanguageContext ?? (g.__ptahLanguageContext = createContext<LanguageContextValue | null>(null));

const STORAGE_KEY = "ptah-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "de" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  // Fallback keeps the UI rendering (e.g. during HMR or partial hydration)
  return ctx ?? { locale: "de" as Locale, setLocale: () => {}, t: translations.de };
}
