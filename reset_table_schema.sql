-- RESET TABLE SCHEMA SCRIPT
-- This will fix the "column does not exist" error by recreating the table correctly.

-- 1. Drop the existing wrong table
DROP TABLE IF EXISTS posts;

-- 2. Create the table with ALL required columns
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT, -- This was missing before
    content TEXT,
    cover_image TEXT,
    category TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'published', 
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    author_id UUID REFERENCES auth.users(id), -- Optional
    
    -- SEO Fields
    seo_title TEXT,
    seo_desc TEXT,
    focus_keyword TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,
    
    -- Stats
    views_count INTEGER DEFAULT 0
);

-- 3. Enable RLS (and allow access for now)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Public Read"
ON posts FOR SELECT
USING (true);

CREATE POLICY "Allow All for Authenticated"
ON posts FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow All for Anon (Debug)"
ON posts FOR ALL
USING (true)
WITH CHECK (true);

-- 4. Insert Seed Data again
INSERT INTO posts (title, slug, summary, content, category, status, published_at, is_indexable)
VALUES 
(
    'İlk Blog Yazısı', 
    'ilk-blog-yazisi', 
    'Bu bir test yazısıdır.', 
    '# Merhaba Dünya', 
    'Genel', 
    'published', 
    NOW(),
    true
),
(
    '2024 Dijital Pazarlama Trendleri', 
    '2024-dijital-pazarlama', 
    'Yapay zeka ve video içerikler...', 
    '# İçerik Detayı...', 
    'Pazarlama', 
    'published', 
    NOW(),
    true
);

-- 5. Verify
SELECT * FROM posts;
