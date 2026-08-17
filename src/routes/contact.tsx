import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Loader2, Mail, MapPin, Music2, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionHeading } from "@/components/site/SectionHeading";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageProvider";
import { STUDIO } from "@/i18n/translations";
import { supabase } from "@/integrations/supabase/client";

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

type Errors = Partial<Record<"name" | "email" | "motif" | "consent", string>>;

function ContactPage() {
  const { t, locale } = useLanguage();
  const [pending, setPending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      motif: String(data.get("motif") ?? "").trim(),
      body_area: String(data.get("body_area") ?? "").trim(),
      size: String(data.get("size") ?? "").trim(),
      style: String(data.get("style") ?? "").trim(),
      preferred_time: String(data.get("preferred_time") ?? "").trim(),
      reference_url: String(data.get("reference_url") ?? "").trim(),
    };

    const nextErrors: Errors = {};
    if (!values.name) nextErrors.name = t.contact.form.required;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      nextErrors.email = t.contact.form.invalidEmail;
    if (values.motif.length < 5) nextErrors.motif = t.contact.form.required;
    if (!consent) nextErrors.consent = t.contact.form.consentRequired;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    const { error } = await supabase.from("tattoo_requests").insert({
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      motif: values.motif,
      body_area: values.body_area || null,
      size: values.size || null,
      style: values.style || null,
      preferred_time: values.preferred_time || null,
      reference_url: values.reference_url || null,
      locale,
    });
    setPending(false);

    if (error) {
      toast.error(t.contact.form.error);
      return;
    }

    toast.success(t.contact.form.success);
    form.reset();
    setConsent(false);
  }

  const fieldClass = "mt-2 bg-card/60 border-border rounded-none";

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading kicker="Booking" title={t.contact.title} text={t.contact.text} />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={handleSubmit} noValidate className="border border-border bg-card/40 p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">{t.contact.form.name}</Label>
              <Input id="name" name="name" className={fieldClass} autoComplete="name" />
              {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">{t.contact.form.email}</Label>
              <Input id="email" name="email" type="email" className={fieldClass} autoComplete="email" />
              {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
            </div>
            <div>
              <Label htmlFor="phone">{t.contact.form.phone}</Label>
              <Input id="phone" name="phone" className={fieldClass} autoComplete="tel" />
            </div>
            <div>
              <Label htmlFor="style">{t.contact.form.style}</Label>
              <select
                id="style"
                name="style"
                defaultValue=""
                className="mt-2 h-9 w-full border border-border bg-card/60 px-3 text-sm text-foreground"
              >
                <option value="">{t.contact.form.stylePlaceholder}</option>
                {t.styles.items.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="body_area">{t.contact.form.bodyArea}</Label>
              <Input id="body_area" name="body_area" className={fieldClass} />
            </div>
            <div>
              <Label htmlFor="size">{t.contact.form.size}</Label>
              <Input id="size" name="size" className={fieldClass} placeholder="ca. 15 x 20 cm" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="motif">{t.contact.form.motif}</Label>
              <Textarea
                id="motif"
                name="motif"
                rows={5}
                className={fieldClass}
                placeholder={t.contact.form.motifPlaceholder}
              />
              {errors.motif ? <p className="mt-1 text-xs text-destructive">{errors.motif}</p> : null}
            </div>
            <div>
              <Label htmlFor="preferred_time">{t.contact.form.preferredTime}</Label>
              <Input
                id="preferred_time"
                name="preferred_time"
                className={fieldClass}
                placeholder={t.contact.form.preferredTimePlaceholder}
              />
            </div>
            <div>
              <Label htmlFor="reference_url">{t.contact.form.reference}</Label>
              <Input id="reference_url" name="reference_url" className={fieldClass} placeholder="https://" />
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(value) => setConsent(value === true)}
              className="mt-0.5 rounded-none"
            />
            <Label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
              {t.contact.form.consent}
            </Label>
          </div>
          {errors.consent ? <p className="mt-1 text-xs text-destructive">{errors.consent}</p> : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-7 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground transition-opacity disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {pending ? t.contact.form.submitting : t.contact.form.submit}
          </button>
        </form>

        <aside className="space-y-8">
          <div className="border border-border bg-card/40 p-6">
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
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${STUDIO.email}`} className="hover:text-foreground">
                  {STUDIO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={`tel:${STUDIO.phone.replace(/\s/g, "")}`} className="hover:text-foreground">
                  {STUDIO.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="border border-border bg-card/40 p-6">
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

          <div className="border border-border bg-card/40 p-6">
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
        </aside>
      </div>
    </div>
  );
}
