-- Create pages table for About and Contact page management
-- Single table approach for flexibility

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT UNIQUE NOT NULL, -- 'about' or 'contact'
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- Hero section
  hero_title TEXT,
  hero_subtitle TEXT,
  
  -- Content
  content_markdown TEXT,
  
  -- Contact-specific fields (NULL for about page)
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  contact_map_url TEXT,
  contact_form_enabled BOOLEAN DEFAULT true,
  contact_form_to_email TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image_url TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default pages with current hardcoded values
INSERT INTO pages (
  page_key, 
  title, 
  slug, 
  hero_title, 
  hero_subtitle, 
  content_markdown,
  contact_email,
  contact_phone,
  contact_address,
  contact_form_enabled,
  contact_form_to_email,
  seo_title,
  seo_description
) VALUES
(
  'about',
  'Hakkımızda',
  'hakkimizda',
  'Hakkımızda',
  'Dijital dünyada markanızı büyütüyoruz',
  'Ajans hikayesi burada olacak.',
  NULL,
  NULL,
  NULL,
  NULL,
  NULL,
  'Hakkımızda | Digma Dijital',
  'Digma Dijital hakkında bilgi edinin'
),
(
  'contact',
  'İletişim',
  'iletisim',
  'İletişim',
  'Bizimle iletişime geçin',
  'Projeleriniz için bizimle iletişime geçebilirsiniz.',
  'merhaba@digma.com',
  '+90 (212) 555 00 00',
  'Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul',
  true,
  'merhaba@digma.com',
  'İletişim | Digma Dijital',
  'Digma Dijital ile iletişime geçin'
)
ON CONFLICT (page_key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read pages" ON pages;
DROP POLICY IF EXISTS "Admin can update pages" ON pages;

-- Public read access (anyone can view)
CREATE POLICY "Public can read pages"
  ON pages FOR SELECT
  TO public
  USING (true);

-- Authenticated users can update (admin only in practice)
CREATE POLICY "Admin can update pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_pages_updated_at();
