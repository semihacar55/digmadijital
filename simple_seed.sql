-- SIMPLIFIED SEED DATA & FIX SCRIPT

-- 1. Ensure Table Exists
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
    
    -- Making author_id nullable and removing the foreign key constraint strictly for this seed to work easily
    -- In production, you would want references auth.users(id)
    author_id UUID, 
    
    seo_title TEXT,
    seo_desc TEXT,
    focus_keyword TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0
);

-- 2. Reset RLS Policies (Fix Permissions)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can do everything" ON posts;
CREATE POLICY "Authenticated users can do everything" 
ON posts FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 3. Insert Data (Without Author ID to prevent errors)
INSERT INTO posts (title, slug, summary, content, cover_image, category, tags, status, published_at, seo_title, seo_desc, focus_keyword, is_indexable)
VALUES 
(
    '2024 Dijital Pazarlama Trendleri', 
    '2024-dijital-pazarlama', 
    'Yapay zeka ve video içerikler 2024 yılında öne çıkıyor.',
    '# 2024 Trendleri... İçerik buraya.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    'Pazarlama',
    ARRAY['trendler', '2024'],
    'published',
    NOW(),
    '2024 Dijital Pazarlama Trendleri',
    '2024 pazarlama trendleri.',
    'pazarlama',
    true
)
ON CONFLICT (slug) DO NOTHING; -- Avoid error if already exists

-- 4. Verify Data
SELECT count(*) as total_posts FROM posts;
