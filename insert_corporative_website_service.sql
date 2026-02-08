-- Insert Corporate Website Service
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
    cta_overrides
) VALUES (
    'kurumsal-web-sitesi',
    'Kurumsal Web Sitesi Tasarım & Yayına Alma',
    'Marka kimliğinize uygun, hızlı açılan ve SEO altyapılı kurumsal web sitesi. Yayına hazır teslim.',
    '## Kurumsal Web Sitesi Tasarım & Yayına Alma Nedir?

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
İlk yayına alma sonrası kısa süreli teknik kontrol ve gerekli küçük düzeltmeler sağlanır.',
    'Monitor', -- Lucide Icon
    'published',
    'Kurumsal Web Sitesi Tasarımı | Digma',
    'Ajans ve marka imajınıza uygun kurumsal web sitesi tasarlıyor, hızlı ve mobil uyumlu şekilde yayına alıyoruz. SEO altyapısı, içerik yapısı ve dönüşüm odaklı sayfalar.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426', -- Placeholder Premium Image
    '{"book-call": {"isEnabled": false}}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    content = EXCLUDED.content,
    cta_overrides = EXCLUDED.cta_overrides,
    seo_title = EXCLUDED.seo_title,
    seo_desc = EXCLUDED.seo_desc;
