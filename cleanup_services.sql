
-- Remove the specific services added by the seed script
DELETE FROM public.services 
WHERE slug IN (
    'performance-ads',
    'seo',
    'social-media',
    'creative',
    'cro',
    'analytics'
);
