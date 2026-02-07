-- Create form_submissions table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    form_type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'spam', 'archived')),
    ip_address TEXT,
    metadata JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for form_submissions
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public forms)
DROP POLICY IF EXISTS "Allow public inserts" ON public.form_submissions;
CREATE POLICY "Allow public inserts"
    ON public.form_submissions FOR INSERT
    WITH CHECK (true);

-- Allow authenticated admins to view/manage
DROP POLICY IF EXISTS "Admins can manage form submissions" ON public.form_submissions;
CREATE POLICY "Admins can manage form submissions"
    ON public.form_submissions FOR ALL
    USING (auth.role() = 'authenticated');


-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    data JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read (for SEO, contact info etc)
DROP POLICY IF EXISTS "Public can view settings" ON public.site_settings;
CREATE POLICY "Public can view settings"
    ON public.site_settings FOR SELECT
    USING (true);

-- Allow admins to update
DROP POLICY IF EXISTS "Admins can manage settings" ON public.site_settings;
CREATE POLICY "Admins can manage settings"
    ON public.site_settings FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert default settings if not exists
INSERT INTO public.site_settings (data)
SELECT '{
    "general": {
        "siteName": "Digma Dijital",
        "tagline": "Dijital Dönüşümde Yanınızdayız",
        "email": "info@digmadijital.com",
        "phone": "+90 216 000 00 00",
        "address": "İstanbul, Türkiye",
        "social": { "instagram": "", "linkedin": "", "youtube": "", "twitter": "" }
    },
    "seo": {
        "titleTemplate": "{pageTitle} | Digma Dijital",
        "defaultDescription": "Performans pazarlama ajansı.",
        "robotsIndex": true
    },
    "forms": {
        "notificationEmail": "admin@digma.com.tr",
        "honeypotEnabled": true
    }
}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);
