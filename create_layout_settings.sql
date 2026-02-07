-- Create layout_settings table for Header & Footer management
-- This is a singleton table (only one row with id=1)

CREATE TABLE IF NOT EXISTS layout_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Singleton constraint
  
  -- Header Settings
  header_logo_url TEXT,
  header_logo_alt TEXT DEFAULT 'Digma Logo',
  favicon_url TEXT,
  header_menu JSONB DEFAULT '[]'::jsonb,
  header_cta_label TEXT DEFAULT 'Ücretsiz Analiz Al',
  header_cta_href TEXT DEFAULT '/#ucretsiz-analiz',
  header_cta_enabled BOOLEAN DEFAULT true,
  
  -- Footer Settings
  footer_columns JSONB DEFAULT '[]'::jsonb,
  footer_socials JSONB DEFAULT '[]'::jsonb,
  footer_contact JSONB DEFAULT '{}'::jsonb,
  footer_copyright TEXT DEFAULT 'Digma Dijital. Tüm hakları saklıdır.',
  footer_enabled BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row with current hardcoded values
INSERT INTO layout_settings (
  id,
  header_menu,
  footer_columns,
  footer_socials,
  footer_contact
) VALUES (
  1,
  '[
    {"label": "Hizmetler", "href": "/hizmetler", "enabled": true, "order": 1, "isExternal": false},
    {"label": "Vaka Çalışmaları", "href": "/vaka-calismalari", "enabled": true, "order": 2, "isExternal": false},
    {"label": "Hakkımızda", "href": "/hakkimizda", "enabled": true, "order": 3, "isExternal": false},
    {"label": "Blog", "href": "/blog", "enabled": true, "order": 4, "isExternal": false},
    {"label": "İletişim", "href": "/iletisim", "enabled": true, "order": 5, "isExternal": false}
  ]'::jsonb,
  '[
    {
      "title": "Hızlı Erişim",
      "links": [
        {"label": "Hizmetlerimiz", "href": "/hizmetler"},
        {"label": "Başarı Hikayeleri", "href": "/vaka-calismalari"},
        {"label": "Hakkımızda", "href": "/hakkimizda"},
        {"label": "Blog & Rehber", "href": "/blog"}
      ]
    },
    {
      "title": "Hizmetler",
      "links": [
        {"label": "Google Ads & SEO", "href": "#"},
        {"label": "Sosyal Medya Yönetimi", "href": "#"},
        {"label": "Kreatif & Tasarım", "href": "#"},
        {"label": "Web & E-ticaret", "href": "#"}
      ]
    }
  ]'::jsonb,
  '[
    {"platform": "instagram", "url": "#"},
    {"platform": "linkedin", "url": "#"},
    {"platform": "twitter", "url": "#"}
  ]'::jsonb,
  '{
    "address": "Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul",
    "phone": "+90 (212) 555 00 00",
    "email": "merhaba@digma.com"
  }'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE layout_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read layout settings" ON layout_settings;
DROP POLICY IF EXISTS "Admin can update layout settings" ON layout_settings;

-- Public read access (anyone can view)
CREATE POLICY "Public can read layout settings"
  ON layout_settings FOR SELECT
  TO public
  USING (true);

-- Authenticated users can update (admin only in practice)
CREATE POLICY "Admin can update layout settings"
  ON layout_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_layout_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_layout_settings_updated_at ON layout_settings;
CREATE TRIGGER update_layout_settings_updated_at
  BEFORE UPDATE ON layout_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_layout_settings_updated_at();
