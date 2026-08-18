import { Link } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Errors = Partial<Record<"name" | "email" | "motif" | "consent", string>>;

export function QuickContact() {
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
      motif: String(data.get("motif") ?? "").trim(),
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
      motif: values.motif,
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

  const fieldClass = "mt-2 rounded-none border-border bg-card/60";

  return (
    <section id="termin" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading kicker="Booking" title={t.contact.title} text={t.contact.text} />
          <Link
            to="/contact"
            className="sheen mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label={t.contact.title}
            className="soft-panel border border-border p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="quick-name">{t.contact.form.name}</Label>
                <Input id="quick-name" name="name" className={fieldClass} autoComplete="name" />
                {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
              </div>
              <div>
                <Label htmlFor="quick-email">{t.contact.form.email}</Label>
                <Input
                  id="quick-email"
                  name="email"
                  type="email"
                  className={fieldClass}
                  autoComplete="email"
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="quick-motif">{t.contact.form.motif}</Label>
                <Textarea
                  id="quick-motif"
                  name="motif"
                  rows={4}
                  className={fieldClass}
                  placeholder={t.contact.form.motifPlaceholder}
                />
                {errors.motif ? (
                  <p className="mt-1 text-xs text-destructive">{errors.motif}</p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Checkbox
                id="quick-consent"
                checked={consent}
                onCheckedChange={(value) => setConsent(value === true)}
                className="mt-0.5 rounded-none"
              />
              <Label
                htmlFor="quick-consent"
                className="text-xs leading-relaxed text-muted-foreground"
              >
                {t.contact.form.consent}
              </Label>
            </div>
            {errors.consent ? (
              <p className="mt-1 text-xs text-destructive">{errors.consent}</p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="mt-7 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground transition-opacity disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {pending ? t.contact.form.submitting : t.contact.form.submit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
