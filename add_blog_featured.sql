-- Add featured fields to posts table for homepage display
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 999;

-- Create index for featured queries
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured, featured_order);

-- Update a few existing posts to be featured (for demo purposes)
UPDATE posts 
SET is_featured = true, featured_order = 1
WHERE id = (
    SELECT id FROM posts 
    WHERE (slug LIKE '%seo%' OR slug LIKE '%dijital-pazarlama%') 
    AND status = 'published'
    LIMIT 1
);

UPDATE posts 
SET is_featured = true, featured_order = 2
WHERE id = (
    SELECT id FROM posts 
    WHERE (slug LIKE '%sosyal-medya%' OR slug LIKE '%google-ads%')
    AND status = 'published'
    AND is_featured = false
    LIMIT 1
);

UPDATE posts 
SET is_featured = true, featured_order = 3
WHERE id = (
    SELECT id FROM posts 
    WHERE is_featured = false
    AND status = 'published'
    LIMIT 1
);
