
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';

const SetupServices = () => {
    const [loading, setLoading] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog(prev => [...prev, msg]);

    const seedMissingServices = async () => {
        setLoading(true);
        addLog('Başlıyor...');

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
                summary: 'Ürün/kategori stratejisi, fiyatlandırma ve kampanya planı ile dönüşümü artıran, sürdürülebilir e-ticaret büyüme sistemi.',
                seo_title: 'E-Ticaret Yönetimi & Büyüme Danışmanlığı | Digma',
                seo_desc: 'Veri odaklı e-ticaret danışmanlığı ile satışlarınızı artırın. Kategori stratejisi, kârlılık analizi, kampanya yönetimi ve şeffaf raporlama süreçleri.',
                icon: 'LineChart',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=2340',
                content: `## E-Ticaret Yönetimi & Büyüme Danışmanlığı Nedir?

Markanızın e-ticaret operasyonlarını sadece "reklam vermek" olarak görmüyoruz. **Digma** olarak, kategori mimarisinden fiyatlandırma stratejisine, kampanya takviminden dönüşüm optimizasyonuna (CRO) kadar uçtan uca bir **e-ticaret yönetimi** süreci yürütüyoruz. Amacımız; anlık ciro artışları değil, sürdürülebilir ve kârlı bir büyüme sistemi kurmaktır.

E-ticaret sitenizi yaşayan, sürekli gelişen ve veriyle beslenen bir yapıya dönüştürüyoruz.

---

## Neleri Birlikte İyileştiriyoruz?

Sadece trafiği değil, trafiğin kalitesini ve alışverişe dönüşme oranını (CR) odağımıza alıyoruz.

- **Kârlılık:** Reklam maliyetlerini düşürürken (ROAS), sepet tutarını (AOV) artıracak stratejiler.
- **Kullanıcı Deneyimi:** Ziyaretçinin siteye girdiği andan ödeme yapana kadar geçirdiği yolculuğun (Customer Journey) pürüzsüzleştirilmesi.
- **Operasyonel Netlik:** "Hangi ürüne reklam verilmeli?", "İndirim oranı ne olmalı?", "Stoklar nasıl eritilmeli?" sorularına veriyle cevap verilmesi.

---

## Hizmet Kapsamı

### 1) Ürün & Kategori Stratejisi
Doğru kategori ağacı ve ürün hiyerarşisi ile kullanıcıların aradıklarını kolayca bulmasını sağlıyoruz. Koleksiyon yapılarını sezonluk trendlere göre güncelliyoruz.

### 2) Fiyatlandırma ve Kâr Analizi
Pazar rekabeti ve maliyet analizlerine göre dinamik fiyatlandırma, bundle (paket) önerileri ve kârlılık odaklı marj çalışmaları yapıyoruz.

### 3) Kampanya Yönetimi ve Takvimi
Özel günler (Black Friday, Yılbaşı, Sevgililer Günü) ve markanıza özel dönemler için yıllık/aylık detaylı kampanya takvimleri hazırlıyoruz.

### 4) Dönüşüm Optimizasyonu (CRO)
Ürün detayı, sepet ve ödeme sayfalarındaki kullanıcı kaçışlarını analiz ediyor; UI/UX iyileştirmeleriyle satın alma oranını artırıyoruz.

### 5) Stok ve Ürün Önceliklendirme
Pareto ilkesiyle (80/20 kuralı) en çok kazandıran ve potansiyeli yüksek ürünleri belirleyip pazarlama bütçesini bu ürünlere odaklıyoruz.

### 6) Analitik & Raporlama
GA4 ve e-ticaret paneli (Shopify, Ticimax, vb.) verilerini birleştirerek haftalık net, anlaşılır ve aksiyon odaklı raporlar sunuyoruz.

---

## Süreç Nasıl İşliyor?

1. **Analiz:** Mevcut metriklerin (Traffic, CR, AOV) incelenmesi ve eksiklerin tespiti.
2. **Strateji:** Marka hedeflerine uygun 3-6-12 aylık büyüme yol haritasının çıkarılması.
3. **Uygulama Planı:** Site içi düzenlemeler, kampanya hazırlıkları ve entegrasyonların yapılması.
4. **Optimizasyon:** Canlı verilerle sürekli test (A/B) ve iyileştirme döngüsü.
5. **Raporlama:** Şeffaf veri paylaşımı ve bir sonraki ayın aksiyon planının belirlenmesi.

---

## Sık Sorulan Sorular

### E-ticaret danışmanlığı ile reklam yönetimi arasındaki fark nedir?
Reklam yönetimi sadece trafiği getirir; e-ticaret danışmanlığı ise gelen trafiğin satışa dönmesini, kârlılığı ve marka sadakatini yönetir.

### Hangi altyapılarla çalışıyorsunuz?
Shopify, WooCommerce, Ticimax, İdeasoft ve T-Soft başta olmak üzere global ve yerel birçok altyapıda deneyimliyiz.

### Raporlama süreçleri nasıldır?
Haftalık yazılı raporlar ve aylık online strateji toplantıları ile ilerliyoruz. Şeffaflık bizim için esastır.

### Sonuçları ne zaman görmeye başlarız?
Teknik iyileştirmelerin etkisi 2-4 hafta içinde, stratejik büyüme etkileri ise genellikle 2. aydan itibaren netleşmeye başlar.

### Satış garantisi veriyor musunuz?
Ticarete etki eden (ürün, fiyat, pazar) birçok değişken olduğu için satış garantisi vermek gerçekçi değildir. Ancak performans artışı ve dönüşüm optimizasyonu garantisi veriyoruz.

### Ekibinizde yazılımcı var mı?
Evet, basit kod düzenlemeleri ve tracking (takip) kurulumları için teknik ekibimiz sürece dahildir.

### Kargo ve lojistik süreçlerine karışıyor musunuz?
Operasyonel danışmanlık kapsamında kargo entegrasyonları ve süreç iyileştirme önerileri sunuyoruz ancak fiziksel lojistiği yönetmiyoruz.

### Minimum sözleşme süresi var mı?
Sürdürülebilir bir büyüme yapısı kurmak için minimum 3 aylık bir çalışma periyodu öneriyoruz.

---

## Hemen Başlayalım

E-ticaret operasyonunuzu [Hizmetler](/hizmetler) sayfamızdaki diğer çözümlerle birleştirerek bütüncül bir büyüme yakalayabilirsiniz. Markanızın potansiyelini ortaya çıkarmak için [İletişim](/iletisim) sayfasından bize ulaşın veya aşağıdaki butondan ücretsiz analiz talep edin.`,
                cta_overrides: {
                    "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
                    "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
                    "book-call": { "isEnabled": false }
                },
                process: [
                    { "title": "Analiz", "desc": "Mevcut durum ve veri analizi" },
                    { "title": "Strateji", "desc": "Büyüme yol haritası belirleme" },
                    { "title": "Uygulama Planı", "desc": "Kampanya ve site düzenlemeleri" },
                    { "title": "Optimizasyon", "desc": "Sürekli test ve iyileştirme" },
                    { "title": "Raporlama", "desc": "Şeffaf sonuç ve aksiyonlar" }
                ],
                benefits: [
                    { "title": "Kârlılık Odaklı Büyüme", "desc": "Ciro ile birlikte kârı artıran stratejiler" },
                    { "title": "Stratejik Yönetim", "desc": "Ürün, fiyat ve kategori kurgusu" },
                    { "title": "Kampanya & CRM", "desc": "Sadakat ve tekrar satış planı" },
                    { "title": "Şeffaf Raporlama", "desc": "Veriye dayalı net yol haritası" }
                ],
                faq: [
                    { "question": "E-ticaret danışmanlığı ile reklam yönetimi arasındaki fark nedir?", "answer": "Reklam yönetimi sadece trafiği getirir; e-ticaret danışmanlığı ise gelen trafiğin satışa dönmesini, kârlılığı ve marka sadakatini yönetir." },
                    { "question": "Hangi altyapılarla çalışıyorsunuz?", "answer": "Shopify, WooCommerce, Ticimax, İdeasoft ve T-Soft başta olmak üzere global ve yerel birçok altyapıda deneyimliyiz." },
                    { "question": "Raporlama süreçleri nasıldır?", "answer": "Haftalık yazılı raporlar ve aylık online strateji toplantıları ile ilerliyoruz. Şeffaflık bizim için esastır." },
                    { "question": "Sonuçları ne zaman görmeye başlarız?", "answer": "Teknik iyileştirmelerin etkisi 2-4 hafta içinde, stratejik büyüme etkileri ise genellikle 2. aydan itibaren netleşmeye başlar." },
                    { "question": "Satış garantisi veriyor musunuz?", "answer": "Ticarete etki eden (ürün, fiyat, pazar) birçok değişken olduğu için satış garantisi vermek gerçekçi değildir. Ancak performans artışı ve dönüşüm optimizasyonu garantisi veriyoruz." },
                    { "question": "Ekibinizde yazılımcı var mı?", "answer": "Evet, basit kod düzenlemeleri ve tracking (takip) kurulumları için teknik ekibimiz sürece dahildir." },
                    { "question": "Kargo ve lojistik süreçlerine karışıyor musunuz?", "answer": "Operasyonel danışmanlık kapsamında kargo entegrasyonları ve süreç iyileştirme önerileri sunuyoruz ancak fiziksel lojistiği yönetmiyoruz." },
                    { "question": "Minimum sözleşme süresi var mı?", "answer": "Sürdürülebilir bir büyüme yapısı kurmak için minimum 3 aylık bir çalışma periyodu öneriyoruz." }
                ]
            },

            {
                slug: 'sosyal-medya-yonetimi-icerik-planlama',
                title: 'Sosyal Medya Yönetimi & İçerik Planlama',
                summary: 'Markanızın dijital sesini oluşturuyor, etkileşim odaklı içerik stratejileri ve topluluk yönetimiyle büyümeyi hızlandırıyoruz.',
                seo_title: 'Sosyal Medya Yönetimi & İçerik Planlama | Digma',
                seo_desc: 'Marka bilinirliğinizi artırın. Instagram, LinkedIn yönetimi, yaratıcı içerik planı ve performans raporları ile profesyonel sosyal medya ajansı hizmeti.',
                icon: 'Share2',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2574',
                content: `## Sosyal Medya Yönetimi & İçerik Planlama Nedir?

Markanızın sosyal ağlardaki (Instagram, LinkedIn, Facebook, vb.) varlığını sadece "paylaşım yapmak" olarak görmüyoruz. **Digma** olarak, markanızın hikayesini anlatan, takipçilerinizle bağ kuran ve ticari hedeflerinize hizmet eden bütüncül bir **sosyal medya yönetimi** sunuyoruz.

Takipçi sayısından çok nitelikli etkileşime ve marka sadakatine odaklanıyoruz.

---

## Neleri Birlikte İyileştiriyoruz?

Rastgele içerik paylaşımı yerine, veriye ve stratejiye dayalı bir akış kuruyoruz.

- **Marka Bilinirliği:** Hedef kitlenizin zihninde doğru konumlandırma.
- **Etkileşim (Engagement):** Beğeni, yorum ve kaydetmelerle yaşayan bir topluluk.
- **Kurumsal İmaj:** Tutarlı görsel dil ve ton (Tone of Voice) ile güven inşası.

---

## Hizmet Kapsamı

### 1) Hesap Kurulumu ve Optimizasyonu
Profil bilgilerinin, biyografinin ve öne çıkanların (Highlights) SEO ve marka kimliğine uygun düzenlenmesi.

### 2) Rakip ve Sektör Analizi
Rakiplerin stratejilerini inceleyerek markanız için fırsat alanlarının belirlenmesi.

### 3) Aylık İçerik Takvimi
Özel günler ve kampanya dönemlerini içeren, bir ay önceden planlanmış içerik akışı.

### 4) Kreatif Yönlendirme (Brief)
Tasarım ve video içerikleri için görsel dünyaya uygun, net brieflerin oluşturulması.

### 5) Metin Yazarlığı (Copywriting)
Marka diline uygun, harekete geçirici (CTA) ve etkileyici gönderi metinlerinin yazılması.

### 6) Topluluk Yönetimi
Gelen yorum ve mesajlara (DM) marka diliyle, belirlenen sürelerde dönüş yapılması.

### 7) Dönemsel Kampanya Kurgusu
Çekiliş, yarışma veya lansman gibi özel dönemlerin kurgulanması ve yönetimi.

### 8) Performans Raporlama
Ay sonunda erişim, etkileşim ve büyüme verilerinin şeffaf grafiklerle sunulması.

---

## Süreç Nasıl İşliyor?

1. **Brief & Analiz:** Hedef kitlenizi, marka kimliğinizi ve beklentilerinizi anlıyoruz.
2. **Strateji & Dil:** Size özel iletişim dilini (Tone of Voice) ve görsel stratejiyi belirliyoruz.
3. **İçerik Planı:** Aylık takvimi hazırlayıp ay başında onayınıza sunuyoruz.
4. **Üretim & Yayın:** Onaylanan içerikleri (Post, Reels, Story) en doğru saatlerde paylaşıyoruz.
5. **Rapor & Optimizasyon:** Ay sonu verileri analiz edip bir sonraki ayın stratejisini geliştiriyoruz.

---

## Paketler

İhtiyacınıza göre şekillenen esnek çözümler sunuyoruz.

### Başlangıç
- Haftalık 3 Paylaşım
- Temel Moderasyon
- Aylık Özet Rapor

### Büyüme (Önerilen)
- Haftalık 5 Paylaşım
- Reels Odaklı Strateji
- Reklam Desteği Opsiyonu

### Premium
- Günlük Paylaşım
- Kapsamlı Topluluk Yönetimi
- Çekim/Prodüksiyon Desteği

---

## Kimler İçin Uygun?

- Sosyal medyada aktif olmak isteyen ama **vakti olmayanlar**.
- Kurumsal kimliğini dijitale **profesyonelce** taşımak isteyenler.
- Etkileşim ve takipçi artışı hedefleyen **büyüme odaklı** markalar.
- Düzenli ve sürdürülebilir bir **içerik akışı** kurmak isteyenler.

---

## Sık Sorulan Sorular

### Hangi platformları yönetiyorsunuz?
Başta Instagram, LinkedIn, Facebook ve X (Twitter) olmak üzere, markanızın ihtiyacına göre TikTok ve YouTube stratejileri de geliştiriyoruz.

### İçerikleri (Fotoğraf/Video) kim üretiyor?
Kreatif stratejiyi ve briefleri biz hazırlıyoruz. Görsel üretim için dilerseniz sizin materyallerinizi kullanıyor, dilerseniz de çözüm ortaklarımızla (tasarım/video) profesyonel üretim desteği sağlıyoruz.

### Yorumlara ve mesajlara cevap veriyor musunuz?
Evet, "Topluluk Yönetimi" kapsamında gelen etkileşimlere sizin belirlediğiniz sınırlar ve dil çerçevesinde yanıt veriyoruz.

### Takipçi satın alıyor musunuz?
Hayır. Digma olarak organik ve gerçek büyümeyi savunuyoruz. Bot takipçi veya yapay etkileşim yöntemlerini asla **kullanmıyoruz**.

### Reklam yönetimi dahil mi?
Sosyal medya yönetimi (organik büyüme) ile reklam yönetimi (paid ads) ayrı hizmetlerdir ancak bütüncül bir strateji için birlikte yürütülmesi önerilir.

### Onaylamadığım içerik paylaşılır mı?
Asla. Tüm içerikler aylık takvim halinde önceden onayınıza sunulur; revizeleriniz yapıldıktan sonra planlanır.

### Şifrelerimizi vermemiz gerekiyor mu?
Hesap kurulumu ve Business Manager yetkilendirmeleri için başlangıçta bazı erişimlere ihtiyacımız olabilir; sonrasında çoğu işlemi yetki atamasıyla (partner access) yürütüyüz.

### Sözleşme süresi nedir?
Sosyal medya yaşayan bir süreçtir. Marka dilinin oturması ve kitlenin tepki vermesi için minimum 3 aylık çalışma öneriyoruz.

---

## Hemen Başlayalım

Markanızın sosyal medyadaki sesini güçlendirmek için [Hizmetler](/hizmetler) sayfamızdaki diğer çözümlerle entegre bir yapı kurabilirsiniz. Detaylı bilgi almak için [İletişim](/iletisim) sayfasından bize yazın veya aşağıdaki butondan ücretsiz analiz talep edin.`,
                cta_overrides: {
                    "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
                    "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
                    "book-call": { "isEnabled": false }
                },
                process: [
                    { "title": "Brief & Analiz", "desc": "Hedef kitle ve marka tanıma" },
                    { "title": "Strateji & Dil", "desc": "Yol haritası belirleme" },
                    { "title": "İçerik Planı", "desc": "Aylık takvim onayı" },
                    { "title": "Üretim & Yayın", "desc": "Paylaşım süreci" },
                    { "title": "Rapor & Optimizasyon", "desc": "Veri analizi" }
                ],
                benefits: [
                    { "title": "Marka Dili", "desc": "Kurumsal ve tutarlı iletişim" },
                    { "title": "Düzenli Takvim", "desc": "Zamanlı ve onaylı akış" },
                    { "title": "Reels & Story", "desc": "Trendlere uygun formatlar" },
                    { "title": "Şeffaf Rapor", "desc": "Net büyüme verileri" }
                ],
                faq: [
                    { "question": "Hangi platformları yönetiyorsunuz?", "answer": "Başta Instagram, LinkedIn, Facebook ve X (Twitter) olmak üzere, markanızın ihtiyacına göre TikTok ve YouTube stratejileri de geliştiriyoruz." },
                    { "question": "İçerikleri (Fotoğraf/Video) kim üretiyor?", "answer": "Kreatif stratejiyi ve briefleri biz hazırlıyoruz. Görsel üretim için dilerseniz sizin materyallerinizi kullanıyor, dilerseniz de çözüm ortaklarımızla (tasarım/video) profesyonel üretim desteği sağlıyoruz." },
                    { "question": "Yorumlara ve mesajlara cevap veriyor musunuz?", "answer": "Evet, 'Topluluk Yönetimi' kapsamında gelen etkileşimlere sizin belirlediğiniz sınırlar ve dil çerçevesinde yanıt veriyoruz." },
                    { "question": "Takipçi satın alıyor musunuz?", "answer": "Hayır. Digma olarak organik ve gerçek büyümeyi savunuyoruz. Bot takipçi veya yapay etkileşim yöntemlerini asla kullanmıyoruz." },
                    { "question": "Reklam yönetimi dahil mi?", "answer": "Sosyal medya yönetimi (organik büyüme) ile reklam yönetimi (paid ads) ayrı hizmetlerdir ancak bütüncül bir strateji için birlikte yürütülmesi önerilir." },
                    { "question": "Onaylamadığım içerik paylaşılır mı?", "answer": "Asla. Tüm içerikler aylık takvim halinde önceden onayınıza sunulur; revizeleriniz yapıldıktan sonra planlanır." },
                    { "question": "Şifrelerimizi vermemiz gerekiyor mu?", "answer": "Hesap kurulumu ve Business Manager yetkilendirmeleri için başlangıçta bazı erişimlere ihtiyacımız olabilir; sonrasında çoğu işlemi yetki atamasıyla (partner access) yürütüyoruz." },
                    { "question": "Sözleşme süresi nedir?", "answer": "Sosyal medya yaşayan bir süreçtir. Marka dilinin oturması ve kitlenin tepki vermesi için minimum 3 aylık çalışma öneriyoruz." }
                ]
            },
            {
                slug: 'seo-e-posta-pazarlama-crm',
                title: 'SEO & E-posta Pazarlama (CRM)',
                summary: 'Arama motorlarında görünürlüğüzü artırırken, akıllı e-posta otomasyonlarıyla ziyaretçileri sadık müşterilere dönüştürüyoruz.',
                seo_title: 'SEO & E-posta Pazarlama (CRM) | Organik Büyüme',
                seo_desc: 'Teknik SEO, içerik optimizasyonu ve CRM otomasyonları ile satışlarınızı artırın. Google sıralamanızı yükseltin, e-posta ile sadakat yaratın.',
                icon: 'Search',
                status: 'published',
                image_url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=2074',
                content: `## SEO & E-posta Pazarlama (CRM) Nedir?

Dijital büyümenin iki güçlü ayağını birleştiriyoruz: **SEO** ile markanızı arayanlara en doğru anda görünür kılıyor, **E-posta Pazarlama (CRM)** ile bu trafiği sadık , tekrar satın alan müşterilere dönüştürüyoruz.

Digma olarak "trafik çek ve bırak" mantığıyla değil, **"trafik çek, etkileşime gir ve elde tut"** stratejisiyle çalışıyoruz. Sürdürülebilir ciro artışı için teknik optimizasyonu ve müşteri iletişimini (Retention Marketing) tek bir potada eritiyoruz.

---

## Neleri Birlikte İyileştiriyoruz?

Hem yeni müşteri kazanım maliyetlerini (CAC) düşürüyor hem de müşteri yaşam boyu değerini (LTV) artırıyoruz.

- **Organik Görünürlük:** Reklam bütçesine bağımlı kalmadan, arama motorlarından nitelikli trafik.
- **Müşteri Sadakati:** Doğru zamanda, doğru kişiye giden kişiselleştirilmiş e-postalar.
- **Dönüşüm Oranı:** Terk edilen sepetleri ve kararsız ziyaretçileri satışa döndürme.
- **Veri Hakimiyeti:** Müşteri davranışlarına göre segmente edilmiş, ölçülebilir pazarlama.

---

## SEO Çalışma Kapsamı

### 1) Teknik SEO & Site Sağlığı
Site hızı, mobil uyumluluk, tarama bütçesi (crawl budget) ve indeksleme sorunlarının giderilmesi.

### 2) Anahtar Kelime & Pazar Analizi
Sektörünüzdeki fırsat kelimeleri, rakip analizleri ve "long-tail" arama terimlerinin belirlenmesi.

### 3) Site İçi (On-Page) Optimizasyon
Başlıklar (H1-H6), meta açıklamalar, görsel alt etiketleri ve URL yapılarının düzenlenmesi.

### 4) İçerik Stratejisi
Blog ve kategori sayfaları için trafik çeken, kullanıcıyı bilgilendiren SEO uyumlu içerik planı.

### 5) Otorite İnşası (Off-Page)
Marka bilinirliğini ve domain otoritesini artıracak doğal backlink ve tanıtım stratejileri.

---

## E-posta (CRM) Çalışma Kapsamı

### 1) CRM & Veri Tabanı Yönetimi
Mevcut müşteri datanızın temizlenmesi, segmente edilmesi ve KVKK uyumlu şekilde işlenmesi.

### 2) Platform Kurulumu & Entegrasyon
Klaviyo, Mailchimp veya yerli CRM araçlarının e-ticaret altyapınıza (Shopify, Ticimax vb.) entegrasyonu.

### 3) Otomasyon (Flow) Kurguları
Manuel gönderim gerektirmeyen, kullanıcı davranışına göre tetiklenen akıllı e-posta serileri.

### 4) Kampanya (Newsletter) Yönetimi
Özel günler ve lansmanlar için tasarımlı, yüksek açılma oranlı (Open Rate) bülten gönderimi.

---

## Otomasyon Akışları (Flows)

Ziyaretçiyi müşteriye, müşteriyi müdavime dönüştüren 7 temel akış:

1.  **Hoş Geldin Serisi (Welcome):** Yeni aboneye markayı anlatır ve ilk alışverişe teşvik eder.
2.  **Terk Sepet (Abandoned Cart):** Sepette ürün bırakanları hatırlatma ve ikna etme.
3.  **Browse Abandonment:** Ürünü inceleyip sepete atmadan çıkanları yakalama.
4.  **İlk Satın Alma Sonrası (Cross-sell):** Alışveriş yapan kullanıcıya tamamlayıcı ürün önerme.
5.  **Yeniden Satın Alma (Replenishment):** Tüketilen ürünler için (örn: kahve, kozmetik) hatırlatma.
6.  **Winback (Kazanım):** Uzun süredir alışveriş yapmayan pasif müşterileri harekete geçirme.
7.  **VIP / Sadakat:** En çok harcama yapan müşterilere özel jestler ve erken erişim.

---

## Süreç Nasıl İşliyor?

1.  **Audit (Denetim):** Mevcut SEO durumunuzu ve CRM verinizi detaylıca inceliyoruz.
2.  **Strateji:** Hedeflerinize uygun teknik yol haritasını ve iletişim dilini belirliyoruz.
3.  **Teknik & İçerik Planı:** Sitedeki eksikleri gideriyor ve içerik takvimini oluşturuyoruz.
4.  **Kurulum:** E-posta otomasyonlarını ve segment yapılarını kuruyoruz.
5.  **Test & Yayına Alma:** Tüm kurguları test edip aktif hale getiriyoruz.
6.  **Rapor & İterasyon:** Aylık verilerle (Trafik, Ciro, Open Rate) stratejiyi sürekli geliştiriyoruz.

---

## Sık Sorulan Sorular

### SEO ne kadar sürede sonuç verir?
SEO uzun vadeli bir yatırımdır. Teknik düzeltmelerin etkisi hemen görülse de, gözle görülür trafik artışı genellikle 3-6. aydan itibaren başlar.

### Hangi CRM / E-posta araçlarını kullanıyorsunuz?
Başta Klaviyo ve Mailchimp olmak üzere, Insider, Setrow gibi birçok global ve yerel platformda deneyimliyiz.

### Düzenli içerik yazıyor musunuz?
Evet, SEO stratejisi kapsamında blog yazıları ve kategori metinleri, uzman içerik ekibimiz tarafından üretilir.

### E-postalar spam'e düşer mi?
Domain itibarını (sender reputation) koruyarak ve doğru segmentasyon yaparak spam riskini minimize ediyoruz.

### Mevcut datam yok, yine de e-posta pazarlama yapabilir miyim?
Evet. Site içi "lead generation" (ör: %10 indirim pop-up'ı) kurgularıyla sıfırdan nitelikli bir data havuzu oluşturmaya başlıyoruz.

### Raporlama neleri içerir?
SEO tarafında organik trafik, sıralama takibi ve teknik sağlık; CRM tarafında ise e-posta kaynaklı ciro, açılma ve tıklama oranlarını raporluyoruz.

### Sadece SEO veya sadece CRM alabilir miyim?
Tabii ki. Ancak iki hizmetin birbirini beslediği "Growth" paketimizi, verimlilik ve bütçe avantajı açısından öneriyoruz.

### E-ticaret sitem yok, kurumsal site için uygun mu?
Evet. Kurumsal firmalar için potansiyel müşteri (lead) toplama ve B2B iletişim otomasyonları kurguluyoruz.

### Google cezası almış bir sitem var, düzeltebilir misiniz?
Detaylı bir analiz (audit) sonrası ceza nedenlerini tespit edip, kurtarma (recovery) çalışmaları yapabiliyoruz.

### Otomasyonlar bir kez kurulup bırakılıyor mu?
Hayır. Kullanıcı davranışları değiştikçe otomasyonların içerikleri, zamanlamaları ve teklifleri sürekli A/B testleriyle optimize edilir.

---

## Hemen Başlayalım

Organik trafiğinizi satışa dönüştüren bu sistemi kurmak için hazır mısınız? [Hizmetler](/hizmetler) sayfamızdan diğer çözümlerimize göz atabilir, [İletişim](/iletisim) sayfasından bize ulaşabilir veya aşağıdaki butondan ücretsiz analiz talep edebilirsiniz.`,
                cta_overrides: {
                    "get-offer": { "label": "Ücretsiz Analiz Al", "href": "/#ucretsiz-analiz", "variant": "accent", "isEnabled": true },
                    "contact": { "label": "Bize Ulaşın", "href": "/iletisim", "variant": "outline", "isEnabled": true },
                    "book-call": { "isEnabled": false }
                },
                process: [
                    { "title": "Audit", "desc": "Mevcut SEO ve Veri analizi" },
                    { "title": "Strateji", "desc": "Yol haritası belirleme" },
                    { "title": "Planlama", "desc": "Teknik ve içerik takvimi" },
                    { "title": "Kurulum", "desc": "Otomasyon entegrasyonu" },
                    { "title": "Yayına Alma", "desc": "Test ve aktivasyon" },
                    { "title": "Raporlama", "desc": "Sürekli optimizasyon" }
                ],
                benefits: [
                    { "title": "Organik Büyüme", "desc": "Teknik ve içerik SEO ile trafik artışı" },
                    { "title": "Retention", "desc": "E-posta ile tekrar satın alma" },
                    { "title": "Segmentasyon", "desc": "Kişiye özel pazarlama kurguları" },
                    { "title": "Şeffaf Rapor", "desc": "Ölçülebilir sonuç ve optimizasyon" }
                ],
                faq: [
                    { "question": "SEO ne kadar sürede sonuç verir?", "answer": "SEO uzun vadeli bir yatırımdır. Teknik düzeltmelerin etkisi hemen görülse de, gözle görülür trafik artışı genellikle 3-6. aydan itibaren başlar." },
                    { "question": "Hangi CRM / E-posta araçlarını kullanıyorsunuz?", "answer": "Başta Klaviyo ve Mailchimp olmak üzere, Insider, Setrow gibi birçok global ve yerel platformda deneyimliyiz." },
                    { "question": "Düzenli içerik yazıyor musunuz?", "answer": "Evet, SEO stratejisi kapsamında blog yazıları ve kategori metinleri, uzman içerik ekibimiz tarafından üretilir." },
                    { "question": "E-postalar spam'e düşer mi?", "answer": "Domain itibarını (sender reputation) koruyarak ve doğru segmentasyon yaparak spam riskini minimize ediyoruz." },
                    { "question": "Mevcut datam yok, yine de e-posta pazarlama yapabilir miyim?", "answer": "Evet. Site içi 'lead generation' (ör: %10 indirim pop-up'ı) kurgularıyla sıfırdan nitelikli bir data havuzu oluşturmaya başlıyoruz." },
                    { "question": "Raporlama neleri içerir?", "answer": "SEO tarafında organik trafik, sıralama takibi ve teknik sağlık; CRM tarafında ise e-posta kaynaklı ciro, açılma ve tıklama oranlarını raporluyoruz." },
                    { "question": "Sadece SEO veya sadece CRM alabilir miyim?", "answer": "Tabii ki. Ancak iki hizmetin birbirini beslediği 'Growth' paketimizi, verimlilik ve bütçe avantajı açısından öneriyoruz." },
                    { "question": "E-ticaret sitem yok, kurumsal site için uygun mu?", "answer": "Evet. Kurumsal firmalar için potansiyel müşteri (lead) toplama ve B2B iletişim otomasyonları kurguluyoruz." },
                    { "question": "Google cezası almış bir sitem var, düzeltebilir misiniz?", "answer": "Detaylı bir analiz (audit) sonrası ceza nedenlerini tespit edip, kurtarma (recovery) çalışmaları yapabiliyoruz." },
                    { "question": "Otomasyonlar bir kez kurulup bırakılıyor mu?", "answer": "Hayır. Kullanıcı davranışları değiştikçe otomasyonların içerikleri, zamanlamaları ve teklifleri sürekli A/B testleriyle optimize edilir." }
                ]
            }
        ];

        let successCount = 0;
        let failCount = 0;


        for (const service of servicesToSeed) {
            try {
                // Perform Upsert (Insert or Update)
                // We use onConflict to handle duplicate slugs
                addLog(`[İŞLENİYOR] ${service.slug} ...`);

                const { error } = await supabase
                    .from('services')
                    .upsert(service, { onConflict: 'slug' });

                if (error) {
                    throw error;
                }

                addLog(`[BAŞARILI] ${service.slug} güncellendi/eklendi.`);
                successCount++;

            } catch (err: any) {
                console.error(`Error seeding ${service.slug}:`, err);
                addLog(`[HATA] ${service.slug}: ${err.message}`);
                failCount++;
            }
        }
        setLoading(false);
        addLog('TÜM İŞLEMLER TAMAMLANDI. Sayfayı yenileyip kontrol edebilirsiniz.');
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-6">Service Seeder</h1>

            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-2xl mb-6 border border-gray-700">
                <p className="mb-4 text-gray-300">
                    Aşağıdaki butona basarak eksik servisleri (Kurumsal, Dijital Pazarlama, E-Ticaret) veritabanına ekleyebilirsiniz.
                </p>
                <Button variant="accent" onClick={seedMissingServices} disabled={loading} className="w-full text-lg py-6">
                    {loading ? 'Yükleniyor...' : 'Eksik Servisleri Kur'}
                </Button>
            </div>

            <div className="w-full max-w-2xl bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-800 h-64 overflow-y-auto">
                {log.length === 0 ? (
                    <span className="text-gray-500">Loglar burada görünecek...</span>
                ) : (
                    log.map((l, i) => (
                        <div key={i} className="mb-1 border-b border-gray-800 pb-1 last:border-0">{l}</div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SetupServices;
