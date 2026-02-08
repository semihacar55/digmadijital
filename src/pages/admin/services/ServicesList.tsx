
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Plus, Search, Edit, Trash2, FileText } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';

interface Service {
    id: string;
    title: string;
    status: 'draft' | 'published';
    created_at: string;
    slug: string;
}

const ServicesList = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setServices(data);
        if (error) console.error('Error fetching services:', error);
        setLoading(false);
    };


    const seedMissingServices = async () => {
        if (!window.confirm('Eksik servisler (Kurumsal, Dijital, E-Ticaret) otomatik olarak eklenecek. Onaylıyor musunuz?')) return;

        setLoading(true);
        const servicesToSeed = [
            {
                slug: 'kurumsal-web-sitesi',
                title: 'Kurumsal Web Sitesi Tasarım & Yayına Alma',
                summary: 'Marka kimliğinize uygun, hızlı açılan ve SEO altyapılı kurumsal web sitesi. Yayına hazır teslim.',
                seo_title: 'Kurumsal Web Sitesi Tasarımı | Digma',
                seo_desc: 'Ajans ve marka imajınıza uygun kurumsal web sitesi tasarlıyor, hızlı ve mobil uyumlu şekilde yayına alıyoruz. SEO altyapısı, içerik yapısı ve dönüşüm odaklı sayfalar.',
                icon: 'Monitor',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426',
                content: `## Kurumsal Web Sitesi Tasarım & Yayına Alma Nedir?

Kurumsal web sitesi; markanızın güven, kalite ve uzmanlık algısını dijitalde doğru şekilde yansıtan, hızlı açılan ve mobil uyumlu bir vitrindir. Digma olarak tasarımı, içerik yapısını ve teknik altyapıyı birlikte ele alır; sitenizi yayına hazır şekilde teslim ederiz.

> **Hedef:** Markanıza yakışan, ziyaretçiyi aksiyona yönlendiren ve SEO altyapısı güçlü bir kurumsal web sitesi.

---

## Kimler İçin Uygun?

- Yeni bir marka/ajans sitesi kurmak isteyen işletmeler  
- Mevcut sitesini daha modern ve premium bir görünüme taşımak isteyenler  
- Hız, mobil uyum ve SEO altyapısı nedeniyle dönüşüm kaybeden markalar  
- Hizmetlerini net anlatan, teklif/iletişim getiren bir site isteyen ekipler  

---

## Neler Dahil?

### 1) Tasarım & Marka Uyum
- Premium ve modern UI tasarım yaklaşımı  
- Marka renkleri, tipografi ve görsel diliyle uyum  
- Kullanıcı deneyimi (UX) odaklı sayfa akışı

### 2) Sayfa Yapısı (Kurumsal İskelet)
- Ana sayfa kurgusu (hero + güven unsurları + hizmetler + referanslar + CTA)  
- Hakkımızda & İletişim sayfaları  
- Hizmet detay sayfaları için düzenli şablon  
- Blog altyapısı (varsa) / içerik alanları

### 3) Performans & Mobil Uyum
- Mobil-first responsive tasarım  
- Hız optimizasyonu (görsel boyutlandırma, lazy-load, temel iyileştirmeler)  
- Temiz ve sürdürülebilir component yapısı

### 4) SEO Altyapısı
- Sayfa başlık hiyerarşisi (H1/H2)  
- Meta title + meta description düzeni  
- Temel yapılandırılmış içerik kurgusu (kurumsal sayfalar için)  
- URL/slug düzeni ve iç linkleme önerileri

### 5) Yayına Alma & Test
- Formlar ve yönlendirmeler (iletişim / teklif)  
- Tarayıcı ve cihaz testleri  
- Yayına alma sonrası kısa teknik kontrol

---

## Süreç Nasıl İlerliyor?

1. **Kısa ihtiyaç analizi:** sektör, hedef, örnek beğeniler  
2. **Site haritası:** sayfalar ve içerik iskeleti  
3. **Tasarım uygulama:** premium görünüm + mobil uyum  
4. **İçerik yerleşimi:** başlıklar, açıklamalar, CTA noktaları  
5. **SEO & performans:** temel ayarlar ve hız kontrolü  
6. **Test & yayına alma:** form, yönlendirme, cihaz testleri

---

## Sıkça Sorulan Sorular

### Kaç sayfa yapılır?
İhtiyaca göre değişir; genelde ana sayfa + hakkımızda + iletişim + 3–6 hizmet sayfası ile başlanır.

### İçerikleri siz mi yazıyorsunuz?
İsterseniz içerik taslağını biz çıkarırız; siz onayladıktan sonra siteye yerleştiririz.

### Site mobil uyumlu olacak mı?
Evet. Mobil-first yaklaşım ile tüm ekranlarda düzgün görünür.

### SEO için ne yapıyorsunuz?
Temel teknik ve içerik yapısı kurulur: başlık hiyerarşisi, meta alanları, URL düzeni ve içerik yönlendirmeleri.

### Yayına aldıktan sonra destek var mı?
İlk yayına alma sonrası kısa süreli teknik kontrol ve gerekli küçük düzeltmeler sağlanır.`,
                cta_overrides: {
                    "book-call": { "isEnabled": false }
                }
            },
            {
                slug: 'dijital-pazarlama-reklam-yonetimi',
                title: 'Dijital Pazarlama & Reklam Yönetimi',
                summary: 'Meta ve Google Ads’te strateji, kurulum ve optimizasyonla ROAS odaklı büyüme.',
                seo_title: 'Dijital Pazarlama & Reklam Yönetimi | ROAS Odaklı Büyüme',
                seo_desc: 'Meta ve Google Ads reklamları ile e-ticaret satışlarınızı artırın veya potansiyel müşteri toplayın. Veri odaklı, şeffaf ve profesyonel reklam yönetimi.',
                icon: 'BarChart',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2340',
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
            },
            {
                slug: 'e-ticaret-yonetimi-buyume-danismanligi',
                title: 'E-Ticaret Yönetimi & Büyüme Danışmanlığı',
                summary: 'Ürün/kategori stratejisi, fiyatlandırma ve kampanya planı ile dönüşümü artıran, sürdürülebilir büyüme sistemi kuruyoruz.',
                seo_title: 'E-Ticaret Yönetimi & Büyüme Danışmanlığı | Digma',
                seo_desc: 'Kategori ve fiyat stratejisi, kampanya planı, CRO ve raporlama ile e-ticaret satışlarınızı artırın. Veri odaklı büyüme danışmanlığı.',
                icon: 'LineChart',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2340',
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
                cta_overrides: {
                    "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
                    "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
                    "book-call": { "isEnabled": false }
                },
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
            }
        ];

        let successCount = 0;
        let failCount = 0;


        for (const service of servicesToSeed) {
            try {
                // Check if exists
                const { data: existing } = await supabase
                    .from('services')
                    .select('id')
                    .eq('slug', service.slug)
                    .single();

                if (existing) {
                    console.log(`Service ${service.slug} already exists.`);
                } else {
                    const { error } = await supabase
                        .from('services')
                        .insert([service]);

                    if (error) throw error;
                    successCount++;
                }
            } catch (err: any) {
                console.error(`Error seeding ${service.slug}:`, err);
                failCount++;
            }
        }

        alert(`İşlem tamamlandı.\nEklenen Servisler: ${successCount}\nHatalar: ${failCount}\nLütfen sayfayı yenileyiniz.`);
        window.location.reload();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

        const { error } = await supabase.from('services').delete().eq('id', id);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <FadeIn>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" onClick={seedMissingServices} className="flex items-center gap-2">
                            ⚡ Eksik Servisleri Kur
                        </Button>
                        <Link to="/admin/services/new">
                            <Button variant="accent" className="flex items-center gap-2">
                                <Plus size={18} />
                                Yeni Hizmet Ekle
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Hizmet ara..."
                            icon={<Search size={16} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-sm font-medium text-text-muted">Başlık</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Slug</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Durum</th>
                                <th className="p-4 text-sm font-medium text-text-muted text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-text-muted">Yükleniyor...</td>
                                </tr>
                            ) : filteredServices.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-text-muted">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filteredServices.map((service) => (
                                    <tr key={service.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center border border-white/10 text-accent-blue">
                                                    <FileText size={20} />
                                                </div>
                                                <span className="font-medium text-white">{service.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-text-muted">/{service.slug}</td>
                                        <td className="p-4">
                                            <span className={`
                                                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                                ${service.status === 'published'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}
                                            `}>
                                                {service.status === 'published' ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/admin/services/${service.id}`}>
                                                    <Button variant="outline" className="h-8 w-8 p-0 flex items-center justify-center">
                                                        <Edit size={14} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="secondary" // Use secondary for delete to avoid red clashes or create danger variant later
                                                    className="h-8 w-8 p-0 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>
    );
};

export default ServicesList;
