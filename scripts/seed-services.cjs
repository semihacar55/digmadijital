
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const services = [
    {
        icon: 'BarChart2',
        title: "Meta & Google Ads",
        summary: "Veri odaklı performans yönetimi ile reklam getirilerinizi maksimize edin.",
        slug: "performance-ads",
        sort_order: 1,
        status: 'published'
    },
    {
        icon: 'Search',
        title: "SEO Stratejileri",
        summary: "Teknik ve içerik optimizasyonu ile organik trafikte kalıcı artış sağlayın.",
        slug: "seo",
        sort_order: 2,
        status: 'published'
    },
    {
        icon: 'Share2',
        title: "Sosyal Medya Yönetimi",
        summary: "Marka bilinirliğini artıran, etkileşim odaklı içerik stratejileri.",
        slug: "social-media",
        sort_order: 3,
        status: 'published'
    },
    {
        icon: 'PenTool',
        title: "Kreatif & Tasarım",
        summary: "Dönüşüm odaklı reklam görselleri ve kullanıcı dostu arayüzler.",
        slug: "creative",
        sort_order: 4,
        status: 'published'
    },
    {
        icon: 'TrendingUp',
        title: "CRO & Optimizasyon",
        summary: "Web sitenizin ziyaretçi-müşteri dönüşüm oranlarını bilimsel testlerle artırın.",
        slug: "cro",
        sort_order: 5,
        status: 'published'
    },
    {
        icon: 'PieChart',
        title: "Analytics & Tracking",
        summary: "GA4, GTM ve Pixel kurulumlarıyla her veriyi doğru ölçümleyin.",
        slug: "analytics",
        sort_order: 6,
        status: 'published'
    },
];

(async () => {
    console.log('Seeding services...');

    // Check existing services first to debug
    const { count } = await supabase.from('services').select('*', { count: 'exact', head: true });
    console.log(`Current service count: ${count}`);

    for (const service of services) {
        // Upsert based on slug
        const { data, error } = await supabase
            .from('services')
            .upsert(service, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error inserting ${service.title}:`, error);
        } else {
            console.log(`Upserted ${service.title}`);
        }
    }

    const { count: finalCount } = await supabase.from('services').select('*', { count: 'exact', head: true });
    console.log(`Final service count: ${finalCount}`);

    console.log('Seeding complete.');
})();
