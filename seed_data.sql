-- 1. Create posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    cover_image TEXT,
    category TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    author_id UUID REFERENCES auth.users(id),
    
    -- SEO Fields
    seo_title TEXT,
    seo_desc TEXT,
    focus_keyword TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,
    
    -- Stats
    views_count INTEGER DEFAULT 0
);

-- 2. Enable Row Level Security (if not already enabled)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies (dropping existing ones first to avoid errors)
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can do everything" ON posts;
CREATE POLICY "Authenticated users can do everything" 
ON posts FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 4. Create Indexes
DROP INDEX IF EXISTS idx_posts_slug;
CREATE INDEX idx_posts_slug ON posts(slug);

DROP INDEX IF EXISTS idx_posts_status;
CREATE INDEX idx_posts_status ON posts(status);

-- 5. Insert Seed Data
INSERT INTO posts (title, slug, summary, content, cover_image, category, tags, status, published_at, author_id, seo_title, seo_desc, focus_keyword, is_indexable)
VALUES 
(
    '2024 Dijital Pazarlama Trendleri: Geleceği Yakalayın', 
    '2024-dijital-pazarlama-trendleri', 
    'Yapay zeka, video içerikler ve kişiselleştirme... 2024 yılında dijital pazarlamayı şekillendirecek en önemli 5 trendi inceledik.',
    '# 2024 Dijital Pazarlama Trendleri

Dijital pazarlama dünyası her geçen gün değişiyor ve gelişiyor. Rekabetin arttığı bu ortamda öne çıkmak için yenilikleri takip etmek şart. İşte 2024 yılında markanızın büyümesine katkı sağlayacak en önemli trendler:

## 1. Yapay Zeka (AI) Destekli Pazarlama
Yapay zeka, sadece operasyonel süreçleri hızlandırmakla kalmıyor, aynı zamanda kullanıcı davranışlarını analiz ederek daha doğru hedeflemeler yapılmasını sağlıyor. Chatbotlar, kişiselleştirilmiş ürün önerileri ve otomatik içerik oluşturma araçları, pazarlamanın vazgeçilmez bir parçası haline geldi.

## 2. Kısa Video İçeriklerin Yükselişi
TikTok, Instagram Reels ve YouTube Shorts gibi platformların popülaritesi artmaya devam ediyor. Kullanıcıların dikkat süresinin kısaldığı günümüzde, markaların mesajlarını 60 saniyenin altında, etkileyici bir şekilde vermesi gerekiyor.

## 3. Sesli Arama Optimizasyonu (Voice Search SEO)
Akıllı asistanların kullanımı arttıkça, sesli aramalar da önem kazanıyor. İçeriklerinizi konuşma diline uygun, soru-cevap formatında optimize etmek, SEO stratejinizin önemli bir parçası olmalı.

## 4. Hiper-Kişiselleştirme
Standart e-posta pazarlaması artık yeterli değil. Kullanıcıların geçmiş etkileşimlerine, alışveriş alışkanlıklarına ve tercihlerine dayalı, birebir kişiselleştirilmiş deneyimler sunmak, dönüşüm oranlarını artırmanın anahtarı.

## 5. Sürdürülebilirlik ve Şeffaflık
Tüketiciler artık satın aldıkları markaların değerlerine de önem veriyor. Çevre dostu uygulamalarınızı ve şeffaf iş süreçlerinizi vurgulamak, marka sadakati oluşturmada büyük rol oynuyor.

---
Dijital pazarlama stratejinizi güncellemek ve bu trendleri işinize entegre etmek için bizimle iletişime geçebilirsiniz.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    'Pazarlama',
    ARRAY['dijital pazarlama', 'trendler', 'yapay zeka', 'seo'],
    'published',
    NOW(),
    (SELECT id FROM auth.users LIMIT 1),
    '2024 Dijital Pazarlama Trendleri | Digma Blog',
    '2024 yılında öne çıkan dijital pazarlama trendlerini keşfedin. Yapay zeka, video içerikler ve daha fazlası ile rekabette bir adım öne geçin.',
    'dijital pazarlama trendleri',
    true
),
(
    'Modern Web Tasarımında Minimalizm Neden Önemli?',
    'modern-web-tasariminda-minimalizm',
    'Karmaşadan uzak, kullanıcı odaklı ve hızlı web siteleri... Minimalist tasarımın markanıza ve kullanıcı deneyimine (UX) katkılarını keşfedin.',
    '# Modern Web Tasarımında Minimalizm

"Az çoktur" (Less is more) felsefesi, web tasarımında hiç olmadığı kadar geçerli. Kullanıcıların bilgiye en hızlı şekilde ulaşmak istediği günümüzde, minimalist tasarım sadece estetik bir tercih değil, aynı zamanda işlevsel bir gereklilik.

## Neden Minimalizm?

### 1. Daha Hızlı Yüklenme Süreleri
Gereksiz grafikler, ağır animasyonlar ve karmaşık kod yapıları sitenizi yavaşlatır. Minimalist tasarım, sadece gerekli öğeleri kullanarak sayfa boyutunu küçültür ve yüklenme hızını artırır. Bu da hem kullanıcı deneyimi hem de SEO için kritiktir.

### 2. Odaklanmış Kullanıcı Deneyimi
Karmaşık bir arayüz, kullanıcının dikkatini dağıtır. Minimalist tasarımda ise beyaz boşluklar (white space) etkili bir şekilde kullanılarak, kullanıcının odaklanması gereken içerik ve eylem çağrıları (CTA) ön plana çıkarılır.

### 3. Mobil Uyumluluk
Minimalist arayüzler, küçük ekranlara çok daha kolay uyarlanır. Responsive tasarımın temel taşlarından biri olan sadelik, mobil kullanıcıların sitenizde rahatça gezinmesini sağlar.

### 4. Profesyonel ve Güvenilir İmaj
Sade, temiz ve düzenli bir web sitesi, markanızın profesyonel ve güvenilir olduğu algısını yaratır. Karmaşa ise amatörlük ve güvensizlik hissi uyandırabilir.

## Minimalist Tasarım İçin İpuçları
*   **Renk Paleti:** Sınırlı sayıda renk kullanın.
*   **Tipografi:** Okunaklı ve modern fontları tercih edin.
*   **Görseller:** Sadece içeriği destekleyen, yüksek kaliteli görseller kullanın.
*   **Boşluklar:** İçerikler arasında yeterli boşluk bırakmaktan korkmayın.

Digma olarak, web tasarım projelerimizde estetik ve işlevselliği birleştirerek, markanızı en iyi yansıtan minimalist çözümler sunuyoruz.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop',
    'Tasarım',
    ARRAY['web tasarım', 'minimalizm', 'ux', 'kullanıcı deneyimi'],
    'published',
    NOW() - INTERVAL '2 days',
    (SELECT id FROM auth.users LIMIT 1),
    'Modern Web Tasarımında Minimalizm | Digma Tasarım',
    'Minimalist web tasarımının avantajlarını ve markanıza katkılarını öğrenin. Hız, odak ve mobil uyumluluk için modern tasarım ipuçları.',
    'minimalist web tasarım',
    true
),
(
    'SEO 101: Arama Motorlarında Nasıl Üst Sıralara Çıkılır?',
    'seo-101-arama-motorlarinda-ust-siralar',
    'Web sitenizin görünürlüğünü artırmak için bilmeniz gereken temel SEO stratejileri. Anahtar kelimelerden teknik optimizasyona başlangıç rehberi.',
    '# SEO 101: Başlangıç Rehberi

Harika bir web siteniz olabilir, ancak kimse onu bulamıyorsa bir anlamı yoktur. İşte burada Arama Motoru Optimizasyonu (SEO) devreye giriyor. Peki, Google''da üst sıralara çıkmak için nereden başlamalısınız?

## 1. Doğru Anahtar Kelimeleri Seçin
Hedef kitlenizin hangi kelimeleri arattığını anlamak, SEO''nun temelidir. Google Keyword Planner veya SEMrush gibi araçlarla, rekabeti düşük ama arama hacmi yüksek kelimeleri belirleyin.

## 2. Kaliteli ve Özgün İçerik Üretin
"İçerik Kraldır" sözü hala geçerli. Kullanıcıların sorularına cevap veren, bilgilendirici ve özgün içerikler, arama motorları tarafından ödüllendirilir. Blog yazıları, rehberler ve vaka analizleri ile sitenizi güncel tutun.

## 3. Teknik SEO''yu İhmal Etmeyin
Sitenizin altyapısı da içerik kadar önemlidir.
*   **Site Hızı:** Sayfalarınızın hızlı yüklenmesini sağlayın.
*   **Mobil Uyumluluk:** Sitenizin mobil cihazlarda kusursuz çalıştığından emin olun.
*   **SSL Sertifikası:** Güvenli bağlantı (HTTPS) kullanın.

## 4. Backlink Stratejisi
Başka güvenilir sitelerden sizin sitenize verilen linkler (backlink), Google''ın gözünde otoritenizi artırır. Ancak dikkatli olun, kalitesiz ve spam linkler sitenize zarar verebilir.

## 5. Sayfa İçi Optimizasyon (On-Page SEO)
*   Başlık etiketlerinde (H1, H2) anahtar kelimelerinizi geçirin.
*   Görsellerinize alt etiketler ekleyin.
*   Meta açıklamalarını (meta description) ilgi çekici yazın.
*   URL yapınızı kısa ve anlaşılır tutun.

SEO uzun vadeli bir çalışmadır. Sabırlı olun, stratejilerinizi düzenli olarak analiz edin ve güncelleyin.',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674&auto=format&fit=crop',
    'Teknoloji',
    ARRAY['seo', 'arama motoru optimizasyonu', 'google', 'dijital pazarlama'],
    'published',
    NOW() - INTERVAL '5 days',
    (SELECT id FROM auth.users LIMIT 1),
    'SEO 101: Arama Motoru Optimizasyonu Rehberi | Digma',
    'SEO nedir ve nasıl yapılır? Web sitenizi Google''da üst sıralara taşımak için temel SEO stratejileri ve ipuçları bu rehberde.',
    'seo nedir',
    true
);
