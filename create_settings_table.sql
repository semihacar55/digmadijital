-- Create site_settings table for singleton settings storage
create table if not exists public.site_settings (
  id uuid default gen_random_uuid() primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default settings row (singleton)
insert into public.site_settings (data) values ('{
  "general": {
    "siteName": "Digma Dijital",
    "tagline": "Dijital Dönüşümde Yanınızdayız",
    "logoLight": "",
    "logoDark": "",
    "favicon": "",
    "phone": "+90 216 000 00 00",
    "email": "info@digma.com.tr",
    "address": "Teknoloji Vadisi, İstanbul",
    "whatsapp": "",
    "social": {
      "instagram": "",
      "linkedin": "",
      "youtube": "",
      "twitter": ""
    }
  },
  "seo": {
    "titleTemplate": "{pageTitle} | Digma Dijital",
    "defaultDescription": "Dijital pazarlama, SEO, web tasarım ve sosyal medya yönetimi hizmetleri",
    "defaultOgImage": "",
    "canonicalUrl": "https://digmadijital.com",
    "robotsIndex": true,
    "organizationSchema": {
      "name": "Digma Dijital",
      "logoUrl": "",
      "sameAs": []
    }
  },
  "integrations": {
    "googleAnalytics": "",
    "metaPixel": "",
    "searchConsole": ""
  },
  "forms": {
    "notificationEmail": "info@digma.com.tr",
    "honeypotEnabled": true
  }
}'::jsonb)
on conflict (id) do nothing;

-- RLS Policies
alter table public.site_settings enable row level security;

drop policy if exists "Authenticated users can view settings" on public.site_settings;
create policy "Authenticated users can view settings"
  on public.site_settings for select
  using (auth.role() = 'authenticated');

drop policy if exists "Authenticated users can update settings" on public.site_settings;
create policy "Authenticated users can update settings"
  on public.site_settings for update
  using (auth.role() = 'authenticated');
