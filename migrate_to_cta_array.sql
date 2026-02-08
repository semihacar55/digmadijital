-- Migrate from fixed CTA fields to dynamic cta_buttons array
-- This allows unlimited, reorderable CTA buttons per service

-- Step 1: Add new cta_buttons column
ALTER TABLE services
ADD COLUMN IF NOT EXISTS cta_buttons JSONB DEFAULT '[]'::jsonb;

-- Step 2: Migrate existing data from old fields to array
UPDATE services
SET cta_buttons = (
    SELECT jsonb_agg(btn ORDER BY (btn->>'order')::int)
    FROM (
        -- Primary CTA (if exists)
        SELECT jsonb_build_object(
            'id', gen_random_uuid()::text,
            'label', primary_cta_text,
            'href', primary_cta_href,
            'variant', 'accent',
            'target', COALESCE(primary_cta_target, 'same_tab'),
            'isEnabled', true,
            'order', 0
        ) AS btn
        WHERE primary_cta_text IS NOT NULL AND primary_cta_href IS NOT NULL
        
        UNION ALL
        
        -- Secondary CTA (if exists)
        SELECT jsonb_build_object(
            'id', gen_random_uuid()::text,
            'label', secondary_cta_text,
            'href', secondary_cta_href,
            'variant', 'outline',
            'target', COALESCE(secondary_cta_target, 'same_tab'),
            'isEnabled', true,
            'order', 1
        ) AS btn
        WHERE secondary_cta_text IS NOT NULL AND secondary_cta_href IS NOT NULL
    ) AS buttons
)
WHERE primary_cta_text IS NOT NULL OR secondary_cta_text IS NOT NULL;

-- Step 3: Drop old columns (after confirming migration success)
-- IMPORTANT: Verify cta_buttons data before running this step!
-- Uncomment after verification:
/*
ALTER TABLE services
DROP COLUMN IF EXISTS primary_cta_text,
DROP COLUMN IF EXISTS primary_cta_href,
DROP COLUMN IF EXISTS primary_cta_target,
DROP COLUMN IF EXISTS secondary_cta_text,
DROP COLUMN IF EXISTS secondary_cta_href,
DROP COLUMN IF EXISTS secondary_cta_target;
*/

-- Step 4: Add comment for documentation
COMMENT ON COLUMN services.cta_buttons IS 'Dynamic array of CTA buttons with configurable label, href, variant, target, and order';

-- Verification query (run this to check data before dropping old columns)
-- SELECT id, title, 
--        primary_cta_text, secondary_cta_text,
--        cta_buttons
-- FROM services
-- LIMIT 5;
