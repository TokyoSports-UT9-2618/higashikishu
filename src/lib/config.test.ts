import { describe, expect, it } from "vitest";
import { parseEnv } from "./config-schema";

const REQUIRED_ENV = {
  CONTENTFUL_SPACE_ID: "space-id",
  CONTENTFUL_ENVIRONMENT: "master",
  CONTENTFUL_ACCESS_TOKEN: "access-token",
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
});
