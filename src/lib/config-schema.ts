import { z } from "zod";

const envSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1, "CONTENTFUL_SPACE_ID is required"),
  CONTENTFUL_ENV: z.string().min(1, "CONTENTFUL_ENV is required"),
  CONTENTFUL_CDA_TOKEN: z.string().min(1, "CONTENTFUL_CDA_TOKEN is required"),
  CONTENTFUL_CPA_TOKEN: z.string().min(1, "CONTENTFUL_CPA_TOKEN is required"),
  EDIT_MODE_SECRET_KEY: z.string().min(1, "EDIT_MODE_SECRET_KEY is required"),
  CONTACT_TO_EMAIL: z.string().email("CONTACT_TO_EMAIL must be a valid email address"),
  NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT: z
    .string()
    .min(1, "NEXT_PUBLIC_CONTACT_WORKER_ENDPOINT is required"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_TURNSTILE_SITE_KEY is required"),
  NEXT_PUBLIC_GA4_MEASUREMENT_ID: z
    .string()
    .min(1, "NEXT_PUBLIC_GA4_MEASUREMENT_ID is required"),
});

export type AppEnv = z.infer<typeof envSchema>;

export const parseEnv = (input: Record<string, string | undefined>): AppEnv => {
  const parsedEnv = envSchema.safeParse(input);

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
