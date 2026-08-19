import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const listSchema = z.object({
  status: z.enum(["all", "new", "in_progress", "booked", "declined"]).default("all"),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "in_progress", "booked", "declined"]),
});

export const listTattooRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => listSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) return { isAdmin: false as const, requests: [] };

    let query = context.supabase
      .from("tattoo_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (data.status !== "all") query = query.eq("status", data.status);

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);

    const requests = await Promise.all(
      (rows ?? []).map(async (row) => {
        let photoUrl: string | null = null;
        const ref = row.reference_url ?? "";
        const match = ref.split(" · ").find((part) => part.startsWith("tattoo-references/"));
        if (match) {
          const path = match.replace("tattoo-references/", "");
          const { data: signed } = await context.supabase.storage
            .from("tattoo-references")
            .createSignedUrl(path, 60 * 30);
          photoUrl = signed?.signedUrl ?? null;
        }
        const link = ref.split(" · ").find((part) => part.startsWith("http")) ?? null;
        return { ...row, photoUrl, referenceLink: link };
      }),
    );

    return { isAdmin: true as const, requests };
  });

export const updateRequestStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error(roleError.message);
    if (!isAdmin) throw new Error("Not allowed");

    const { error } = await context.supabase
      .from("tattoo_requests")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
