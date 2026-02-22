export const CONTENT_TYPES = {
    route: "hk_route",
    hotel: "hk_hotel",
    cs: "hk_cs",
    rental: "hk_rental",
    spots: "hk_spots",
} as const;

export type ContentTypeKey = keyof typeof CONTENT_TYPES;
