-- Seed initial logos into the references table
INSERT INTO public."references" (brand_name, type, logo_url, sector, sort_order, status, website_url)
VALUES 
    ('NovaCommerce', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Nova', 'E-Ticaret', 1, 'active', '#'),
    ('PeakLabs', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Peak', 'Teknoloji', 2, 'active', '#'),
    ('GlobalFlow', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Global', 'Lojistik', 3, 'active', '#'),
    ('AlphaWave', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Alpha', 'Finans', 4, 'active', '#'),
    ('DataCore', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Data', 'Yazılım', 5, 'active', '#'),
    ('SkyLine', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Sky', 'Mimarlık', 6, 'active', '#'),
    ('FutureTech', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Future', 'Enerji', 7, 'active', '#'),
    ('UrbanStyle', 'logo', 'https://placehold.co/200x80/222/FFF.png?text=Urban', 'Moda', 8, 'active', '#')
ON CONFLICT DO NOTHING;
