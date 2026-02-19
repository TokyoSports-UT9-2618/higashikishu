import { describe, expect, it } from "vitest";
import { parseEnv } from "./config-schema";

const REQUIRED_ENV = {
  CONTENTFUL_SPACE_ID: "space-id",
  CONTENTFUL_ENV: "master",
  CONTENTFUL_CDA_TOKEN: "cda-token",
  CONTENTFUL_CPA_TOKEN: "cpa-token",
  EDIT_MODE_SECRET_KEY: "edit-secret",
  CONTACT_TO_EMAIL: "contact@example.com",
  NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT: "https://example.com/contact",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "turnstile-site-key",
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: "G-TEST123456",
} as const;

describe("env config validation", () => {
  it("throws a clear error when required env is missing", () => {
    const broken = {
      ...REQUIRED_ENV,
      CONTENTFUL_SPACE_ID: "",
    };

    expect(() => parseEnv(broken)).toThrow(/CONTENTFUL_SPACE_ID/);
  });

  it("returns typed env values when all required env exist", () => {
    const parsed = parseEnv({ ...REQUIRED_ENV });

    expect(parsed.CONTENTFUL_SPACE_ID).toBe("space-id");
    expect(parsed.NEXT_PUBLIC_GA4_MEASUREMENT_ID).toBe("G-TEST123456");
  });
});
