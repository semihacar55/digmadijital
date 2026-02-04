-- FIX BLOG POSTS SCRIPT
-- This script will completely reset the blog table and permissions to ensure it works.

-- 1. Reset Table (Drop and Recreate to ensure correct schema)
DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    cover_image TEXT,
    category TEXT,
    tags TEXT[],
    status TEXT DEFAULT 'published', -- Default to published to ensure visibility
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    author_id UUID,
    seo_title TEXT,
    seo_desc TEXT,
    focus_keyword TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,
    views_count INTEGER DEFAULT 0
);

-- 2. DISABLE RLS Temporarily (To rule out permission issues)
-- We will enable it later, but first let's see the data!
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- 3. Insert Test Data
INSERT INTO posts (title, slug, summary, content, category, status, published_at)
VALUES 
(
    'Test Blog Yazısı 1', 
    'test-blog-1', 
    'Bu bir test yazısıdır. Veritabanı bağlantısını kontrol etmek için oluşturuldu.',
    '# Test Yazısı
    
    Eğer bu yazıyı görüyorsanız, veritabanı bağlantısı ve ayarlar **BAŞARILI** demektir.',
    'Test',
    'published',
    NOW()
),
(
    '2024 Dijital Pazarlama Trendleri', 
    '2024-dijital-pazarlama', 
    'Yapay zeka ve video içerikler...',
    '# İçerik Detayı...',
    'Pazarlama',
    'published',
    NOW()
);

-- 4. Verify Insertion
SELECT * FROM posts;
