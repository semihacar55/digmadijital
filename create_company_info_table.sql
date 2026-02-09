-- Create company_info table (singleton - only 1 row)
CREATE TABLE IF NOT EXISTS public.company_info (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name text NOT NULL DEFAULT 'Digma Dijital',
    phone text,
    whatsapp text,
    email text,
    address text,
    business_hours text,
    logo_url text,
    social_links jsonb DEFAULT '[]'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Insert default company information
INSERT INTO public.company_info (
    company_name,
    phone,
    whatsapp,
    email,
    address,
    business_hours,
    social_links
) VALUES (
    'Digma Dijital',
    '+90 (212) 555 00 00',
    '+90 555 123 45 67',
    'merhaba@digma.com',
    'Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul',
    'Pazartesi - Cuma: 09:00 - 18:00',
    '[
        {"platform": "instagram", "url": "https://instagram.com/digmadijital"},
        {"platform": "linkedin", "url": "https://linkedin.com/company/digma"},
        {"platform": "twitter", "url": "https://twitter.com/digmadijital"}
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.company_info ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Allow public read access" ON public.company_info
    FOR SELECT USING (true);

-- Only authenticated users can update
CREATE POLICY "Allow authenticated update" ON public.company_info
    FOR UPDATE USING (auth.role() = 'authenticated');
