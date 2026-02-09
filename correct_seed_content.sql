-- 1. CLEANUP: Case Studies
DELETE FROM case_studies;

-- 2. SEED: Case Studies
-- NOTE: We use 'problem' and 'solution' columns.
-- 'process_steps' and 'results' are JSONB. 'services' might be TEXT array or JSONB, let's cast as JSONB to be safe, or just TEXT array.
-- But wait, error said `column "content" ... does not exist` earlier.
-- Then said `column "process_steps" is of type jsonb but expression is of type text[]`.
-- So 'process_steps' MUST be JSONB.

INSERT INTO case_studies (
    id, 
    title, 
    slug, 
    excerpt, 
    problem, 
    solution, 
    cover_image, 
    client_name, 
    sector, 
    services, 
    results, 
    process_steps, 
    status, 
    is_featured, 
    featured_order, 
    created_at
)
VALUES
(
    uuid_generate_v4(),
    'Shopify Mağaza Kurulumu',
    'shopify-magaza-kurulumu',
    'Global pazara açılan bir lüks giyim markası için yüksek dönüşümlü Shopify altyapısı.',
    '## Zorluklar\nMarkanın global satışlarını artırmak için hızlı, güvenilir ve çoklu para birimi destekleyen bir altyapıya ihtiyacı vardı. Mevcut sistemleri yavaş çalışıyordu.',
    '## Çözüm\nShopify Plus altyapısına geçiş yaparak özel bir tema geliştirdik.\n- **UI/UX Tasarım**: Kullanıcı deneyimini odağa alan modern arayüz.\n- **Ödeme Sistemleri**: Global ödeme yöntemleri entegrasyonu.',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop',
    'Luxe Mode',
    'E-Ticaret / Moda',
    -- If 'services' is text[], keeping as array might be safer if unsure. But if it errors, we can change.
    -- Assuming `services` is TEXT[] based on typical usage, but just in case, casting to text array explicitly. 
    -- Or if it is JSONB, casting to JSONB would be safer? No, error only mentioned process_steps so services passed.
    ARRAY['Shopify', 'UI/UX Tasarım', 'Ödeme Sistemleri'], 
    '[{"value": "150", "unit": "%", "label": "Satış Artışı"}, {"value": "40", "unit": "%", "label": "Sepet Terk Azalması"}]'::jsonb,
    '["Analiz & Strateji", "UX Tasarımı", "Development", "Test & Canlıya Geçiş"]'::jsonb,
    'published',
    true,
    1,
    NOW()
),
(
    uuid_generate_v4(),
    'Meta Reklam Optimizasyonu',
    'meta-reklam-optimizasyonu',
    'B2B SaaS firması için lead başına maliyetleri (CPL) %60 düşüren reklam stratejisi.',
    '## Zorluklar\nYüksek reklam maliyetleri (CPL) ve düşük nitelikli lead problemleri satış ekibinin verimliliğini düşürüyordu.',
    '## Çözüm\nHedef kitle segmentasyonu ve kreatif A/B testleri ile kampanyaları optimize ettik.\n- **CRM Entegrasyonu**: Lead kalitesini anlık takip.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    'TechSoft',
    'Teknoloji / SaaS',
    ARRAY['Meta Ads', 'Lead Generation', 'CRM Entegrasyonu'],
    '[{"value": "60", "unit": "%", "label": "CPL Düşüşü"}, {"value": "25", "unit": "%", "label": "Kapanış Oranı Artışı"}]'::jsonb,
    '["Hesap Denetimi", "Hedef Kitle Analizi", "Kreatif Üretimi", "Optimizasyon"]'::jsonb,
    'published',
    true,
    2,
    NOW()
),
(
    uuid_generate_v4(),
    'Kurumsal Web Site + SEO Altyapı',
    'kurumsal-web-site-seo',
    'İnşaat devinin dijital yüzünü yeniledik ve organik trafikte %200 artış sağladık.',
    '## Zorluklar\nEski ve mobil uyumlu olmayan web sitesi nedeniyle arama motorlarında görünürlük kaybı yaşanıyordu.',
    '## Çözüm\nModern, hızlı ve SEO uyumlu bir Next.js web sitesi tasarladık.\n- **Next.js & SSR**: Işık hızında açılış süreleri.',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
    'Yapı İnşaat',
    'İnşaat / Gayrimenkul',
    ARRAY['Web Tasarım', 'Next.js', 'SEO', 'İçerik Stratejisi'],
    '[{"value": "200", "unit": "%", "label": "Organik Trafik"}, {"value": "1.Sayfa", "unit": "", "label": "Google Sıralaması"}]'::jsonb,
    '["Wireframe", "UI Tasarım", "Frontend Kodlama", "SEO Kurulumu"]'::jsonb,
    'published',
    true,
    3,
    NOW()
);

-- 3. UPDATE: Homepage Sections (Cleaning placeholders)
UPDATE homepage_sections
SET description = 'Sizin için neler başardığımıza göz atın. Gerçek sonuçlar, gerçek büyümeler.'
WHERE section_key = 'case_studies';

UPDATE homepage_sections
SET description = 'Şeffaf süreçler, ölçülebilir sonuçlar ve uzman kadromuzla markanızı büyütüyoruz.'
WHERE section_key = 'why_digma';

UPDATE homepage_sections
SET title = 'Referanslarımız'
WHERE section_key = 'logos';

-- 4. CLEANUP: Pricing Placeholder
UPDATE homepage_sections
SET is_enabled = false
WHERE section_key = 'pricing';

-- 5. CLEANUP: Services Mission Placeholder
UPDATE homepage_sections
SET description = NULL
WHERE section_key = 'services' AND description LIKE '%Lorem ipsum%';
