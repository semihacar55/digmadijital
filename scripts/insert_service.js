import { createClient } from '@supabase/supabase-js';

// Hardcoded for this script execution context
const SUPABASE_URL = 'https://mlbgluwbqjvkfkduzcfk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sYmdsdXdicWp2a2ZrZHV6Y2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzg0ODIsImV4cCI6MjA4NTcxNDQ4Mn0.swOweQ4U-KzjeE9vUwWh4vO0q_LmGuVjgWouym2LPpw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const serviceData = {
    slug: 'dijital-pazarlama-reklam-yonetimi',
    title: 'Dijital Pazarlama & Reklam Yönetimi',
    summary: 'Meta ve Google Ads’te strateji, kurulum ve optimizasyonla ROAS odaklı büyüme.',
    content: `## Dijital Pazarlama & Reklam Yönetimi Nedir?

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
6. **Raporlama:** Şeffaf, anlaşılır ve veri odaklı raporlarla süreci takip edersiniz.`,
    icon: 'BarChart',
    status: 'published',
    seo_title: 'Dijital Pazarlama & Reklam Yönetimi | ROAS Odaklı Büyüme',
    seo_desc: 'Meta ve Google Ads reklamları ile e-ticaret satışlarınızı artırın veya potansiyel müşteri toplayın. Veri odaklı, şeffaf ve profesyonel reklam yönetimi.',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340',
    cta_overrides: {
        "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
        "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
        "book-call": { "isEnabled": false }
    },
    process: [
        { "title": "Keşif", "desc": "Hedef ve rakip analizi" },
        { "title": "Strateji", "desc": "Yol haritası belirleme" },
        { "title": "Kurulum", "desc": "Teknik altyapı ve hesap kurulumu" },
        { "title": "Test", "desc": "Kreatif ve kitle testleri" },
        { "title": "Optimizasyon", "desc": "Veri odaklı iyileştirme" },
        { "title": "Raporlama", "desc": "Şeffaf performans sunumu" }
    ],
    benefits: [
        { "title": "ROAS Odaklı", "desc": "Yüksek yatırım getirisi stratejisi" },
        { "title": "Multi-Channel", "desc": "Meta + Google Ads entegre yönetim" },
        { "title": "Kreatif Test", "desc": "Sürekli görsel/metin optimizasyonu" },
        { "title": "Şeffaf Rapor", "desc": "Haftalık net aksiyon planları" }
    ],
    faq: [
        { "question": "Reklam bütçesi ne kadar olmalı?", "answer": "Bütçe hedeflerinize, sektöre ve rekabet durumuna göre değişir. Başlangıçta test verisi toplamak için minimum bir tutar (örn. günlük 500-1000 TL) öneririz, ancak asıl bütçe ROAS hedefine göre şekillenir." },
        { "question": "Hangi platformlarda reklam veriyorsunuz?", "answer": "Başta Meta (Facebook, Instagram) ve Google Ads (Arama, Alışveriş, YouTube, Display) olmak üzere, projenin ihtiyacına göre TikTok, LinkedIn ve Pinterest reklamlarını da yönetiyoruz." },
        { "question": "Raporlama sıklığı nedir?", "answer": "Standart olarak haftalık performans özetleri ve aylık detaylı strateji toplantıları yapıyoruz. Ayrıca panelinizden verileri anlık takip edebilirsiniz." },
        { "question": "Satış garantisi veriyor musunuz?", "answer": "Dijital pazarlamada kesin satış garantisi vermek dürüst bir yaklaşım değildir çünkü ürün, fiyat, site deneyimi gibi birçok değişken vardır. Ancak biz, trafiğin kalitesini ve dönüşüm oranını artırma garantisi veriyoruz." },
        { "question": "Kurulum süresi ne kadar?", "answer": "Hesapların incelenmesi, teknik entegrasyonlar (Pixel, GA4) ve strateji kurgusu genellikle 3-5 iş günü sürer." },
        { "question": "Kreatifleri siz mi hazırlıyorsunuz?", "answer": "Evet, performans odaklı statik görselleri biz tasarlayabiliriz. Video veya prodüksiyon gerektiren işlerde ise kreatif ekibimizle veya sizin materyallerinizle ilerleriz." }
    ]
};

async function insertService() {
    console.log('Inserting service:', serviceData.title);

    // Check if exists
    const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('slug', serviceData.slug)
        .single();

    if (existing) {
        console.log('Updating existing service...');
        const { error } = await supabase
            .from('services')
            .update(serviceData)
            .eq('id', existing.id);

        if (error) console.error('Error updating:', error);
        else console.log('Update successful!');
    } else {
        console.log('Inserting new service...');
        const { error } = await supabase
            .from('services')
            .insert([serviceData]);

        if (error) console.error('Error inserting:', error);
        else console.log('Insert successful!');
    }
}

insertService();
