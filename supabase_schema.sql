-- Create posts table
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
    author_id UUID REFERENCES auth.users(id),
    
    -- SEO Fields
    seo_title TEXT,
    seo_desc TEXT,
    focus_keyword TEXT,
    canonical_url TEXT,
    is_indexable BOOLEAN DEFAULT true,
    
    -- Stats
    views_count INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies

-- Public read access for published posts
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (status = 'published');

-- Admin full access (assuming authenticated users are admins for now, or customize as needed)
CREATE POLICY "Authenticated users can do everything" 
ON posts FOR ALL 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- Indexes
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
