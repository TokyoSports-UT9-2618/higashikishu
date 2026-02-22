import * as cheerio from "cheerio";
import fs from "fs";

async function scrapePage(type: string, url: string) {
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    
    const items: any[] = [];
    
    // Attempt 1: price-list-item (Routes and maybe others)
    $('.elementor-price-list-item').each((i, el) => {
        const href = $(el).attr('href');
        const img = $(el).find('img').attr('src');
        let title = $(el).find('.elementor-price-list-title').text().trim();
        if (!title) title = $(el).find('img').attr('alt') || '';
        const subtitle = $(el).find('.elementor-price-list-price').text().trim();
        const desc = $(el).find('.elementor-price-list-description').text().trim();
        
        items.push({
            type,
            title,
            url: href,
            image: img,
            description: (subtitle ? subtitle + "\n" : "") + desc,
        });
    });

    // Attempt 2: elementor-post (Sometimes used for posts)
    if (items.length === 0) {
        $('.elementor-post').each((i, el) => {
            const href = $(el).find('a').attr('href') || $(el).find('.elementor-post__read-more').attr('href');
            const img = $(el).find('img').attr('src');
            const title = $(el).find('.elementor-post__title').text().trim();
            const desc = $(el).find('.elementor-post__excerpt').text().trim() || $(el).find('.elementor-post__text').text().trim();
            const date = $(el).find('.elementor-post-date').text().trim();
            
            items.push({
                type,
                title,
                url: href,
                image: img,
                date,
                description: desc,
            });
        });
    }

    // Attempt 3: elementor-image-box or flip-box
    if (items.length === 0) {
        $('.elementor-image-box-wrapper, .elementor-flip-box').each((i, el) => {
            const title = $(el).find('.elementor-image-box-title, .elementor-flip-box__layer__title').text().trim();
            const desc = $(el).find('.elementor-image-box-description, .elementor-flip-box__layer__description').text().trim();
            const img = $(el).find('img').attr('src');
            const href = $(el).find('a').attr('href');
            if (title) {
                items.push({ type, title, image: img, url: href, description: desc });
            }
        });
    }

    console.log(`-> Found ${items.length} items for ${type}`);
    return items;
}

async function main() {
    const data: Record<string, any[]> = {};
    data.route = await scrapePage("route", "https://higashikishucycling.com/route/");
    data.spots = await scrapePage("spots", "https://higashikishucycling.com/spots/");
    data.hotel = await scrapePage("hotel", "https://higashikishucycling.com/hotel/");
    data.cs = await scrapePage("cs", "https://higashikishucycling.com/cs/");
    data.rental = await scrapePage("rental", "https://higashikishucycling.com/rental/");
    data.post = await scrapePage("post", "https://higashikishucycling.com/post/");

    fs.mkdirSync("src/data", { recursive: true });
    fs.writeFileSync("src/data/scraped.json", JSON.stringify(data, null, 2));
    console.log("Saved to src/data/scraped.json");
}

main().catch(console.error);
