-- Create homepage_logos table
CREATE TABLE IF NOT EXISTS public.homepage_logos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    link_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.homepage_logos ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public can view homepage logos" ON public.homepage_logos;
CREATE POLICY "Public can view homepage logos"
    ON public.homepage_logos FOR SELECT
    USING (is_enabled = true);

DROP POLICY IF EXISTS "Authenticated users can manage homepage logos" ON public.homepage_logos;
CREATE POLICY "Authenticated users can manage homepage logos"
    ON public.homepage_logos FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_homepage_logos_sort ON homepage_logos(sort_order);

-- Seed Data (Using placeholder images that look professional)
INSERT INTO public.homepage_logos (name, logo_url, alt_text, sort_order)
VALUES 
    ('NovaCommerce', 'https://placehold.co/180x60/222/FFF.png?text=NovaCommerce&font=playfair', 'NovaCommerce Logo', 1),
    ('PeakLabs', 'https://placehold.co/180x60/222/FFF.png?text=PeakLabs&font=montserrat', 'PeakLabs Logo', 2),
    ('GlobalFlow', 'https://placehold.co/180x60/222/FFF.png?text=GlobalFlow&font=roboto', 'GlobalFlow Logo', 3),
    ('AlphaWave', 'https://placehold.co/180x60/222/FFF.png?text=AlphaWave&font=oswald', 'AlphaWave Logo', 4),
    ('DataCore', 'https://placehold.co/180x60/222/FFF.png?text=DataCore&font=lato', 'DataCore Logo', 5),
    ('SkyLine', 'https://placehold.co/180x60/222/FFF.png?text=SkyLine&font=merriweather', 'SkyLine Logo', 6),
    ('FutureTech', 'https://placehold.co/180x60/222/FFF.png?text=FutureTech&font=open+sans', 'FutureTech Logo', 7),
    ('UrbanStyle', 'https://placehold.co/180x60/222/FFF.png?text=UrbanStyle&font=raleway', 'UrbanStyle Logo', 8);
