
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const caseStudies = [
    {
        title: 'Velvet & Rose: E-Ticaret Dönüşüm Oranlarında %150 Artış',
        slug: 'velvet-rose-eticaret-buyume',
        excerpt: 'Lüks giyim markası Velvet & Rose için gerçekleştirdiğimiz UX/UI iyileştirmeleri ve CRO çalışmalarıyla satışları 2.5 katına çıkardık.',
        cover_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop',
        client_name: 'Velvet & Rose',
        client_visible: true,
        sector: 'E-Ticaret',
        services: ['UX/UI Tasarım', 'Dönüşüm Optimizasyonu', 'Web Geliştirme'],
        status: 'published',
        published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        problem: '**Sorun:** Velvet & Rose, yüksek trafik almasına rağmen ziyaretçileri müşteriye dönüştürmekte zorlanıyordu. Sepette terk etme oranları %85 seviyesindeydi ve mobil deneyim, lüks marka algısını yansıtmıyordu.',
        solution: '**Çözüm:** Kapsamlı bir UX denetimi sonrası, satın alma sürecini 5 adımdan 2 adıma düşürdük. "Glassmorphism" tasarım diliyle ürünlerin öne çıktığı, premium bir mobil arayüz tasarladık. Kişiselleştirilmiş ürün öneri motoru entegre ettik.',
        process_steps: ["Site Hızı Optimizasyonu", "Mobil Arayüz Yenileme", "Sepet Akışı Sadeleştirme", "A/B Testleri"],
        results: [
            { value: "150", unit: "%", label: "Satış Artışı" },
            { value: "65", unit: "%", label: "Mobil Dönüşüm" },
            { value: "3.5", unit: "ROAS", label: "Reklam Getirisi" }
        ],
        testimonial: { name: "Ayşe Yılmaz", company: "Velvet & Rose CEO", quote: "Digma ekibi sadece sitemizi yenilemedi, işimizi büyüttü. Rakamlar her şeyi anlatıyor.", avatar: "" },
        seo_title: 'Velvet & Rose E-Ticaret Başarı Hikayesi | Digma',
        seo_desc: 'Velvet & Rose markası için yaptığımız e-ticaret optimizasyonu ile satışları %150 artırdık. Vaka analizini inceleyin.',
        is_indexable: true
    },
    {
        title: 'TechFlow SaaS: Global Pazara Açılma ve Rebranding',
        slug: 'techflow-saas-rebranding',
        excerpt: 'B2B yazılım şirketi TechFlow\'un kurumsal kimliğini yenileyerek global pazarda rekabet edebilir hale getirdik. Lead kalitesini %40 artırdık.',
        cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
        client_name: 'TechFlow',
        client_visible: true,
        sector: 'Teknoloji',
        services: ['Marka Kimliği', 'Web Tasarım', 'İçerik Stratejisi'],
        status: 'published',
        published_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        problem: '**Sorun:** TechFlow, güçlü bir ürüne sahip olmasına rağmen, marka kimliği "eski moda" kaldığı için enterprise müşterileri ikna etmekte zorlanıyordu. Web sitesi teknik detaylara boğulmuştu ve değer önerisi net değildi.',
        solution: '**Çözüm:** Marka kimliğini "Modern, Güvenilir ve İnovatif" anahtar kelimeleri etrafında yeniden kurguladık. Web sitesini 3D illüstrasyonlar ve interaktif demolarla zenginleştirerek, ürünün karmaşık yapısını basitçe anlatan bir hikaye oluşturduk.',
        process_steps: ["Marka Stratejisi Çalıştayı", "Logo ve Kurumsal Kimlik", "Web UI Globalizasyonu", "Animasyonlu Ürün Demoları"],
        results: [
            { value: "40", unit: "%", label: "Lead Kalitesi Artışı" },
            { value: "20", unit: "ülke", label: "Yeni Pazar" },
            { value: "2x", unit: "", label: "Demo Talebi" }
        ],
        testimonial: { name: "John Smith", company: "TechFlow CMO", quote: "Artık global rakiplerimizle aynı masada oturabiliyoruz. Tasarım dili, vizyonumuzu tam olarak yansıtıyor.", avatar: "" },
        seo_title: 'TechFlow SaaS Rebranding ve Web Tasarım | Digma',
        seo_desc: 'TechFlow SaaS markasının globalleşme yolculuğunda marka kimliği ve web tasarım süreçlerini nasıl yönettik? İnceleyin.',
        is_indexable: true
    },
    {
        title: 'Dr. Armağan Klinik: Yerel SEO ile Randevuları %400 Artırdık',
        slug: 'dr-armagan-klinik-seo',
        excerpt: 'Estetik kliniği için uyguladığımız Yerel SEO ve içerik stratejisi sayesinde, organik aramalardan gelen hasta sayısında rekor artış sağladık.',
        cover_image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
        client_name: 'Dr. Armağan Klinik',
        client_visible: true,
        sector: 'Sağlık',
        services: ['Yerel SEO', 'Sosyal Medya', 'Google Ads'],
        status: 'published',
        published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        problem: '**Sorun:** Yeni açılan klinik, bölgesindeki yoğun rekabet nedeniyle Google Haritalar\'da ve aramalarda görünmüyordu. Geleneksel reklam maliyetleri çok yüksekti.',
        solution: '**Çözüm:** "Estetik Kliniği" ve ilgili anahtar kelimelerde kapsamlı bir yerel SEO çalışması başlattık. Google My Business profilini optimize ettik, blog içerikleriyle otorite kazandırdık ve hasta yorumlarını (social proof) ön plana çıkardık.',
        process_steps: ["Google My Business Kurulumu", "Yerel Anahtar Kelime Analizi", "Blog İçerik Üretimi", "Yorum Yönetimi"],
        results: [
            { value: "400", unit: "%", label: "Randevu Artışı" },
            { value: "#1", unit: "", label: "Google Sıralaması" },
            { value: "5k+", unit: "", label: "Organik Trafik" }
        ],
        testimonial: { name: "Dr. Armağan", company: "Kurucu Hekim", quote: "Dijitalden bu kadar hasta gelebileceğini tahmin etmemiştim. Artık randevularımız haftalar öncesinden doluyor.", avatar: "" },
        seo_title: 'Dr. Armağan Klinik Yerel SEO Başarısı | Digma',
        seo_desc: 'Sağlık sektöründe yerel SEO ile nasıl fark yarattık? Klinik randevularını artıran dijital pazarlama stratejimiz.',
        is_indexable: true
    }
];

async function seed() {
    console.log('Starting seed process...');

    for (const study of caseStudies) {
        const { data: existing } = await supabase
            .from('case_studies')
            .select('id')
            .eq('slug', study.slug)
            .single();

        if (existing) {
            console.log(`Skipping ${study.slug} (already exists)`);
        } else {
            const { error } = await supabase.from('case_studies').insert(study);
            if (error) {
                console.error(`Error inserting ${study.slug}:`, error);
            } else {
                console.log(`Inserted ${study.slug}`);
            }
        }
    }

    console.log('Seed check complete.');
}

seed();
