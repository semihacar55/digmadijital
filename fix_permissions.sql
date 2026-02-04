-- FIX PERMISSIONS SCRIPT

-- 1. Explicitly Grant Permissions to API Roles (anon and authenticated)
-- Sometimes RLS is enabled/disabled but the basic SQL permissions are missing.
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE posts TO anon, authenticated;
GRANT ALL ON TABLE posts TO service_role;

-- 2. Enable RLS (It is safer and standard for Supabase)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON posts;
DROP POLICY IF EXISTS "Allow All Access" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;

-- 4. Create a single, simple "ALLOW ALL" policy for debugging
-- This allows anyone (anon or logged in) to Select, Insert, Update, Delete
CREATE POLICY "Allow All Access"
ON posts
FOR ALL
USING (true)
WITH CHECK (true);

-- 5. Force public schema cache reload (sometimes needed)
NOTIFY pgrst, 'reload config';
