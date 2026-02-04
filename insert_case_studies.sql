-- Insert 3 Sample Case Studies

INSERT INTO case_studies (
    title, 
    slug, 
    excerpt, 
    cover_image, 
    client_name, 
    client_visible, 
    sector, 
    services, 
    status, 
    published_at,
    problem,
    solution,
    process_steps,
    results,
    testimonial,
    seo_title,
    seo_desc,
    is_indexable
)
VALUES 
-- 1. E-Ticaret (Velvet & Rose)
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
    '**Sorun:** Velvet & Rose, yüksek trafik almasına rağmen ziyaretçileri müşteriye dönüştürmekte zorlanıyordu. Sepette terk etme oranları %85 seviyesindeydi ve mobil deneyim, lüks marka algısını yansıtmıyordu.',
    '**Çözüm:** Kapsamlı bir UX denetimi sonrası, satın alma sürecini 5 adımdan 2 adıma düşürdük. "Glassmorphism" tasarım diliyle ürünlerin öne çıktığı, premium bir mobil arayüz tasarladık. Kişiselleştirilmiş ürün öneri motoru entegre ettik.',
    '["Site Hızı Optimizasyonu", "Mobil Arayüz Yenileme", "Sepet Akışı Sadeleştirme", "A/B Testleri"]'::jsonb,
    '[
        {"value": "150", "unit": "%", "label": "Satış Artışı"},
        {"value": "65", "unit": "%", "label": "Mobil Dönüşüm"},
        {"value": "3.5", "unit": "ROAS", "label": "Reklam Getirisi"}
    ]'::jsonb,
    '{"name": "Ayşe Yılmaz", "company": "Velvet & Rose CEO", "quote": "Digma ekibi sadece sitemizi yenilemedi, işimizi büyüttü. Rakamlar her şeyi anlatıyor.", "avatar": ""}'::jsonb,
    'Velvet & Rose E-Ticaret Başarı Hikayesi | Digma',
    'Velvet & Rose markası için yaptığımız e-ticaret optimizasyonu ile satışları %150 artırdık. Vaka analizini inceleyin.',
    true
),

-- 2. Teknoloji (TechFlow SaaS)
(
    'TechFlow SaaS: Global Pazara Açılma ve Rebranding',
    'techflow-saas-rebranding',
    'B2B yazılım şirketi TechFlow''un kurumsal kimliğini yenileyerek global pazarda rekabet edebilir hale getirdik. Lead kalitesini %40 artırdık.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    'TechFlow',
    true,
    'Teknoloji',
    ARRAY['Marka Kimliği', 'Web Tasarım', 'İçerik Stratejisi'],
    'published',
    NOW() - INTERVAL '10 days',
    '**Sorun:** TechFlow, güçlü bir ürüne sahip olmasına rağmen, marka kimliği "eski moda" kaldığı için enterprise müşterileri ikna etmekte zorlanıyordu. Web sitesi teknik detaylara boğulmuştu ve değer önerisi net değildi.',
    '**Çözüm:** Marka kimliğini "Modern, Güvenilir ve İnovatif" anahtar kelimeleri etrafında yeniden kurguladık. Web sitesini 3D illüstrasyonlar ve interaktif demolarla zenginleştirerek, ürünün karmaşık yapısını basitçe anlatan bir hikaye oluşturduk.',
    '["Marka Stratejisi Çalıştayı", "Logo ve Kurumsal Kimlik", "Web UI Globalizasyonu", "Animasyonlu Ürün Demoları"]'::jsonb,
    '[
        {"value": "40", "unit": "%", "label": "Lead Kalitesi Artışı"},
        {"value": "20", "unit": "ülke", "label": "Yeni Pazar"},
        {"value": "2x", "unit": "", "label": "Demo Talebi"}
    ]'::jsonb,
    '{"name": "John Smith", "company": "TechFlow CMO", "quote": "Artık global rakiplerimizle aynı masada oturabiliyoruz. Tasarım dili, vizyonumuzu tam olarak yansıtıyor.", "avatar": ""}'::jsonb,
    'TechFlow SaaS Rebranding ve Web Tasarım | Digma',
    'TechFlow SaaS markasının globalleşme yolculuğunda marka kimliği ve web tasarım süreçlerini nasıl yönettik? İnceleyin.',
    true
),

-- 3. Sağlık (Dr. Armağan Klinik)
(
    'Dr. Armağan Klinik: Yerel SEO ile Randevuları %400 Artırdık',
    'dr-armagan-klinik-seo',
    'Estetik kliniği için uyguladığımız Yerel SEO ve içerik stratejisi sayesinde, organik aramalardan gelen hasta sayısında rekor artış sağladık.',
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
    'Dr. Armağan Klinik',
    true,
    'Sağlık',
    ARRAY['Yerel SEO', 'Sosyal Medya', 'Google Ads'],
    'published',
    NOW() - INTERVAL '2 weeks',
    '**Sorun:** Yeni açılan klinik, bölgesindeki yoğun rekabet nedeniyle Google Haritalar''da ve aramalarda görünmüyordu. Geleneksel reklam maliyetleri çok yüksekti.',
    '**Çözüm:** "Estetik Kliniği" ve ilgili anahtar kelimelerde kapsamlı bir yerel SEO çalışması başlattık. Google My Business profilini optimize ettik, blog içerikleriyle otorite kazandırdık ve hasta yorumlarını (social proof) ön plana çıkardık.',
    '["Google My Business Kurulumu", "Yerel Anahtar Kelime Analizi", "Blog İçerik Üretimi", "Yorum Yönetimi"]'::jsonb,
    '[
        {"value": "400", "unit": "%", "label": "Randevu Artışı"},
        {"value": "#1", "unit": "", "label": "Google Sıralaması"},
        {"value": "5k+", "unit": "", "label": "Organik Trafik"}
    ]'::jsonb,
    '{"name": "Dr. Armağan", "company": "Kurucu Hekim", "quote": "Dijitalden bu kadar hasta gelebileceğini tahmin etmemiştim. Artık randevularımız haftalar öncesinden doluyor.", "avatar": ""}'::jsonb,
    'Dr. Armağan Klinik Yerel SEO Başarısı | Digma',
    'Sağlık sektöründe yerel SEO ile nasıl fark yarattık? Klinik randevularını artıran dijital pazarlama stratejimiz.',
    true
);
