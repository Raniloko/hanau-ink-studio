import { createFileRoute } from "@tanstack/react-router";

import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Preise, Pflege & FAQ — PTAH Tattoo Hanau" },
      {
        name: "description",
        content:
          "Preise, Ablauf, Pflegehinweise und häufige Fragen zum Tattoo-Termin im PTAH Studio in Hanau.",
      },
      { property: "og:title", content: "Preise, Pflege & FAQ — PTAH Tattoo Hanau" },
      {
        property: "og:description",
        content: "Alles zu Preisen, Ablauf und Tattoo-Pflege im PTAH Studio Hanau.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/info" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/info" }],
  }),
  component: InfoPage,
});

function InfoPage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading kicker="Info" title={t.info.title} text={t.info.text} />

      <section className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border border-border bg-card/40 p-7">
          <h2 className="font-display text-sm uppercase tracking-[0.25em] text-primary">
            {t.info.pricing.title}
          </h2>
          <dl className="mt-6 divide-y divide-border">
            {t.info.pricing.items.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between py-3">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="font-display text-sm uppercase tracking-[0.15em]">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{t.info.pricing.note}</p>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2">
          {t.info.pricing.steps.map((step) => (
            <div key={step.title} className="bg-background p-6">
              <h3 className="font-display text-[0.7rem] uppercase tracking-[0.25em] text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border border-border bg-card/40 p-7">
        <h2 className="font-display text-sm uppercase tracking-[0.25em] text-primary">
          {t.info.aftercare.title}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {t.info.aftercare.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
          {t.info.faq.title}
        </h2>
        <Accordion type="single" collapsible className="mt-6">
          {t.info.faq.items.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="text-left font-display text-sm uppercase tracking-[0.12em] hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
