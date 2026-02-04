-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    cover_image TEXT,
    client_name TEXT,
    client_visible BOOLEAN DEFAULT true,
    sector TEXT,
    services TEXT[], -- Array of service names or IDs
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    
    -- Content Blocks
    problem TEXT,
    solution TEXT,
    results JSONB DEFAULT '[]'::jsonb, -- Array of { value, unit, label }
    process_steps JSONB DEFAULT '[]'::jsonb, -- Array of strings
    gallery TEXT[] DEFAULT '{}',
    testimonial JSONB DEFAULT '{}'::jsonb, -- { name, company, quote, avatar }
    
    -- SEO
    seo_title TEXT,
    seo_desc TEXT,
    og_image TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,

    -- Meta
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public case studies are viewable by everyone" ON case_studies;
CREATE POLICY "Public case studies are viewable by everyone" 
ON case_studies FOR SELECT 
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can do everything" ON case_studies;
CREATE POLICY "Authenticated users can do everything" 
ON case_studies FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_status ON case_studies(status);
