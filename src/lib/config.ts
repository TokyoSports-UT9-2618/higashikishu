import { z } from "zod";

/**
 * Cloudflare Pages デプロイで必須となる環境変数のみをチェックします。
 * 不要な変数を必須にするとビルドエラーになるため、最小限に留めています。
 */
const envSchema = z.object({
    CONTENTFUL_SPACE_ID: z.string().min(1, "CONTENTFUL_SPACE_ID is required"),
    CONTENTFUL_ENVIRONMENT: z.string().min(1, "CONTENTFUL_ENVIRONMENT is required"),
    CONTENTFUL_ACCESS_TOKEN: z.string().min(1, "CONTENTFUL_ACCESS_TOKEN is required"),
});

// バリデーション実行
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.warn("⚠️  Contentful environment variables missing. API calls will return empty data.");
}

export const env = _env.success ? _env.data : {
    CONTENTFUL_SPACE_ID: "",
    CONTENTFUL_ENVIRONMENT: "",
    CONTENTFUL_ACCESS_TOKEN: "",
};
