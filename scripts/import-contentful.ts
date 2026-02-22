import pkg from 'contentful-management';
const { createClient } = pkg;

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error("エラー: .env.localにCONTENTFUL_SPACE_IDとCONTENTFUL_MANAGEMENT_TOKENを設定してください。");
    process.exit(1);
}

const client = createClient({ accessToken: MANAGEMENT_TOKEN });

const CONTENT_TYPE_MAP: Record<string, string> = {
    route: "hk_route",
    spots: "hk_spots",
    hotel: "hk_hotel",
    cs: "hk_cs",
    rental: "hk_rental",
    post: "hk_post", // お知らせ用
};

async function main() {
    const dataPath = path.join(process.cwd(), "src/data/scraped.json");
    const data: Record<string, any[]> = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const space = await client.getSpace(SPACE_ID!);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);

    // デフォルトロケール（言語）を取得
    const locales = await environment.getLocales();
    const defaultLocale = locales.items.find((l) => l.default)?.code || "ja-JP";

    console.log(`Default Locale: ${defaultLocale}`);

    for (const [typeKey, items] of Object.entries(data)) {
        const contentTypeId = CONTENT_TYPE_MAP[typeKey];
        if (!contentTypeId) continue;

        console.log(`\nImporting ${items.length} items for ${contentTypeId}...`);

        for (const item of items as any[]) {
            console.log(`- ${item.title}`);

            let assetId = null;
            if (item.image && item.image !== "#" && item.image.startsWith("http")) {
                try {
                    const uploadUrl = item.image.startsWith("//") ? `https:${item.image}` : item.image;

                    let extension = "jpg";
                    if (uploadUrl.includes(".png")) extension = "png";

                    const asset = await environment.createAsset({
                        fields: {
                            title: { [defaultLocale]: `${item.title} - Image` },
                            file: {
                                [defaultLocale]: {
                                    contentType: extension === "png" ? "image/png" : "image/jpeg",
                                    fileName: `image_${Date.now()}.${extension}`,
                                    upload: uploadUrl
                                }
                            }
                        }
                    });
                    const processedAsset = await asset.processForAllLocales();
                    const publishedAsset = await processedAsset.publish();
                    assetId = publishedAsset.sys.id;
                } catch (e: any) {
                    console.error(`  -> Failed to upload image for ${item.title}:`, e.message);
                }
            }

            const fields: any = {
                title: { [defaultLocale]: item.title },
            };

            if (item.description) {
                fields.description = { [defaultLocale]: item.description };
            }

            if (assetId) {
                fields.image = {
                    [defaultLocale]: {
                        sys: {
                            type: "Link",
                            linkType: "Asset",
                            id: assetId
                        }
                    }
                };
            }

            try {
                const entry = await environment.createEntry(contentTypeId, { fields });
                await entry.publish();
                console.log(`  -> Published entry: ${entry.sys.id}`);
            } catch (e: any) {
                console.error(`  -> Failed to create entry for ${item.title}:`, e.message);
            }
        }
    }

    console.log("\n完了しました！");
    // Deploy Hook 呼び出し (環境変数が設定されていれば実行)
    const deployHook = process.env.CLOUDFLARE_DEPLOY_HOOK;
    if (deployHook) {
        try {
            // Node 18+ ではグローバル fetch が利用可能
            await fetch(deployHook, { method: "POST" });
            console.log("✅ Cloudflare Deploy Hook を呼び出しました");
        } catch (e: any) {
            console.error("⚠️ Deploy Hook の呼び出しに失敗しました:", e.message);
        }
    }
}

main().catch(console.error);
