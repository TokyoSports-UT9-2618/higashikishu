import { createClient } from "contentful-management";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

async function checkContentTypes() {
    if (!SPACE_ID || !MANAGEMENT_TOKEN) {
        console.error("Error: Missing SPACE_ID or MANAGEMENT_TOKEN in .env.local");
        return;
    }

    const client = createClient({ accessToken: MANAGEMENT_TOKEN });

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);
        const contentTypes = await environment.getContentTypes();

        console.log(`\nFound ${contentTypes.items.length} Content Types in space [${SPACE_ID}] environment [${ENVIRONMENT_ID}]:`);
        contentTypes.items.forEach((ct: any) => {
            const isPublished = !!ct.sys.publishedVersion;
            console.log(`- ID: ${ct.sys.id} | Name: ${ct.name} | Status: ${isPublished ? 'Published' : 'Draft'}`);
        });

        const targetTypes = ["hk_route", "hk_spots", "hk_hotel", "hk_cs", "hk_rental", "hk_post"];
        console.log("\nChecking for specific required types:");
        targetTypes.forEach(type => {
            const found: any = contentTypes.items.find(ct => ct.sys.id === type);
            if (found) {
                const isPublished = !!found.sys.publishedVersion;
                console.log(`✅ ${type} exists (${isPublished ? 'Published' : 'Draft'})`);
            } else {
                console.log(`❌ ${type} is MISSING`);
            }
        });

    } catch (e: any) {
        console.error("Error connecting to Contentful Management API:", e.message);
    }
}

checkContentTypes();
