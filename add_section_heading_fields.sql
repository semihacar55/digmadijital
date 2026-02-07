-- Add title, highlight, and subtitle columns to homepage_sections table
ALTER TABLE homepage_sections
ADD COLUMN IF NOT EXISTS section_title TEXT,
ADD COLUMN IF NOT EXISTS section_highlight TEXT,
ADD COLUMN IF NOT EXISTS section_subtitle TEXT;

-- Update existing sections with current title values
UPDATE homepage_sections SET section_title = title WHERE section_title IS NULL;

-- Add comment for clarity
COMMENT ON COLUMN homepage_sections.section_title IS 'Full heading text for the section';
COMMENT ON COLUMN homepage_sections.section_highlight IS 'Word or phrase to highlight with gradient effect';
COMMENT ON COLUMN homepage_sections.section_subtitle IS 'Optional subtitle or description text';
