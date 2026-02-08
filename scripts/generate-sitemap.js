
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file manually
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const DOMAIN = 'https://digma.com.tr'; // Replace with actual domain

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Error: Supabase credentials not found in .env file.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const staticRoutes = [
    '/',
    '/hizmetler',
    '/blog',
    '/vaka-calismalari',
    '/hakkimizda',
    '/iletisim'
];

async function generateSitemap() {
    console.log('Fetching dynamic routes...');

    // Fetch Blog Posts
    const { data: posts } = await supabase
        .from('posts')
        .select('slug, published_at')
        .eq('status', 'published');

    // Fetch Services
    const { data: services } = await supabase
        .from('services')
        .select('slug');

    // Fetch Case Studies
    const { data: caseStudies } = await supabase
        .from('case_studies')
        .select('slug, published_at')
        .eq('status', 'published');

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add Static Routes
    staticRoutes.forEach(route => {
        sitemap += `  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
`;
    });

    // Add Services
    if (services) {
        services.forEach(service => {
            sitemap += `  <url>
    <loc>${DOMAIN}/hizmetler/${service.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
        });
    }

    // Add Blog Posts
    if (posts) {
        posts.forEach(post => {
            sitemap += `  <url>
    <loc>${DOMAIN}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.published_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });
    }

    // Add Case Studies
    if (caseStudies) {
        caseStudies.forEach(study => {
            sitemap += `  <url>
    <loc>${DOMAIN}/vaka-calismalari/${study.slug}</loc>
    <lastmod>${new Date(study.published_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        });
    }

    sitemap += `</urlset>`;

    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ sitemap.xml generated successfully!');
}

function generateRobots() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;
    const publicDir = path.resolve(__dirname, '../public');
    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
    console.log('✅ robots.txt generated successfully!');
}

await generateSitemap();
generateRobots();
