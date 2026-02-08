-- Add CTA button configuration fields to services table
-- This allows admin users to configure CTA buttons for each service dynamically

ALTER TABLE services
ADD COLUMN IF NOT EXISTS primary_cta_text TEXT DEFAULT 'Teklif Al',
ADD COLUMN IF NOT EXISTS primary_cta_href TEXT DEFAULT '/#ucretsiz-analiz',
ADD COLUMN IF NOT EXISTS primary_cta_target TEXT DEFAULT 'same_tab',
ADD COLUMN IF NOT EXISTS secondary_cta_text TEXT DEFAULT 'Bize Ulaşın',
ADD COLUMN IF NOT EXISTS secondary_cta_href TEXT DEFAULT '/iletisim',
ADD COLUMN IF NOT EXISTS secondary_cta_target TEXT DEFAULT 'same_tab';

-- Add check constraints for target fields
ALTER TABLE services
DROP CONSTRAINT IF EXISTS services_primary_cta_target_check,
ADD CONSTRAINT services_primary_cta_target_check 
  CHECK (primary_cta_target IN ('same_tab', 'new_tab'));

ALTER TABLE services
DROP CONSTRAINT IF EXISTS services_secondary_cta_target_check,
ADD CONSTRAINT services_secondary_cta_target_check 
  CHECK (secondary_cta_target IN ('same_tab', 'new_tab'));

-- Update existing records with default values (for records created before this migration)
UPDATE services
SET 
    primary_cta_text = COALESCE(primary_cta_text, 'Teklif Al'),
    primary_cta_href = COALESCE(primary_cta_href, '/#ucretsiz-analiz'),
    primary_cta_target = COALESCE(primary_cta_target, 'same_tab'),
    secondary_cta_text = COALESCE(secondary_cta_text, 'Bize Ulaşın'),
    secondary_cta_href = COALESCE(secondary_cta_href, '/iletisim'),
    secondary_cta_target = COALESCE(secondary_cta_target, 'same_tab')
WHERE 
    primary_cta_text IS NULL 
    OR primary_cta_href IS NULL 
    OR secondary_cta_text IS NULL 
    OR secondary_cta_href IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN services.primary_cta_text IS 'Primary CTA button text (e.g., "Teklif Al"). Leave empty to hide button.';
COMMENT ON COLUMN services.primary_cta_href IS 'Primary CTA link (e.g., /#ucretsiz-analiz, /iletisim, https://...). Supports internal routes, hash navigation, and external URLs.';
COMMENT ON COLUMN services.primary_cta_target IS 'Open in same_tab or new_tab';
COMMENT ON COLUMN services.secondary_cta_text IS 'Secondary CTA button text (e.g., "Bize Ulaşın"). Leave empty to hide button.';
COMMENT ON COLUMN services.secondary_cta_href IS 'Secondary CTA link. Supports internal routes, hash navigation, and external URLs.';
COMMENT ON COLUMN services.secondary_cta_target IS 'Open in same_tab or new_tab';

