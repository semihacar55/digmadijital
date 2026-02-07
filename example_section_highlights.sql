-- Example data for section headings with highlights
-- Run this after adding the new columns

-- Services section
UPDATE homepage_sections 
SET 
    section_title = 'Dijital Büyüme Hizmetlerimiz',
    section_highlight = 'Dijital Büyüme',
    section_subtitle = 'Markanızın dijital dünyada büyümesi için ihtiyaç duyduğunuz tüm çözümleri tek çatı altında sunuyoruz.'
WHERE section_key = 'services';

-- Why Digma section
UPDATE homepage_sections 
SET 
    section_title = 'Neden Digma?',
    section_highlight = 'Digma',
    section_subtitle = 'Veri odaklı stratejilerle markanızı büyütüyoruz.'
WHERE section_key = 'why_digma';

-- How it works section
UPDATE homepage_sections 
SET 
    section_title = 'Nasıl Çalışırız?',
    section_highlight = 'Çalışırız',
    section_subtitle = '4 adımda markanızı büyütüyoruz.'
WHERE section_key = 'how_it_works';

-- Case Studies section
UPDATE homepage_sections 
SET 
    section_title = 'Başarı Hikayeleri',
    section_highlight = 'Başarı',
    section_subtitle = 'Müşterilerimiz için yarattığımız değer.'
WHERE section_key = 'case_studies';

-- Testimonials section
UPDATE homepage_sections 
SET 
    section_title = 'Müşteri Yorumları',
    section_highlight = 'Yorumları',
    section_subtitle = null
WHERE section_key = 'testimonials';

-- Blog section
UPDATE homepage_sections 
SET 
    section_title = 'Dijital Rehber',
    section_highlight = 'Dijital',
    section_subtitle = null
WHERE section_key = 'blog';

-- Final CTA section
UPDATE homepage_sections 
SET 
    section_title = 'Ücretsiz Analiz Alın',
    section_highlight = 'Ücretsiz',
    section_subtitle = 'Markanızın dijital potansiyelini keşfedin.'
WHERE section_key = 'final_cta';
