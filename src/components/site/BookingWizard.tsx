import { CalendarClock, Check, ImageIcon, Loader2, MapPin } from "lucide-react";
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

const STEP_ICONS = [CalendarClock, ImageIcon, MapPin];

type Errors = Record<string, string>;

export function BookingWizard() {
  const { t, locale } = useLanguage();
  const b = t.booking;

  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const [days, setDays] = useState<string[]>([]);
  const [timeOfDay, setTimeOfDay] = useState(b.timeOfDay[3] ?? "");
  const [timeframe, setTimeframe] = useState("");
  const [idea, setIdea] = useState("");
  const [reference, setReference] = useState("");
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const fieldClass = "mt-2 rounded-none border-border bg-card/60";

  function toggleDay(day: string) {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  }

  function validate(current: number): Errors {
    const next: Errors = {};
    if (current === 0 && days.length === 0) next['days'] = b.daysRequired;
    if (current === 1 && idea.trim().length < 5) next['idea'] = t.contact.form.required;
    if (current === 2) {
      if (!placement.trim()) next['placement'] = t.contact.form.required;
      if (!name.trim()) next['name'] = t.contact.form.required;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next['email'] = t.contact.form.invalidEmail;
      if (!consent) next['consent'] = t.contact.form.consentRequired;
    }
    return next;
  }

  function goNext() {
    const next = validate(step);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStep((s) => Math.min(s + 1, 2));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) {
      goNext();
      return;
    }
    const next = validate(2);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setPending(true);
    const { error } = await supabase.from("tattoo_requests").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      motif: idea.trim(),
      body_area: placement.trim(),
      size: size.trim() || null,
      style: style || null,
      preferred_time: [days.join(", "), timeOfDay, timeframe.trim()].filter(Boolean).join(" · "),
      reference_url: reference.trim() || null,
      locale,
    });
    setPending(false);

    if (error) {
      toast.error(t.contact.form.error);
      return;
    }
    toast.success(t.contact.form.success);
    setDone(true);
  }

  function reset() {
    setDone(false);
    setStep(0);
    setDays([]);
    setTimeframe("");
    setIdea("");
    setReference("");
    setStyle("");
    setSize("");
    setPlacement("");
    setName("");
    setEmail("");
    setPhone("");
    setConsent(false);
    setErrors({});
  }

  return (
    <section id="termin" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-20 sm:py-28">
      <Reveal>
        <SectionHeading kicker={b.kicker} title={b.title} text={b.text} />
      </Reveal>

      <Reveal delay={100}>
        <div className="soft-panel mt-12 border border-border p-6 sm:p-10">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl">{b.successTitle}</h3>
              <p className="max-w-sm text-sm text-muted-foreground">{b.successText}</p>
              <button
                type="button"
                onClick={reset}
                className="mt-2 border border-border px-5 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {b.newRequest}
              </button>
            </div>
          ) : (
            <>
              <ol className="grid gap-4 sm:grid-cols-3">
                {b.steps.map((entry, index) => {
                  const Icon = STEP_ICONS[index] ?? CalendarClock;
                  const active = index === step;
                  const complete = index < step;
                  return (
                    <li
                      key={entry.title}
                      className={`flex items-start gap-3 border p-4 transition-colors ${
                        active
                          ? "border-primary bg-primary/5"
                          : complete
                            ? "border-primary/40"
                            : "border-border opacity-70"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
                          active || complete
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {complete ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </span>
                      <span>
                        <span className="font-display text-[0.7rem] uppercase tracking-[0.2em] text-primary">
                          {index + 1}. {entry.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {entry.hint}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ol>

              <form onSubmit={handleSubmit} noValidate className="mt-10">
                <p className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {b.stepLabel} {step + 1} {b.of} 3
                </p>

                {step === 0 ? (
                  <div className="mt-5 space-y-6">
                    <div>
                      <Label>{b.daysLabel}</Label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {b.days.map((day) => {
                          const selected = days.includes(day);
                          return (
                            <button
                              key={day}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleDay(day)}
                              className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                      {errors['days'] ? (
                        <p className="mt-2 text-xs text-destructive">{errors['days']}</p>
                      ) : null}
                    </div>

                    <div>
                      <Label>{b.timeOfDayLabel}</Label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {b.timeOfDay.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            aria-pressed={timeOfDay === slot}
                            onClick={() => setTimeOfDay(slot)}
                            className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors ${
                              timeOfDay === slot
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:max-w-sm">
                      <Label htmlFor="booking-timeframe">{b.timeframeLabel}</Label>
                      <Input
                        id="booking-timeframe"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className={fieldClass}
                        placeholder={b.timeframePlaceholder}
                      />
                    </div>
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="booking-idea">{b.ideaLabel}</Label>
                      <Textarea
                        id="booking-idea"
                        rows={5}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        className={fieldClass}
                        placeholder={b.ideaPlaceholder}
                      />
                      {errors['idea'] ? (
                        <p className="mt-1 text-xs text-destructive">{errors['idea']}</p>
                      ) : null}
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="booking-reference">{b.referenceLabel}</Label>
                      <Input
                        id="booking-reference"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className={fieldClass}
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <Label htmlFor="booking-style">{b.styleLabel}</Label>
                      <select
                        id="booking-style"
                        value={style}
                        onChange={(e) => setStyle(e.target.value)}
                        className="mt-2 h-9 w-full border border-border bg-card/60 px-3 text-sm text-foreground"
                      >
                        <option value="">{b.stylePlaceholder}</option>
                        {t.styles.items.map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="booking-size">{b.sizeLabel}</Label>
                      <Input
                        id="booking-size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className={fieldClass}
                        placeholder={b.sizePlaceholder}
                      />
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="mt-5 space-y-6">
                    <div>
                      <Label htmlFor="booking-placement">{b.placementLabel}</Label>
                      <Input
                        id="booking-placement"
                        value={placement}
                        onChange={(e) => setPlacement(e.target.value)}
                        className={fieldClass}
                        placeholder={b.placementPlaceholder}
                      />
                      {errors['placement'] ? (
                        <p className="mt-1 text-xs text-destructive">{errors['placement']}</p>
                      ) : null}
                      <p className="mt-2 text-xs text-muted-foreground">{b.placementHint}</p>
                    </div>

                    <div>
                      <h3 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-primary">
                        {b.contactTitle}
                      </h3>
                      <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="booking-name">{t.contact.form.name}</Label>
                          <Input
                            id="booking-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={fieldClass}
                            autoComplete="name"
                          />
                          {errors['name'] ? (
                            <p className="mt-1 text-xs text-destructive">{errors['name']}</p>
                          ) : null}
                        </div>
                        <div>
                          <Label htmlFor="booking-email">{t.contact.form.email}</Label>
                          <Input
                            id="booking-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={fieldClass}
                            autoComplete="email"
                          />
                          {errors['email'] ? (
                            <p className="mt-1 text-xs text-destructive">{errors['email']}</p>
                          ) : null}
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="booking-phone">{t.contact.form.phone}</Label>
                          <Input
                            id="booking-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={fieldClass}
                            autoComplete="tel"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="booking-consent"
                        checked={consent}
                        onCheckedChange={(value) => setConsent(value === true)}
                        className="mt-0.5 rounded-none"
                      />
                      <Label
                        htmlFor="booking-consent"
                        className="text-xs leading-relaxed text-muted-foreground"
                      >
                        {t.contact.form.consent}
                      </Label>
                    </div>
                    {errors['consent'] ? (
                      <p className="text-xs text-destructive">{errors['consent']}</p>
                    ) : null}

                    <p className="text-xs text-muted-foreground">{b.confirmationNote}</p>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(s - 1, 0))}
                      className="border border-border px-5 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {b.back}
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    disabled={pending}
                    className="sheen inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {step < 2 ? b.next : pending ? t.contact.form.submitting : t.contact.form.submit}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
