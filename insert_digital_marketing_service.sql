-- Insert Digital Marketing Service
INSERT INTO services (
    slug,
    title,
    summary,
    content,
    icon,
    status,
    seo_title,
    seo_desc,
    image_url,
    cta_overrides,
    process,
    benefits,
    faq
) VALUES (
    'dijital-pazarlama-reklam-yonetimi',
    'Dijital Pazarlama & Reklam Yönetimi',
    'Meta ve Google Ads’te strateji, kurulum ve optimizasyonla ROAS odaklı büyüme.',
    '## Dijital Pazarlama & Reklam Yönetimi Nedir?

Markanızın ürün veya hizmetlerini doğru hedef kitleyle buluşturmak için veri odaklı reklam stratejileri geliştiriyoruz. Meta (Facebook/Instagram) ve Google Ads platformlarında bütçenizi en verimli şekilde yöneterek, ölçülebilir büyüme ve yüksek yatırım getirisi (ROAS) sağlıyoruz.

> **Hedef:** E-ticaret satışlarını artırmak, kurumsal potansiyel müşteri (lead) toplamak ve marka bilinirliğini ölçeklendirmek.

---

## Kimler İçin Uygun?

- Satışlarını artırmak isteyen **E-ticaret Markaları**
- Nitelikli form/talep toplamak isteyen **Kurumsal Firmalar**
- Agresif büyüme hedefleyen **KOBİ’ler** ve **Girişimler**
- Reklam bütçesini verimsiz kullanan ve **ROAS artışı** isteyenler

---

## Neler Dahil?

### 1) Strateji & Planlama
- Pazar ve rakip analizi
- Hedef kitle segmentasyonu (Persona çıkarma)
- Platform bazlı bütçe dağılım senaryoları
- KPI ve hedef belirleme (CPA, ROAS, ROI)

### 2) Teknik Kurulum & Takip (Tracking)
- Google Analytics 4 (GA4) kurulumu ve etkinlik takibi
- Meta Pixel ve Conversion API (CAPI) entegrasyonu
- Google Ads dönüşüm kurulumları
- Tag Manager optimizasyonu

### 3) Kampanya Yönetimi
- **Meta Ads (Facebook & Instagram):** Katalog reklamları, lead formları, trafik ve dönüşüm kampanyaları.
- **Google Ads:** Arama ağı (Search), Alışveriş (Shopping), Performance Max ve YouTube reklamları.
- Yeniden pazarlama (Retargeting) kurguları.

### 4) Kreatif & İçerik Desteği
- Reklam görsel/video brieflerinin hazırlanması
- A/B testleri için varyasyon önerileri
- Metin yazarlığı (Ad Copy) ve başlık testleri

### 5) Optimizasyon & Ölçekleme
- Haftalık performans analizleri
- Kazanan kampanyaları belirleme ve bütçe artırımı (Scaling)
- Düşük performanslı setlerin kapatılması veya revizesi

---

## Süreç Nasıl İlerliyor?

1. **Keşif:** Hedeflerinizi, mevcut durumunuzu ve reklam geçmişinizi analiz ederiz.
2. **Strateji:** Size özel yol haritası, bütçe planı ve mecra seçimi yaparız.
3. **Kurulum:** Hesaplarınızı teknik olarak hazırlar, pixel ve dönüşüm ayarlarını tamamlarız.
4. **Test & Öğrenme:** Farklı hedef kitle ve kreatifleri test ederek veri toplarız.
5. **Optimizasyon:** Verilere göre kampanyaları iyileştirir ve ROAS’ı artırırız.
6. **Raporlama:** Şeffaf, anlaşılır ve veri odaklı raporlarla süreci takip edersiniz.',
    'BarChart', -- Lucide Icon
    'published',
    'Dijital Pazarlama & Reklam Yönetimi | ROAS Odaklı Büyüme',
    'Meta ve Google Ads reklamları ile e-ticaret satışlarınızı artırın veya potansiyel müşteri toplayın. Veri odaklı, şeffaf ve profesyonel reklam yönetimi.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340', -- Premium Abstract Image
    '{"get-offer": {"label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true}, "contact": {"label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true}, "book-call": {"isEnabled": false}}'::jsonb,
    -- Process Steps
    '[
        {"title": "Keşif", "desc": "Hedef ve rakip analizi"},
        {"title": "Strateji", "desc": "Yol haritası belirleme"},
        {"title": "Kurulum", "desc": "Teknik altyapı ve hesap kurulumu"},
        {"title": "Test", "desc": "Kreatif ve kitle testleri"},
        {"title": "Optimizasyon", "desc": "Veri odaklı iyileştirme"},
        {"title": "Raporlama", "desc": "Şeffaf performans sunumu"}
    ]'::jsonb,
    -- Benefits (Öne Çıkanlar)
    '[
        {"title": "ROAS Odaklı", "desc": "Yüksek yatırım getirisi stratejisi"},
        {"title": "Multi-Channel", "desc": "Meta + Google Ads entegre yönetim"},
        {"title": "Kreatif Test", "desc": "Sürekli görsel/metin optimizasyonu"},
        {"title": "Şeffaf Rapor", "desc": "Haftalık net aksiyon planları"}
    ]'::jsonb,
    -- FAQ
    '[
        {"question": "Reklam bütçesi ne kadar olmalı?", "answer": "Bütçe hedeflerinize, sektöre ve rekabet durumuna göre değişir. Başlangıçta test verisi toplamak için minimum bir tutar (örn. günlük 500-1000 TL) öneririz, ancak asıl bütçe ROAS hedefine göre şekillenir."},
        {"question": "Hangi platformlarda reklam veriyorsunuz?", "answer": "Başta Meta (Facebook, Instagram) ve Google Ads (Arama, Alışveriş, YouTube, Display) olmak üzere, projenin ihtiyacına göre TikTok, LinkedIn ve Pinterest reklamlarını da yönetiyoruz."},
        {"question": "Raporlama sıklığı nedir?", "answer": "Standart olarak haftalık performans özetleri ve aylık detaylı strateji toplantıları yapıyoruz. Ayrıca panelinizden verileri anlık takip edebilirsiniz."},
        {"question": "Satış garantisi veriyor musunuz?", "answer": "Dijital pazarlamada kesin satış garantisi vermek dürüst bir yaklaşım değildir çünkü ürün, fiyat, site deneyimi gibi birçok değişken vardır. Ancak biz, trafiğin kalitesini ve dönüşüm oranını artırma garantisi veriyoruz."},
        {"question": "Kurulum süresi ne kadar?", "answer": "Hesapların incelenmesi, teknik entegrasyonlar (Pixel, GA4) ve strateji kurgusu genellikle 3-5 iş günü sürer."},
        {"question": "Kreatifleri siz mi hazırlıyorsunuz?", "answer": "Evet, performans odaklı statik görselleri biz tasarlayabiliriz. Video veya prodüksiyon gerektiren işlerde ise kreatif ekibimizle veya sizin materyallerinizle ilerleriz."}
    ]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    content = EXCLUDED.content,
    cta_overrides = EXCLUDED.cta_overrides,
    seo_title = EXCLUDED.seo_title,
    seo_desc = EXCLUDED.seo_desc,
    image_url = EXCLUDED.image_url,
    process = EXCLUDED.process,
    benefits = EXCLUDED.benefits,
    faq = EXCLUDED.faq;
