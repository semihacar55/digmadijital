
-- Tümüyle temiz bir başlangıç için önce varsa eski tabloyu kaldır (Gerekirse)
-- drop table if exists public.form_submissions;

-- 1. Form Submissions Tablosu
create table if not exists public.form_submissions (
  id uuid default gen_random_uuid() primary key,
  form_type text not null, -- 'contact', 'offer', 'analysis'
  name text not null,
  email text,
  phone text,
  message text,
  status text not null default 'new', -- 'new', 'contacted', 'spam', 'archived'
  ip_address text,
  metadata jsonb default '{}'::jsonb, -- dynamic fields
  notes text, -- admin internal notes
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. RLS Politikaları
alter table public.form_submissions enable row level security;

-- Insert: Herkes (anonim dahil) form gönderebilir
drop policy if exists "Anyone can submit forms" on public.form_submissions;
create policy "Anyone can submit forms"
  on public.form_submissions for insert
  with check (true);

-- Select/Update/Delete: Sadece Admin (authenticated)
drop policy if exists "Admins can view forms" on public.form_submissions;
create policy "Admins can view forms"
  on public.form_submissions for select
  using (auth.role() = 'authenticated');

drop policy if exists "Admins can update forms" on public.form_submissions;
create policy "Admins can update forms"
  on public.form_submissions for update
  using (auth.role() = 'authenticated');

drop policy if exists "Admins can delete forms" on public.form_submissions;
create policy "Admins can delete forms"
  on public.form_submissions for delete
  using (auth.role() = 'authenticated');
