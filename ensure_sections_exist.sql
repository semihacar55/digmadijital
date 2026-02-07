-- Insert missing sections if they don't exist
INSERT INTO public.homepage_sections (section_key, title, description, order_index, is_enabled) VALUES
('hero', 'Markanızı Dijitalde Büyütün', 'Veri odaklı stratejilerle işinizi bir sonraki seviyeye taşıyoruz.', 10, true),
('logos', 'Referanslar', 'Global ve yerel markaların güvenilir iş ortağı', 20, true),
('services', 'Uçtan Uca Dijital Çözümler', 'Markanızın ihtiyacı olan tüm dijital pazarlama süreçleri.', 30, true),
('why_digma', 'Neden Digma?', 'Veri odaklı yaklaşımımız.', 40, true),
('how_it_works', 'Nasıl Çalışırız?', '4 Adımda Büyüme Yolculuğu', 50, true),
('case_studies', 'Başarı Hikayeleri', 'Rakamlarla kanıtlanmış sonuçlar.', 60, true),
('testimonials', 'Müşterilerimiz Ne Diyor?', '', 70, true),
('team', 'Uzman Ekibimiz', 'Dijital hedeflerinizi gerçekleştiren beyin takımı.', 80, true),
('blog', 'Dijital Rehber', '', 90, true),
('final_cta', 'Büyümeye Hazır Mısınız?', 'Ücretsiz analiz formunu doldurun.', 100, true)
ON CONFLICT (section_key) DO UPDATE SET
    order_index = EXCLUDED.order_index; -- Update order to defaults to ensure a good starting state if needed, or just let user manage.
    -- We can avoid overwriting title/desc if we want to preserve user edits. 
    -- Let's only ensure keys exist.
