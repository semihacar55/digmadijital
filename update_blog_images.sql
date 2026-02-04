
-- Update '2024 Dijital Pazarlama' post
UPDATE posts 
SET cover_image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
WHERE slug = '2024-dijital-pazarlama';

-- Update 'İlk Blog Yazısı' post (Test post)
UPDATE posts 
SET cover_image = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop'
WHERE slug = 'ilk-blog-yazisi';

-- Generic update for any future posts lacking images (optional safety net)
-- UPDATE posts SET cover_image = 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2674' WHERE cover_image IS NULL;
