-- Create homepage_sections table for managing homepage content
CREATE TABLE IF NOT EXISTS public.homepage_sections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    cta_label TEXT,
    cta_href TEXT,
    is_enabled BOOLEAN DEFAULT true,
    order_index INTEGER NOT NULL,
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

-- Public can read
DROP POLICY IF EXISTS "Public can view homepage sections" ON public.homepage_sections;
CREATE POLICY "Public can view homepage sections"
    ON public.homepage_sections FOR SELECT
    USING (true);

-- Authenticated users can manage
DROP POLICY IF EXISTS "Authenticated users can manage sections" ON public.homepage_sections;
CREATE POLICY "Authenticated users can manage sections"
    ON public.homepage_sections FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Insert default homepage sections
INSERT INTO public.homepage_sections (section_key, title, description, cta_label, cta_href, order_index, settings) VALUES
('hero', 'Markanızı Dijitalde Büyütün', 'Veri odaklı stratejilerle işinizi bir sonraki seviyeye taşıyoruz.', 'Ücretsiz Görüşme', '#analysis-form', 1, '{"subtitle": "Performans Pazarlama Ajansı"}'::jsonb),
('services', 'Hizmetlerimiz', 'Dijital dünyada başarıya ulaşmanız için ihtiyacınız olan her şey.', 'Tüm Hizmetler', '/hizmetler', 2, '{}'::jsonb),
('how_it_works', 'Nasıl Çalışırız?', 'Başarıya giden yol haritamız 4 adımdan oluşuyor.', null, null, 3, '{}'::jsonb),
('case_studies', 'Başarı Hikayeleri', 'Rakamlarla kanıtlanmış sonuçlar.', 'Tümünü Gör', '/vaka-calismalari', 4, '{"limit": 3}'::jsonb),
('testimonials', 'Müşterilerimiz Ne Diyor?', null, null, null, 5, '{}'::jsonb),
('team', 'Uzman Ekibimiz', 'Dijital hedeflerinizi gerçekleştiren beyin takımı.', null, null, 6, '{}'::jsonb),
('blog', 'Dijital Rehber', null, 'Tüm Yazılar', '/blog', 7, '{"limit": 3, "featuredOnly": true}'::jsonb),
('final_cta', 'Büyümeye Hazır Mısınız?', 'Markanızın potansiyelini keşfetmek için ücretsiz analiz formunu doldurun, size özel stratejiyi paylaşalım.', 'Ücretsiz Analiz Al', '#analysis-form', 8, '{}'::jsonb)
ON CONFLICT (section_key) DO NOTHING;

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_homepage_sections_order ON homepage_sections(order_index);
