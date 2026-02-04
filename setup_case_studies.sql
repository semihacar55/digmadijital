-- 1. Reset Table (Ensure clean state)
DROP TABLE IF EXISTS case_studies CASCADE;

-- 2. Create case_studies table
CREATE TABLE case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    cover_image TEXT,
    client_name TEXT,
    client_visible BOOLEAN DEFAULT true,
    sector TEXT,
    services TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- Content Blocks
    problem TEXT,
    solution TEXT,
    results JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    gallery TEXT[] DEFAULT '{}',
    testimonial JSONB DEFAULT '{}'::jsonb,
    
    -- SEO
    seo_title TEXT,
    seo_desc TEXT,
    og_image TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,

    -- Meta
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- 2. Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies (Drop first to avoid conflicts)
DROP POLICY IF EXISTS "Public case studies are viewable by everyone" ON case_studies;
CREATE POLICY "Public case studies are viewable by everyone" 
ON case_studies FOR SELECT 
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can do everything" ON case_studies;
CREATE POLICY "Authenticated users can do everything" 
ON case_studies FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 4. Create Indexes
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);

-- 5. Insert Sample Data
INSERT INTO case_studies (
    title, slug, excerpt, cover_image, client_name, client_visible, sector, services, status, published_at,
    problem, solution, process_steps, results, testimonial, seo_title, seo_desc
)
VALUES 
(
    'Velvet & Rose: E-Ticaret Dönüşüm Oranlarında %150 Artış',
    'velvet-rose-eticaret-buyume',
    'Lüks giyim markası Velvet & Rose için gerçekleştirdiğimiz UX/UI iyileştirmeleri ve CRO çalışmalarıyla satışları 2.5 katına çıkardık.',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop',
    'Velvet & Rose',
    true,
    'E-Ticaret',
    ARRAY['UX/UI Tasarım', 'Dönüşüm Optimizasyonu', 'Web Geliştirme'],
    'published',
    NOW() - INTERVAL '3 days',
    '**Sorun:** Velvet & Rose, yüksek trafik almasına rağmen ziyaretçileri müşteriye dönüştürmekte zorlanıyordu...',
    '**Çözüm:** Kapsamlı bir UX denetimi sonrası, satın alma sürecini 5 adımdan 2 adıma düşürdük...',
    '["Site Hızı Optimizasyonu", "Mobil Arayüz Yenileme", "Sepet Akışı Sadeleştirme", "A/B Testleri"]'::jsonb,
    '[{"value": "150", "unit": "%", "label": "Satış Artışı"}, {"value": "65", "unit": "%", "label": "Mobil Dönüşüm"}]'::jsonb,
    '{"name": "Ayşe Yılmaz", "company": "Velvet & Rose CEO", "quote": "Digma ekibi sadece sitemizi yenilemedi, işimizi büyüttü."}'::jsonb,
    'Velvet & Rose E-Ticaret Başarı Hikayesi | Digma',
    'Velvet & Rose markası için yaptığımız e-ticaret optimizasyonu ile satışları %150 artırdık.'
),
(
    'TechFlow SaaS: Global Pazara Açılma ve Rebranding',
    'techflow-saas-rebranding',
    'B2B yazılım şirketi TechFlow''un kurumsal kimliğini yenileyerek global pazarda rekabet edebilir hale getirdik.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    'TechFlow',
    true,
    'Teknoloji',
    ARRAY['Marka Kimliği', 'Web Tasarım', 'İçerik Stratejisi'],
    'published',
    NOW() - INTERVAL '10 days',
    '**Sorun:** TechFlow, güçlü bir ürüne sahip olmasına rağmen, marka kimliği eski moda kaldığı için müşteri kaybediyordu...',
    '**Çözüm:** Marka kimliğini "Modern, Güvenilir ve İnovatif" anahtar kelimeleri etrafında yeniden kurguladık...',
    '["Marka Stratejisi", "Logo Tasarımı", "Web UI Globalizasyonu"]'::jsonb,
    '[{"value": "40", "unit": "%", "label": "Lead Kalitesi"}, {"value": "20", "unit": "ülke", "label": "Yeni Pazar"}]'::jsonb,
    '{"name": "John Smith", "company": "TechFlow CMO", "quote": "Artık global rakiplerimizle aynı masada oturabiliyoruz."}'::jsonb,
    'TechFlow SaaS Rebranding ve Web Tasarım | Digma',
    'TechFlow SaaS markasının globalleşme yolculuğunda marka kimliği ve web tasarım süreçleri.'
),
(
    'Dr. Armağan Klinik: Yerel SEO ile Randevuları %400 Artırdık',
    'dr-armagan-klinik-seo',
    'Estetik kliniği için uyguladığımız Yerel SEO ve içerik stratejisi sayesinde rekor hasta artışı sağladık.',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
    'Dr. Armağan Klinik',
    true,
    'Sağlık',
    ARRAY['Yerel SEO', 'Sosyal Medya', 'Google Ads'],
    'published',
    NOW() - INTERVAL '2 weeks',
    '**Sorun:** Google Haritalar''da görünürlük düşüktü...',
    '**Çözüm:** Kapsamlı yerel SEO ve Google My Business optimizasyonu...',
    '["GMB Kurulumu", "Yerel Anahtar Kelime Analizi", "Yorum Yönetimi"]'::jsonb,
    '[{"value": "400", "unit": "%", "label": "Randevu Artışı"}, {"value": "#1", "unit": "", "label": "Google Sıralaması"}]'::jsonb,
    '{"name": "Dr. Armağan", "company": "Kurucu Hekim", "quote": "Dijitalden bu kadar hasta gelebileceğini tahmin etmemiştim."}'::jsonb,
    'Dr. Armağan Klinik Yerel SEO Başarısı | Digma',
    'Sağlık sektöründe yerel SEO ile nasıl fark yarattık?'
);
