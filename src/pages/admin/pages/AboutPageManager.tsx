import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getPageByKey, updatePage } from '../../../services/pages.service';

const AboutPageManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [ogImage, setOgImage] = useState('');

    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = async () => {
        setLoading(true);
        const page = await getPageByKey('about');
        if (page) {
            setHeroTitle(page.hero_title || '');
            setHeroSubtitle(page.hero_subtitle || '');
            setContent(page.content_markdown || '');
            setSeoTitle(page.seo_title || '');
            setSeoDescription(page.seo_description || '');
            setSeoKeywords(page.seo_keywords || '');
            setOgImage(page.og_image_url || '');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updatePage('about', {
            hero_title: heroTitle,
            hero_subtitle: heroSubtitle,
            content_markdown: content,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords,
            og_image_url: ogImage || null,
        });

        if (result.success) {
            alert('Hakkımızda sayfası başarıyla güncellendi!');
            window.location.reload();
        } else {
            alert('Hata: ' + result.error);
        }
        setSaving(false);
    };

    if (loading) {
        return <div className="p-8 text-text-muted">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Hakkımızda Sayfası</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-blue/80 disabled:bg-accent-blue/50 text-white rounded-lg transition-colors"
                >
                    <Save size={18} />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>

            {/* Hero Section */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Hero Bölümü</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Başlık</label>
                    <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        placeholder="Hakkımızda"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Alt Başlık</label>
                    <input
                        type="text"
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        placeholder="Dijital dünyada markanızı büyütüyoruz"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">İçerik</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                        İçerik (Markdown destekler)
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        placeholder="Ajans hikayenizi buraya yazın..."
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue font-mono text-sm"
                    />
                    <p className="text-xs text-text-muted mt-2">
                        Markdown formatı kullanabilirsiniz: **kalın**, *italik*, # Başlık, vb.
                    </p>
                </div>
            </div>

            {/* SEO */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">SEO Ayarları</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">SEO Başlık</label>
                    <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Hakkımızda | Digma Dijital"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">SEO Açıklama</label>
                    <textarea
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        rows={3}
                        placeholder="Digma Dijital hakkında bilgi edinin"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                        Anahtar Kelimeler (virgülle ayırın)
                    </label>
                    <input
                        type="text"
                        value={seoKeywords}
                        onChange={(e) => setSeoKeywords(e.target.value)}
                        placeholder="dijital ajans, performans pazarlama, seo"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">OG Image URL</label>
                    <input
                        type="text"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="https://example.com/og-image.jpg"
                        className="w-full bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>
            </div>
        </div>
    );
};

export default AboutPageManager;
