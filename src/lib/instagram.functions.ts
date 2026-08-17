import { createServerFn } from "@tanstack/react-start";

export type InstagramPost = {
  id: string;
  url: string;
  permalink: string;
  caption: string;
  timestamp: string;
};

type FeedResult = {
  items: InstagramPost[];
  live: boolean;
  error: string | null;
};

const GRAPH_VERSION = "v21.0";
const CACHE_TTL_MS = 10 * 60 * 1000;

const cache: { at: number; value: FeedResult | null } = { at: 0, value: null };

type MediaNode = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

function mapMedia(nodes: MediaNode[]): InstagramPost[] {
  return nodes
    .filter((node) => node.media_type !== "VIDEO" || Boolean(node.thumbnail_url))
    .map((node) => ({
      id: node.id,
      url: node.media_type === "VIDEO" ? (node.thumbnail_url ?? "") : (node.media_url ?? ""),
      permalink: node.permalink ?? "https://www.instagram.com/ptah_tattoos",
      caption: (node.caption ?? "").split("\n")[0]?.slice(0, 140) ?? "",
      timestamp: node.timestamp ?? "",
    }))
    .filter((post) => post.url.length > 0);
}

async function getJson(url: string) {
  const response = await fetch(url);
  const json = (await response.json()) as Record<string, unknown>;
  if (!response.ok) {
    const error = json?.["error"] as { message?: string } | undefined;
    throw new Error(error?.message ?? `Instagram API error ${response.status}`);
  }
  return json;
}

async function fetchMedia(host: string, userId: string, token: string, limit: number) {
  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const json = await getJson(
    `https://${host}/${GRAPH_VERSION}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${encodeURIComponent(token)}`,
  );
  return mapMedia((json["data"] as MediaNode[] | undefined) ?? []);
}

async function resolveBusinessAccountId(token: string) {
  const json = await getJson(
    `https://graph.facebook.com/${GRAPH_VERSION}/me/accounts?fields=instagram_business_account{id,username}&access_token=${encodeURIComponent(token)}`,
  );
  const pages = (json["data"] as Array<{ instagram_business_account?: { id?: string } }>) ?? [];
  for (const page of pages) {
    if (page.instagram_business_account?.id) return page.instagram_business_account.id;
  }
  throw new Error(
    "Kein Instagram-Business-Account mit der verbundenen Facebook-Seite gefunden.",
  );
}

export const getInstagramFeed = createServerFn({ method: "GET" }).handler(
  async (): Promise<FeedResult> => {
    const now = Date.now();
    if (cache.value && now - cache.at < CACHE_TTL_MS) return cache.value;

    const token = process.env["INSTAGRAM_ACCESS_TOKEN"];
    if (!token) {
      return { items: [], live: false, error: "missing_token" };
    }

    const limit = 12;
    let result: FeedResult;

    try {
      // Instagram Login (graph.instagram.com) tokens: /me/media works directly.
      const items = await fetchMedia("graph.instagram.com", "me", token, limit);
      result = { items, live: true, error: null };
    } catch {
      try {
        // Facebook Login token: resolve the linked IG business account first.
        const userId =
          process.env["INSTAGRAM_USER_ID"] ?? (await resolveBusinessAccountId(token));
        const items = await fetchMedia("graph.facebook.com", userId, token, limit);
        result = { items, live: true, error: null };
      } catch (error) {
        console.error("Instagram feed error", error);
        return {
          items: [],
          live: false,
          error: error instanceof Error ? error.message : "unknown_error",
        };
      }
    }

    cache.at = now;
    cache.value = result;
    return result;
  },
);
