import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getPageByKey, updatePage } from '../../../services/pages.service';

const ContactPageManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [mapUrl, setMapUrl] = useState('');
    const [formEnabled, setFormEnabled] = useState(true);
    const [formToEmail, setFormToEmail] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState('');
    const [ogImage, setOgImage] = useState('');

    useEffect(() => {
        loadPage();
    }, []);

    const loadPage = async () => {
        setLoading(true);
        const page = await getPageByKey('contact');
        if (page) {
            setHeroTitle(page.hero_title || '');
            setHeroSubtitle(page.hero_subtitle || '');
            setContent(page.content_markdown || '');
            setEmail(page.contact_email || '');
            setPhone(page.contact_phone || '');
            setAddress(page.contact_address || '');
            setMapUrl(page.contact_map_url || '');
            setFormEnabled(page.contact_form_enabled);
            setFormToEmail(page.contact_form_to_email || '');
            setSeoTitle(page.seo_title || '');
            setSeoDescription(page.seo_description || '');
            setSeoKeywords(page.seo_keywords || '');
            setOgImage(page.og_image_url || '');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updatePage('contact', {
            hero_title: heroTitle,
            hero_subtitle: heroSubtitle,
            content_markdown: content,
            contact_email: email,
            contact_phone: phone,
            contact_address: address,
            contact_map_url: mapUrl || null,
            contact_form_enabled: formEnabled,
            contact_form_to_email: formToEmail,
            seo_title: seoTitle,
            seo_description: seoDescription,
            seo_keywords: seoKeywords,
            og_image_url: ogImage || null,
        });

        if (result.success) {
            alert('İletişim sayfası başarıyla güncellendi!');
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
                <h1 className="text-3xl font-bold text-white">İletişim Sayfası</h1>
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

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Başlık</label>
                        <input
                            type="text"
                            value={heroTitle}
                            onChange={(e) => setHeroTitle(e.target.value)}
                            placeholder="İletişim"
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Alt Başlık</label>
                        <input
                            type="text"
                            value={heroSubtitle}
                            onChange={(e) => setHeroSubtitle(e.target.value)}
                            placeholder="Bizimle iletişime geçin"
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">İletişim Bilgileri</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">E-posta</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="merhaba@digma.com"
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Telefon</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+90 (212) 555 00 00"
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Adres</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Harita URL (opsiyonel)</label>
                    <input
                        type="text"
                        value={mapUrl}
                        onChange={(e) => setMapUrl(e.target.value)}
                        placeholder="https://maps.google.com/..."
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>
            </div>

            {/* Form Settings */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Form Ayarları</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                        Form Gönderim E-postası (mailler buraya gelecek)
                    </label>
                    <input
                        type="email"
                        value={formToEmail}
                        onChange={(e) => setFormToEmail(e.target.value)}
                        placeholder="merhaba@digma.com"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                    <p className="text-xs text-text-muted mt-2">
                        İletişim formundan gelen mailler bu adrese gönderilecek
                    </p>
                </div>

                <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                        type="checkbox"
                        checked={formEnabled}
                        onChange={(e) => setFormEnabled(e.target.checked)}
                        className="rounded"
                    />
                    İletişim Formu Aktif
                </label>
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
                        placeholder="İletişim | Digma Dijital"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">SEO Açıklama</label>
                    <textarea
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        rows={3}
                        placeholder="Digma Dijital ile iletişime geçin"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
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
                        placeholder="iletişim, dijital ajans, teklif al"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">OG Image URL</label>
                    <input
                        type="text"
                        value={ogImage}
                        onChange={(e) => setOgImage(e.target.value)}
                        placeholder="https://example.com/og-image.jpg"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactPageManager;
