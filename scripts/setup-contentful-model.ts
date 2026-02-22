import pkg from "contentful-management";
const { createClient } = pkg;

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

const CONTENT_TYPES = [
    { id: "hk_route", name: "Route" },
    { id: "hk_spots", name: "Spots" },
    { id: "hk_hotel", name: "Hotel" },
    { id: "hk_cs", name: "CS" },
    { id: "hk_rental", name: "Rental" },
    { id: "hk_post", name: "Post" },
];

async function setup() {
    if (!SPACE_ID || !MANAGEMENT_TOKEN) {
        console.error("Error: Missing SPACE_ID or MANAGEMENT_TOKEN in .env.local");
        return;
    }

    const client = createClient({ accessToken: MANAGEMENT_TOKEN });

    try {
        const space = await client.getSpace(SPACE_ID);
        const environment = await space.getEnvironment(ENVIRONMENT_ID);

        console.log(`Setting up Content Types in space: ${SPACE_ID}, env: ${ENVIRONMENT_ID}`);

        for (const ct of CONTENT_TYPES) {
            console.log(`Processing: ${ct.name} (${ct.id})...`);

            let contentType;
            try {
                contentType = await environment.getContentType(ct.id);
                console.log(`  -> ${ct.id} already exists.`);
            } catch (e) {
                console.log(`  -> Creating ${ct.id}...`);
                contentType = await environment.createContentTypeWithId(ct.id, {
                    name: ct.name,
                    fields: [
                        {
                            id: "title",
                            name: "Title",
                            type: "Symbol",
                            required: true,
                            localized: false,
                        },
                        {
                            id: "description",
                            name: "Description",
                            type: "Text",
                            required: false,
                            localized: false,
                        },
                        {
                            id: "image",
                            name: "Image",
                            type: "Link",
                            linkType: "Asset",
                            required: false,
                            localized: false,
                        }
                    ]
                });
            }

            if (contentType.sys.publishedVersion === undefined) {
                console.log(`  -> Publishing ${ct.id}...`);
                await contentType.publish();
            }
        }

        console.log("\nSetup complete! All required Content Types are ready.");

    } catch (e: any) {
        console.error("Error setting up Contentful model:", e.message);
    }
}

setup();
