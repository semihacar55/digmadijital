
-- Insert 'services' page if it doesn't exist
INSERT INTO public.pages (
    page_key, 
    title, 
    slug, 
    hero_title, 
    hero_subtitle, 
    content_markdown, 
    seo_title, 
    seo_description
)
VALUES (
    'services',
    'Hizmetlerimiz',
    'hizmetlerimiz',
    'Misyonumuz',
    'İşletmenizi dijital dünyada bir adım öne taşıyoruz',
    'Müşterilerimizin büyümesi, bizim en büyük motivasyon kaynağımızdır. Veri odaklı stratejiler ve yaratıcı çözümlerle işinizi büyütüyoruz. Şeffaflık, sonuç odaklılık ve sürekli gelişim ilkeleriyle hareket ediyoruz.',
    'Hizmetlerimiz | Digma Dijital',
    'Dijital pazarlama, SEO, Sosyal Medya ve Web Tasarım hizmetleri.'
)
ON CONFLICT (page_key) DO NOTHING;
