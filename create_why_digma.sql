-- Add image columns to homepage_sections if they don't exist
ALTER TABLE public.homepage_sections 
ADD COLUMN IF NOT EXISTS image1_url TEXT,
ADD COLUMN IF NOT EXISTS image1_alt TEXT,
ADD COLUMN IF NOT EXISTS image2_url TEXT,
ADD COLUMN IF NOT EXISTS image2_alt TEXT;

-- Create homepage_why_digma_items table
CREATE TABLE IF NOT EXISTS public.homepage_why_digma_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_key TEXT NOT NULL DEFAULT 'why_digma', -- Foreign key reference logic to section key
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    icon TEXT, -- Lucide icon name
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for items
ALTER TABLE public.homepage_why_digma_items ENABLE ROW LEVEL SECURITY;

-- Public can read items
DROP POLICY IF EXISTS "Public can view why digma items" ON public.homepage_why_digma_items;
CREATE POLICY "Public can view why digma items"
    ON public.homepage_why_digma_items FOR SELECT
    USING (true);

-- Authenticated users can manage items
DROP POLICY IF EXISTS "Authenticated users can manage why digma items" ON public.homepage_why_digma_items;
CREATE POLICY "Authenticated users can manage why digma items"
    ON public.homepage_why_digma_items FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Insert/Update the 'why_digma' section in homepage_sections
INSERT INTO public.homepage_sections (section_key, title, description, order_index, is_enabled)
VALUES (
    'why_digma', 
    'Neden Digma?', 
    'Veri odaklı yaklaşımımız ve şeffaf süreçlerimizle fark yaratıyoruz.', 
    25, -- Adjust order index as needed, putting it somewhere in the middle
    true
)
ON CONFLICT (section_key) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- Seed items for Why Digma
INSERT INTO public.homepage_why_digma_items (section_key, title, text, icon, sort_order)
VALUES 
    ('why_digma', 'Şeffaf Raporlama', 'Her kuruşun nereye gittiğini ve ne getirdiğini panelinizden canlı izleyin.', 'BarChart3', 1),
    ('why_digma', 'Kârlılık Odaklılık', 'Sadece tıklama değil, gerçek satış ve ROI (Yatırım Getirisi) odaklı çalışıyoruz.', 'TrendingUp', 2),
    ('why_digma', 'Test Kültürü', 'A/B testleri ile sürekli optimize ediyor, en iyi performansı yakalayana kadar durmuyoruz.', 'FlaskConical', 3);
