import { z } from "zod";

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }
  return value;
};

const optionalString = z.preprocess(emptyToUndefined, z.string().min(1).optional());
const optionalEmail = z.preprocess(emptyToUndefined, z.string().email().optional());

const envSchema = z.object({
  CONTENTFUL_SPACE_ID: optionalString,
  CONTENTFUL_ENVIRONMENT: optionalString,
  CONTENTFUL_ACCESS_TOKEN: optionalString,
  CONTENTFUL_CPA_TOKEN: optionalString,
  EDIT_MODE_SECRET_KEY: optionalString,
  CONTACT_TO_EMAIL: optionalEmail,
  NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT: optionalString,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalString,
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: optionalString,
});

export type AppEnv = z.infer<typeof envSchema>;

export const parseEnv = (input: Record<string, string | undefined>): AppEnv => {
  const normalizedInput = {
    ...input,
    CONTENTFUL_ENVIRONMENT: input.CONTENTFUL_ENVIRONMENT ?? input.CONTENTFUL_ENV,
    CONTENTFUL_ACCESS_TOKEN:
      input.CONTENTFUL_ACCESS_TOKEN ?? input.CONTENTFUL_CDA_TOKEN,
  };

  const parsedEnv = envSchema.safeParse(normalizedInput);

  if (!parsedEnv.success) {
    const formattedIssues = parsedEnv.error.issues.map((issue) => {
      const key = issue.path.join(".");
      return `- ${key}: ${issue.message}`;
    });

    throw new Error(
      [
        "Invalid environment variables. Application startup aborted.",
        ...formattedIssues,
      ].join("\n"),
    );
  }

  return parsedEnv.data;
};
