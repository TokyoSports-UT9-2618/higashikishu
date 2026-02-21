import "server-only";
import { env } from "./config";

type ContentfulItem = {
  sys?: {
    id?: string;
  };
  fields?: Record<string, unknown>;
};

type ContentfulEntriesResponse = {
  items?: ContentfulItem[];
};

export const getContentfulEntries = async (
  contentType: string,
): Promise<ContentfulItem[]> => {
  if (
    !env.CONTENTFUL_SPACE_ID ||
    !env.CONTENTFUL_ENVIRONMENT ||
    !env.CONTENTFUL_ACCESS_TOKEN
  ) {
    return [];
  }

  const endpoint = new URL(
    `https://cdn.contentful.com/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries`,
  );
  endpoint.searchParams.set("content_type", contentType);

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    // Ensure content is fetched at build time for static export.
    cache: "force-cache",
  }).catch(() => null);

  if (!response || !response.ok) {
    return [];
  }

  const data = (await response.json()) as ContentfulEntriesResponse;
  return Array.isArray(data.items) ? data.items : [];
};
