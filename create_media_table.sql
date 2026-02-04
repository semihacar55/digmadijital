
-- Tümüyle temiz bir başlangıç için önce varsa eski tabloyu kaldır (Gerekirse)
-- drop table if exists public.media_assets;

-- 1. Media Assets Tablosu
create table if not exists public.media_assets (
  id uuid default gen_random_uuid() primary key,
  file_name text not null,
  bucket text not null default 'media',
  path text not null,
  public_url text not null,
  mime_type text,
  size bigint, -- bytes
  width int,
  height int,
  alt_text text,
  caption text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. RLS Politikaları
alter table public.media_assets enable row level security;

-- Herkes (public) aktif medyaları görebilsin (Media kütüphanesi genelde public url sunar)
drop policy if exists "Media assets are viewable by everyone" on public.media_assets;
create policy "Media assets are viewable by everyone"
  on public.media_assets for select
  using (true);

-- Sadece authenticated (admin) kullanıcılar ekleme/düzenleme/silme yapabilsin
drop policy if exists "Authenticated users can does everything on media" on public.media_assets;
create policy "Authenticated users can does everything on media"
  on public.media_assets for all
  using (auth.role() = 'authenticated');


-- 3. Storage Bucket Ayarları (SQL ile bucket oluşturulamıyor olabilir ama policy eklenebilir)
-- Not: 'media' bucket'ını Supabase panelinden oluşturmanız gerekebilir.
-- Ancak policy'leri buradan tanımlayabiliriz.

-- Storage Policy: Public Read
-- "storage" şeması altındaki "objects" tablosuna policy ekliyoruz.
drop policy if exists "Public Access to Media Bucket" on storage.objects;
create policy "Public Access to Media Bucket"
  on storage.objects for select
  using ( bucket_id = 'media' );

-- Storage Policy: Authenticated Upload/Delete
drop policy if exists "Auth Users can Upload Media" on storage.objects;
create policy "Auth Users can Upload Media"
  on storage.objects for insert
  with check ( bucket_id = 'media' and auth.role() = 'authenticated' );

drop policy if exists "Auth Users can Update Media" on storage.objects;
create policy "Auth Users can Update Media"
  on storage.objects for update
  using ( bucket_id = 'media' and auth.role() = 'authenticated' );

drop policy if exists "Auth Users can Delete Media" on storage.objects;
create policy "Auth Users can Delete Media"
  on storage.objects for delete
  using ( bucket_id = 'media' and auth.role() = 'authenticated' );
