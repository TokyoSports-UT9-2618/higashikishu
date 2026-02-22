import "server-only";
import { env } from "./config";

export type ContentfulItem = {
    sys: {
        id: string;
        createdAt: string;
        updatedAt: string;
    };
    fields: Record<string, any>;
};

type ContentfulEntriesResponse = {
    items: ContentfulItem[];
};

export const getContentfulEntries = async (
    contentType: string
): Promise<ContentfulItem[]> => {
    if (
        !env.CONTENTFUL_SPACE_ID ||
        !env.CONTENTFUL_ENVIRONMENT ||
        !env.CONTENTFUL_ACCESS_TOKEN
    ) {
        console.warn("Contentful API credentials are not fully configured.");
        return [];
    }

    const endpoint = new URL(
        `https://cdn.contentful.com/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}/entries`
    );
    endpoint.searchParams.set("content_type", contentType);

    try {
        const response = await fetch(endpoint.toString(), {
            headers: {
                Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
            },
            // Ensure content is fetched at build time for static export.
            cache: "force-cache",
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch Contentful entries: ${response.status} ${response.statusText}`
            );
            return [];
        }

        const data = (await response.json()) as ContentfulEntriesResponse;
        return Array.isArray(data.items) ? data.items : [];
    } catch (error) {
        console.error("Error fetching Contentful entries:", error);
        return [];
    }
};

export const getEntryTitle = (entry: ContentfulItem): string => {
    const fallbackId = entry.sys?.id ?? "item";
    const rawTitle = entry.fields?.title;
    return typeof rawTitle === "string" && rawTitle.trim().length > 0
        ? rawTitle
        : fallbackId;
};

// ヘルパー: 画像URLの抽出
export const getEntryImageUrl = (entry: ContentfulItem): string | null => {
    const imageField = entry.fields?.image as any;
    if (imageField?.fields?.file?.url) {
        const url = imageField.fields.file.url;
        return url.startsWith("//") ? `https:${url}` : url;
    }
    return null;
};
