-- Create references table
CREATE TABLE IF NOT EXISTS "public"."references" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "created_at" TIMESTAMPTZ DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ DEFAULT NOW(),
    "brand_name" TEXT NOT NULL,
    "type" TEXT NOT NULL CHECK (type IN ('logo', 'testimonial')),
    "logo_url" TEXT NOT NULL,
    "website_url" TEXT,
    "sector" TEXT,
    "sort_order" INTEGER DEFAULT 0,
    "status" TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    
    -- Testimonial specific fields
    "content" TEXT,
    "person_name" TEXT,
    "person_role" TEXT,
    "person_company" TEXT,
    "rating" INTEGER CHECK (rating >= 1 AND rating <= 5)
);

-- Enable RLS
ALTER TABLE "public"."references" ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public references are viewable by everyone" ON "public"."references";
CREATE POLICY "Public references are viewable by everyone" ON "public"."references"
    FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "Authenticated users can do everything" ON "public"."references";
CREATE POLICY "Authenticated users can do everything" ON "public"."references"
    FOR ALL USING (auth.role() = 'authenticated');

-- Indices
CREATE INDEX IF NOT EXISTS idx_references_type ON "public"."references"("type");
CREATE INDEX IF NOT EXISTS idx_references_status ON "public"."references"("status");
CREATE INDEX IF NOT EXISTS idx_references_sort_order ON "public"."references"("sort_order");
