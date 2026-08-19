import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";

import { listTattooRequests, updateRequestStatus } from "@/lib/admin.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type StatusFilter = "all" | "new" | "in_progress" | "booked" | "declined";

const STATUS_LABEL: Record<string, string> = {
  new: "Neu",
  in_progress: "In Bearbeitung",
  booked: "Terminiert",
  declined: "Abgelehnt",
};

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "new", label: "Neu" },
  { value: "in_progress", label: "In Bearbeitung" },
  { value: "booked", label: "Terminiert" },
  { value: "declined", label: "Abgelehnt" },
];

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Anfragen-Übersicht — PTAH Tattoo Hanau" },
      { name: "description", content: "Interne Übersicht aller Termin-Anfragen im PTAH Studio." },
      { property: "og:title", content: "Anfragen-Übersicht — PTAH Tattoo" },
      { property: "og:description", content: "Interne Übersicht aller Termin-Anfragen." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
  errorComponent: ({ error }) => (
    <div className="bg-ink px-6 py-24 text-center text-on-dark" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => <div className="bg-ink px-6 py-24 text-center text-on-dark">—</div>,
});

function AdminPage() {
  const [status, setStatus] = useState<StatusFilter>("all");
  const list = useServerFn(listTattooRequests);
  const update = useServerFn(updateRequestStatus);
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["admin-requests", status],
    queryFn: () => list({ data: { status } }),
  });

  const mutation = useMutation({
    mutationFn: (vars: { id: string; status: Exclude<StatusFilter, "all"> }) =>
      update({ data: vars }),
    onSuccess: () => {
      toast.success("Status aktualisiert");
      queryClient.invalidateQueries({ queryKey: ["admin-requests"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const requests = data?.requests ?? [];

  return (
    <div className="min-h-screen bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-[0.65rem] uppercase tracking-[0.4em] text-primary">
              Intern
            </p>
            <h1 className="mt-3 font-display text-3xl uppercase tracking-tight text-on-dark sm:text-4xl">
              Termin-Anfragen
            </h1>
            <p className="mt-2 text-sm text-on-dark-muted">
              {isPending ? "Lade …" : `${requests.length} Anfrage(n)`}
            </p>
          </div>
          <Button
            variant="outline"
            className="border-white/15 bg-white/5 text-on-dark hover:bg-white/10"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/auth";
            }}
          >
            Abmelden
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                status === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-white/15 bg-white/5 text-on-dark-muted hover:text-on-dark"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {data && !data.isAdmin ? (
          <p className="mt-12 rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-on-dark-muted">
            Dein Konto hat keine Admin-Rechte. Sag Bescheid, dann schalte ich es frei.
          </p>
        ) : null}

        <div className="mt-8 grid gap-4">
          {requests.map((r) => (
            <article
              key={r.id}
              className="grid gap-6 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[160px_1fr]"
            >
              <div className="overflow-hidden rounded-md border border-white/10 bg-white/5">
                {r.photoUrl ? (
                  <img
                    src={r.photoUrl}
                    alt={`Referenzfoto der Anfrage von ${r.name}`}
                    loading="lazy"
                    className="h-40 w-full object-cover sm:h-full"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center text-[0.6rem] uppercase tracking-[0.25em] text-on-dark-muted sm:h-full">
                    Kein Foto
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-lg uppercase tracking-tight text-on-dark">
                    {r.name}
                  </h2>
                  <span className="rounded-full border border-primary/40 bg-primary/15 px-3 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-primary">
                    {STATUS_LABEL[r.status] ?? r.status}
                  </span>
                  <span className="text-xs text-on-dark-muted">
                    {new Date(r.created_at).toLocaleString("de-DE")}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-on-dark-muted">{r.motif}</p>

                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-on-dark-muted sm:grid-cols-3">
                  <Field label="E-Mail" value={r.email} />
                  <Field label="Telefon" value={r.phone} />
                  <Field label="Stelle" value={r.body_area} />
                  <Field label="Größe" value={r.size} />
                  <Field label="Stil" value={r.style} />
                  <Field label="Wunschzeit" value={r.preferred_time} />
                </dl>

                {r.referenceLink ? (
                  <a
                    href={r.referenceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-primary hover:underline"
                  >
                    Referenz-Link
                  </a>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {(["new", "in_progress", "booked", "declined"] as const).map((s) => (
                    <button
                      key={s}
                      disabled={mutation.isPending || r.status === s}
                      onClick={() => mutation.mutate({ id: r.id, status: s })}
                      className={`rounded-md border px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] transition-colors disabled:opacity-40 ${
                        r.status === s
                          ? "border-primary/50 bg-primary/20 text-primary"
                          : "border-white/15 bg-white/5 text-on-dark-muted hover:text-on-dark"
                      }`}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {!isPending && data?.isAdmin && requests.length === 0 ? (
            <p className="rounded-lg border border-white/10 bg-white/5 p-6 text-sm text-on-dark-muted">
              Keine Anfragen in diesem Status.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[0.6rem] uppercase tracking-[0.25em] text-on-dark-muted/70">{label}</dt>
      <dd className="mt-0.5 text-on-dark">{value}</dd>
    </div>
  );
}
