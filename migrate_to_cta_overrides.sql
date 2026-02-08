-- ========================================
-- Migration: CTA Buttons → CTA Overrides
-- ========================================
--
-- This migration converts the dynamic CTA button array system
-- to a template-based override system.
--
-- BEFORE: `cta_buttons` JSONB array with full button objects
-- AFTER: `cta_overrides` JSONB object with template key-based overrides
--
-- ========================================

-- Step 1: Add new cta_overrides column
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS cta_overrides JSONB DEFAULT '{}'::jsonb;

-- Step 2: Migrate existing data from cta_buttons to cta_overrides
-- This function converts the old array format to the new override format
UPDATE services
SET cta_overrides = (
    SELECT jsonb_object_agg(
        COALESCE(
            -- Map known labels to template keys
            CASE 
                WHEN LOWER(btn->>'label') LIKE '%teklif%' THEN 'get-offer'
                WHEN LOWER(btn->>'label') LIKE '%ula%' OR LOWER(btn->>'label') LIKE '%iletişim%' THEN 'contact'
                WHEN LOWER(btn->>'label') LIKE '%görüşme%' OR LOWER(btn->>'label') LIKE '%dakika%' THEN 'book-call'
                -- Fallback: use order-based mapping
                WHEN (btn->>'order')::int = 0 THEN 'get-offer'
                WHEN (btn->>'order')::int = 1 THEN 'contact'
                WHEN (btn->>'order')::int = 2 THEN 'book-call'
                ELSE CONCAT('custom-', btn->>'id')
            END,
            'get-offer' -- Default key if all else fails
        ),
        jsonb_build_object(
            'label', btn->>'label',
            'href', btn->>'href',
            'variant', btn->>'variant',
            'target', btn->>'target',
            'isEnabled', COALESCE((btn->>'isEnabled')::boolean, true)
        ) - 'label'  -- Remove label if null/empty
          - 'href'   -- Remove href if null/empty  
          - 'variant' -- Remove variant if matches default
          - 'target'  -- Remove target if matches default
          - 'isEnabled' -- Remove isEnabled if true (default)
    )
    FROM jsonb_array_elements(
        COALESCE(cta_buttons, '[]'::jsonb)
    ) AS btn
    WHERE btn->>'isEnabled' IS NULL OR (btn->>'isEnabled')::boolean = true
)
WHERE cta_buttons IS NOT NULL AND jsonb_array_length(cta_buttons) > 0;

-- Step 3: Verify migration (optional query to run after migration)
-- Uncomment to check results:
/*
SELECT 
    id,
    title,
    cta_buttons,
    cta_overrides,
    jsonb_array_length(COALESCE(cta_buttons, '[]'::jsonb)) as old_count,
    jsonb_object_keys(COALESCE(cta_overrides, '{}'::jsonb)) as override_keys
FROM services
WHERE cta_buttons IS NOT NULL OR cta_overrides IS NOT NULL;
*/

-- Step 4: Drop old column (ONLY after verification!)
-- Uncomment when ready:
-- ALTER TABLE services DROP COLUMN IF EXISTS cta_buttons;

-- ========================================
-- Rollback Plan (if needed)
-- ========================================
/*
-- To rollback, you would need to:
-- 1. Re-add cta_buttons column
-- 2. Convert cta_overrides back to array format
-- 3. Drop cta_overrides column
-- 
-- NOTE: This assumes you have a backup of your data!
*/
