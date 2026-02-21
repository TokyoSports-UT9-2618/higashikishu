import { describe, expect, it } from "vitest";
import { parseEnv } from "./config-schema";

const CONTENTFUL_ENV = {
  CONTENTFUL_SPACE_ID: "space-id",
  CONTENTFUL_ENVIRONMENT: "master",
  CONTENTFUL_ACCESS_TOKEN: "access-token",
} as const;

describe("env config validation", () => {
  it("accepts empty input for static build safety", () => {
    const parsed = parseEnv({});
    expect(parsed.CONTENTFUL_SPACE_ID).toBeUndefined();
  });

  it("returns typed env values when contentful env exist", () => {
    const parsed = parseEnv({ ...CONTENTFUL_ENV });

    expect(parsed.CONTENTFUL_SPACE_ID).toBe("space-id");
    expect(parsed.CONTENTFUL_ENVIRONMENT).toBe("master");
  });

  it("supports legacy CONTENTFUL_ENV and CONTENTFUL_CDA_TOKEN aliases", () => {
    const parsed = parseEnv({
      CONTENTFUL_SPACE_ID: "space-id",
      CONTENTFUL_ENV: "master",
      CONTENTFUL_CDA_TOKEN: "legacy-cda-token",
    });

    expect(parsed.CONTENTFUL_ENVIRONMENT).toBe("master");
    expect(parsed.CONTENTFUL_ACCESS_TOKEN).toBe("legacy-cda-token");
  });

  it("throws when optional email is invalid", () => {
    expect(() =>
      parseEnv({
        CONTACT_TO_EMAIL: "not-an-email",
      }),
    ).toThrow(/CONTACT_TO_EMAIL/);
  });
});
