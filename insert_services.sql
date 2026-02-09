
-- Insert 6 default services if they don't exist
INSERT INTO public.services (title, slug, summary, icon, sort_order, status)
VALUES
  ('Meta & Google Ads', 'performance-ads', 'Veri odaklı performans yönetimi ile reklam getirilerinizi maksimize edin.', 'BarChart2', 1, 'published'),
  ('SEO Stratejileri', 'seo', 'Teknik ve içerik optimizasyonu ile organik trafikte kalıcı artış sağlayın.', 'Search', 2, 'published'),
  ('Sosyal Medya Yönetimi', 'social-media', 'Marka bilinirliğini artıran, etkileşim odaklı içerik stratejileri.', 'Share2', 3, 'published'),
  ('Kreatif & Tasarım', 'creative', 'Dönüşüm odaklı reklam görselleri ve kullanıcı dostu arayüzler.', 'PenTool', 4, 'published'),
  ('CRO & Optimizasyon', 'cro', 'Web sitenizin ziyaretçi-müşteri dönüşüm oranlarını bilimsel testlerle artırın.', 'TrendingUp', 5, 'published'),
  ('Analytics & Tracking', 'analytics', 'GA4, GTM ve Pixel kurulumlarıyla her veriyi doğru ölçümleyin.', 'PieChart', 6, 'published')
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  status = EXCLUDED.status;
