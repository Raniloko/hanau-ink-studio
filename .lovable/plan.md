# PTAH Tattoo Hanau — Website

Moderne, dunkle Studio-Website im Stil des Logos (Blackletter-"P", elektrisches Blau auf Schwarz) — mehrseitig, zweisprachig (DE/EN), mit Anfrageformular und Backend.

## Look & Feel

- Palette: Tiefschwarz (#0A0A0A), Anthrazit (#141414), Elektroblau (#0A84FF / Logo-Blau), gebrochenes Weiß für Text.
- Typografie: Blackletter-/Gothic-Akzent für Headlines und das Logo-Motiv, klare Grotesk (z. B. Space Grotesk / DM Sans) für Fließtext — lesbar, kein Kitsch.
- Stil: viel Schwarz, harte Kanten, dünne blaue Linien und Glow-Kanten, feine Grain-/Noise-Textur, dezente Scroll- und Hover-Animationen. Kein Purple-Gradient-Standardlook.
- Logo (Upload) als CDN-Asset in Header, Footer und Favicon-Kontext; Studio-Foto (Upload) als Hero-Bild mit dunklem Verlauf und Blackletter-Schriftzug darüber.

## Seiten

- **/** — Hero (Studio-Foto, Claim, CTA "Termin anfragen"), Kurzvorstellung, Style-Teaser, Galerie-Ausschnitt, Studio-Sektion, CTA.
- **/gallery** — Portfolio-Raster mit leeren, stilisierten Platzhalterrahmen (später mit eigenen Fotos befüllbar), Filter nach Stil (Blackwork, Lettering, Fineline, Realistic, Chicano).
- **/artists** — Artist-Karten (Ptah / Tijeq) mit Bio-Platzhalter, Spezialisierung, Social-Links (Instagram, TikTok).
- **/info** — Preise/Ablauf, Pflegehinweise, FAQ (Mindestalter, Anzahlung, Terminabsage, Schmerz, Hygiene).
- **/contact** — Anfrageformular, Adresse Hanau, Öffnungszeiten, Karte-Platzhalter, Social-Buttons.

Jede Route bekommt eigene Head-Metadaten (Titel, Description, OG/Twitter).

## Sprache

DE als Standard, EN umschaltbar über einen Sprach-Toggle im Header. Alle Texte in einer zentralen Übersetzungsdatei (`src/i18n/`), Auswahl in localStorage gespeichert.

## Anfrageformular + Backend

Lovable Cloud wird aktiviert. Formularfelder: Name, E-Mail, Telefon (optional), Motiv-Beschreibung, Körperstelle, ungefähre Größe, Stil, Wunschtermin-Zeitraum, Referenz-Link, Einwilligung Datenschutz.

- Tabelle `tattoo_requests` mit RLS: öffentliche INSERTs erlaubt (Anfragen), Lesen nur für Admin-Rolle.
- Separate `user_roles`-Tabelle + `has_role()`-Funktion für den späteren Admin-Zugriff (kein Admin-UI in diesem Schritt).
- Validierung mit Zod, Erfolg/Fehler über Sonner-Toasts.

## Technische Details

- TanStack Start Routen unter `src/routes/`, Header/Footer im `__root.tsx`.
- Design-Tokens (Farben, Radien, Glow-Schatten) in `src/styles.css` via `@theme inline` — keine hartkodierten Farbklassen in Komponenten.
- Fonts per `<link>` im Root-Head.
- Uploads (Logo, Hero) als `.asset.json`-CDN-Pointer.
- Formular-Submit über `createServerFn` mit Zod-Validierung; Insert serverseitig.
- Galerie-Platzhalter als eigene Komponente, damit Fotos später nur ausgetauscht werden müssen.

## Nicht enthalten

- Echte Tattoo-Fotos (kommen von dir), Online-Zahlung, Kalender-Buchungssystem, Admin-Dashboard.
