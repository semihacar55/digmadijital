import { createClient } from '@supabase/supabase-js';

// Hardcoded for this script execution context
const SUPABASE_URL = 'https://mlbgluwbqjvkfkduzcfk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sYmdsdXdicWp2a2ZrZHV6Y2ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzg0ODIsImV4cCI6MjA4NTcxNDQ4Mn0.swOweQ4U-KzjeE9vUwWh4vO0q_LmGuVjgWouym2LPpw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const serviceData = {
    slug: 'e-ticaret-yonetimi-buyume-danismanligi',
    title: 'E-Ticaret Yönetimi & Büyüme Danışmanlığı',
    summary: 'Ürün/kategori stratejisi, fiyatlandırma ve kampanya planı ile dönüşümü artıran, sürdürülebilir büyüme sistemi kuruyoruz.',
    seo_title: 'E-Ticaret Yönetimi & Büyüme Danışmanlığı | Digma',
    seo_desc: 'Kategori ve fiyat stratejisi, kampanya planı, CRO ve raporlama ile e-ticaret satışlarınızı artırın. Veri odaklı büyüme danışmanlığı.',
    icon: 'LineChart', // Fitting for growth/management
    status: 'published',
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2340', // Business/Commerce context

    // Markdown Content
    content: `## E-Ticaret Yönetimi & Büyüme Danışmanlığı Nedir?

Markanızın e-ticaret operasyonlarını sadece reklam yönetimiyle sınırlı tutmuyoruz. Kategori ağacından fiyatlandırma stratejisine, kampanya takviminden dönüşüm optimizasyonuna (CRO) kadar uçtan uca bir e-ticaret yönetimi ve e-ticaret danışmanlığı sunuyoruz. Veri odaklı kararlar alarak cironuzu ve kârlılığınızı artırmayı hedefliyoruz.

Digma olarak amacımız satışlarınızı anlık artışlarla değil, sürdürülebilir bir büyüme sistemiyle ölçeklendirmek. Ürünlerinizin doğru hedef kitleye, doğru fiyatla ve doğru zamanda sunulmasını sağlarken, operasyonel verimliliğinizi de maksimize ediyoruz.

---

## Kimler İçin Uygun?

- **Yeni Büyüyen Markalar:** E-ticarete yeni başlayan veya büyüme sancıları çeken, stratejik yol haritasına ihtiyaç duyanlar.
- **Operasyonu Oturmuş Ama Kârlılığı Düşenler:** Cirosu olan ancak kârlılık oranları (ROI/ROAS) istediği seviyede olmayanlar.
- **Kampanya Performansı Dalgalı Olanlar:** Sezonluk veya özel gün kampanyalarında istikrarlı başarı yakalamakta zorlananlar.
- **Kategori/Ürün Yapısı Dağınık Olanlar:** Ürün çeşitliliği artmış ancak kategori mimarisi ve kullanıcı deneyimi karmaşıklaşmış markalar.

---

## Neler Yapıyoruz?

### 1) Ürün & Kategori Mimarisi
Kullanıcı deneyimini iyileştiren, arama motoru dostu ve satışa yönlendiren koleksiyon/kategori kurgusu oluşturuyoruz.

### 2) Fiyatlandırma ve Kâr Odaklı Yapı
Rekabet analiziyle birlikte marj, iskonto ve paket (bundle) stratejilerini belirleyerek kârlı satış yapısı kuruyoruz.

### 3) Kampanya Planı ve Takvim
Sezon geçişleri, özel günler ve markanıza özel dönemler için yıllık/aylık detaylı kampanya takvimleri planlıyoruz.

### 4) Dönüşüm Optimizasyonu (CRO)
Ürün sayfası, sepet ve ödeme (checkout) adımlarındaki kaçışları analiz edip, dönüşüm oranını artıracak iyileştirmeler yapıyoruz.

### 5) Analitik & Ölçümleme
GA4, Pixel ve diğer takip araçlarını doğru yapılandırarak verinin (event, conversion) kayıpsız akmasını sağlıyoruz.

### 6) Raporlama
Haftalık ve aylık periyotlarla net metrikler (Ciro, AOV, CR, ROAS) üzerinden şeffaf raporlar sunuyoruz.

### 7) Stok/Ürün Önceliklendirme
Çok satan, yüksek kârlı veya stok eritilmesi gereken ürünleri analiz edip pazarlama önceliklerini belirliyoruz.

### 8) Reklam & Kanal Uyumu
Meta ve Google reklam ekipleriyle koordineli çalışarak, site içi aksiyonların reklam performansını beslemesini sağlıyoruz.

---

## Süreç Nasıl İşliyor?

1. **Analiz & Hedef:** Mevcut durumunuzu, site trafiğinizi ve satış metriklerinizi analiz ederek gerçekçi hedefler koyuyoruz.
2. **Strateji & Yol Haritası:** Kategori düzeni, fiyatlandırma politikası ve kampanya takvimini içeren stratejik planı hazırlıyoruz.
3. **Uygulama:** Site içi düzenlemeleri, içerik girişlerini ve kampanya hazırlıklarını hayata geçiriyoruz.
4. **Optimizasyon:** Kullanıcı davranışlarını (ısı haritaları, analitik) inceleyerek CRO ve performans iyileştirmeleri yapıyoruz.
5. **Raporlama & Büyüme Döngüsü:** Düzenli raporlarla sonuçları değerlendirip, yeni aksiyon listeleriyle büyüme döngüsünü sürdürüyoruz.

---

## Sık Sorulan Sorular

### E-ticaret büyüme danışmanlığı tam olarak nedir?
Sitenizin trafiğini satışa dönüştürme oranını artırmak, sepet ortalamasını yükseltmek ve operasyonel verimliliği sağlamak için yapılan stratejik çalışmalardır.

### Kaç haftada sonuç görürüm?
Genellikle ilk ay yapılan teknik ve içerik iyileştirmeleriyle birlikte, 4-6 hafta içinde dönüşüm metriklerinde (CR, AOV) pozitif değişimler gözlemlenmeye başlar.

### Sadece strateji mi, uygulama da yapıyor musunuz?
Hem stratejiyi belirliyor hem de panelinizde (Shopify, Ticimax, vb.) gerekli düzenlemeleri bizzat uyguluyoruz.

### Shopify / Woocommerce ile çalışıyor musunuz?
Evet. Shopify, WooCommerce, Ticimax, İdeasoft gibi popüler e-ticaret altyapılarının çoğunda deneyimliyiz.

### Raporlama nasıl yapılır, hangi metrikler takip edilir?
Haftalık toplantılarda Ciro, Dönüşüm Oranı (CR), Sepet Ortalaması (AOV), İade Oranları ve Reklam Getirisi (ROAS) gibi temel KPI'lar raporlanır.

### Minimum bütçe gerekir mi?
Danışmanlık hizmetimiz için sabit bir bütçe sınırı yoktur, ancak önerdiğimiz reklam ve araç (tool) yatırımları markanızın ölçeğine göre belirlenir.`,

    // CTA Configuration
    cta_overrides: {
        "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
        "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
        "book-call": { "isEnabled": false } // Disabled as requested implicitly (only 2 buttons mentioned)
    },

    // Structured Data
    process: [
        { "title": "Analiz & Hedef", "desc": "Mevcut durum ve metrik analizi" },
        { "title": "Strateji", "desc": "Kategori, fiyat ve kampanya kurgusu" },
        { "title": "Uygulama", "desc": "Site, içerik ve kampanya yönetimi" },
        { "title": "Optimizasyon", "desc": "CRO ve performans iyileştirme" },
        { "title": "Raporlama", "desc": "Büyüme döngüsü ve aksiyon planı" }
    ],
    benefits: [
        { "title": "Daha Yüksek Dönüşüm", "desc": "Optimize edilmiş site deneyimi" },
        { "title": "Kârlı Kampanyalar", "desc": "Veri odaklı kampanya sistemi" },
        { "title": "Net Raporlama", "desc": "Şeffaf veri ve karar alma süreçleri" },
        { "title": "Sürdürülebilir Büyüme", "desc": "Uzun vadeli başarı planı" }
    ],
    faq: [
        { "question": "E-ticaret büyüme danışmanlığı tam olarak nedir?", "answer": "Sitenizin trafiğini satışa dönüştürme oranını artırmak, sepet ortalamasını yükseltmek ve operasyonel verimliliği sağlamak için yapılan stratejik çalışmalardır." },
        { "question": "Kaç haftada sonuç görürüm?", "answer": "Genellikle ilk ay yapılan teknik ve içerik iyileştirmeleriyle birlikte, 4-6 hafta içinde dönüşüm metriklerinde (CR, AOV) pozitif değişimler gözlemlenmeye başlar." },
        { "question": "Sadece strateji mi, uygulama da yapıyor musunuz?", "answer": "Hem stratejiyi belirliyor hem de panelinizde (Shopify, Ticimax, vb.) gerekli düzenlemeleri bizzat uyguluyoruz." },
        { "question": "Shopify / Woocommerce ile çalışıyor musunuz?", "answer": "Evet. Shopify, WooCommerce, Ticimax, İdeasoft gibi popüler e-ticaret altyapılarının çoğunda deneyimliyiz." },
        { "question": "Raporlama nasıl yapılır, hangi metrikler takip edilir?", "answer": "Haftalık toplantılarda Ciro, Dönüşüm Oranı (CR), Sepet Ortalaması (AOV), İade Oranları ve Reklam Getirisi (ROAS) gibi temel KPI'lar raporlanır." },
        { "question": "Minimum bütçe gerekir mi?", "answer": "Danışmanlık hizmetimiz için sabit bir bütçe sınırı yoktur, ancak önerdiğimiz reklam ve araç (tool) yatırımları markanızın ölçeğine göre belirlenir." }
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
