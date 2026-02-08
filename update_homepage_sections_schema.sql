-- Add highlight column if it doesn't exist
ALTER TABLE public.homepage_sections 
ADD COLUMN IF NOT EXISTS highlight TEXT;

-- Update existing sections with highlights and ensure all sections exist
INSERT INTO public.homepage_sections (section_key, title, highlight, description, cta_label, cta_href, order_index, is_enabled, settings) VALUES
('hero', 'Markanızı Dijitalde', 'Ölçülebilir Büyütelim', 'Veri odaklı stratejilerle işinizi bir sonraki seviyeye taşıyoruz.', 'Ücretsiz Analiz Al', '#analysis-form', 1, true, '{"subtitle": "Performans Pazarlama Ajansı"}'::jsonb),
('logos', 'Referanslarımız', null, null, null, null, 2, true, '{}'::jsonb),
('services', 'Hizmetlerimiz', null, 'Dijital dünyada başarıya ulaşmanız için ihtiyacınız olan her şey.', 'Tüm Hizmetler', '/hizmetler', 3, true, '{}'::jsonb),
('why_digma', 'Neden Digma?', null, 'Veri odaklı yaklaşımımız ve şeffaf süreçlerimizle fark yaratıyoruz.', null, null, 4, true, '{}'::jsonb),
('how_it_works', 'Nasıl Çalışırız?', null, 'Başarıya giden yol haritamız 4 adımdan oluşuyor.', null, null, 5, true, '{}'::jsonb),
('case_studies', 'Başarı Hikayeleri', null, 'Rakamlarla kanıtlanmış sonuçlar.', 'Tümünü Gör', '/vaka-calismalari', 6, true, '{"limit": 3}'::jsonb),
('testimonials', 'Müşterilerimiz Ne Diyor?', null, null, null, null, 7, true, '{}'::jsonb),
('team', 'Uzman Ekibimiz', null, 'Dijital hedeflerinizi gerçekleştiren beyin takımı.', null, null, 8, true, '{}'::jsonb),
('blog', 'Dijital Rehber', null, null, 'Tüm Yazılar', '/blog', 9, true, '{"limit": 3, "featuredOnly": true}'::jsonb),
('final_cta', 'Büyümeye Hazır Mısınız?', null, 'Markanızın potansiyelini keşfetmek için ücretsiz analiz formunu doldurun, size özel stratejiyi paylaşalım.', 'Ücretsiz Analiz Al', '#analysis-form', 10, true, '{}'::jsonb)
ON CONFLICT (section_key) DO UPDATE SET
    highlight = EXCLUDED.highlight,
    order_index = EXCLUDED.order_index;
