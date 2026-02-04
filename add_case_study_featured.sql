-- Add featured fields to case_studies table
ALTER TABLE case_studies 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 999;

-- Create index for featured queries
CREATE INDEX IF NOT EXISTS idx_case_studies_featured ON case_studies(is_featured, featured_order);

-- Update a few existing case studies to be featured (for demo purposes)
UPDATE case_studies 
SET is_featured = true, featured_order = 1
WHERE slug = 'velvet-rose-eticaret-buyume';

UPDATE case_studies 
SET is_featured = true, featured_order = 2
WHERE slug = 'techflow-saas-rebranding';

UPDATE case_studies 
SET is_featured = true, featured_order = 3
WHERE slug = 'dr-armagan-klinik-seo';
