import { useState, useEffect } from 'react';
import { Save, X, Plus, GripVertical } from 'lucide-react';
import { getLayoutSettings, updateLayoutSettings, type HeaderMenuItem } from '../../../services/layout.service';

const HeaderManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [logoUrl, setLogoUrl] = useState('');
    const [logoAlt, setLogoAlt] = useState('Digma Logo');
    const [faviconUrl, setFaviconUrl] = useState('');
    const [menuItems, setMenuItems] = useState<HeaderMenuItem[]>([]);
    const [ctaLabel, setCtaLabel] = useState('Ücretsiz Analiz Al');
    const [ctaHref, setCtaHref] = useState('/#ucretsiz-analiz');
    const [ctaEnabled, setCtaEnabled] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        const settings = await getLayoutSettings();
        if (settings) {
            setLogoUrl(settings.header_logo_url || '');
            setLogoAlt(settings.header_logo_alt);
            setFaviconUrl(settings.favicon_url || '');
            setMenuItems(settings.header_menu || []);
            setCtaLabel(settings.header_cta_label);
            setCtaHref(settings.header_cta_href);
            setCtaEnabled(settings.header_cta_enabled);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateLayoutSettings({
            header_logo_url: logoUrl || null,
            header_logo_alt: logoAlt,
            favicon_url: faviconUrl || null,
            header_menu: menuItems,
            header_cta_label: ctaLabel,
            header_cta_href: ctaHref,
            header_cta_enabled: ctaEnabled,
        });

        if (result.success) {
            alert('Header ayarları başarıyla güncellendi!');
            // Force reload to see changes
            window.location.reload();
        } else {
            alert('Hata: ' + result.error);
        }
        setSaving(false);
    };

    const addMenuItem = () => {
        const newItem: HeaderMenuItem = {
            label: 'Yeni Menü',
            href: '/',
            enabled: true,
            order: menuItems.length + 1,
            isExternal: false,
        };
        setMenuItems([...menuItems, newItem]);
    };

    const updateMenuItem = (index: number, field: keyof HeaderMenuItem, value: any) => {
        const updated = [...menuItems];
        updated[index] = { ...updated[index], [field]: value };
        setMenuItems(updated);
    };

    const removeMenuItem = (index: number) => {
        setMenuItems(menuItems.filter((_, i) => i !== index));
    };

    if (loading) {
        return <div className="p-8 text-text-muted">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Header Yönetimi</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-blue/80 disabled:bg-accent-blue/50 text-white rounded-lg transition-colors"
                >
                    <Save size={18} />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>

            {/* Logo & Favicon */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Logo & Favicon</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Logo URL</label>
                    <input
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Logo Alt Text</label>
                    <input
                        type="text"
                        value={logoAlt}
                        onChange={(e) => setLogoAlt(e.target.value)}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Favicon URL</label>
                    <input
                        type="text"
                        value={faviconUrl}
                        onChange={(e) => setFaviconUrl(e.target.value)}
                        placeholder="https://example.com/favicon.ico"
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>
            </div>

            {/* Menu Items */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Header Menü</h2>
                    <button
                        onClick={addMenuItem}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        Menü Ekle
                    </button>
                </div>

                <div className="space-y-4">
                    {menuItems.map((item, index) => (
                        <div key={index} className="bg-background border border-white/10 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-4">
                                <GripVertical size={18} className="text-text-muted cursor-move" />
                                <input
                                    type="text"
                                    value={item.label}
                                    onChange={(e) => updateMenuItem(index, 'label', e.target.value)}
                                    placeholder="Menü Adı"
                                    className="flex-1 bg-secondary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
                                />
                                <input
                                    type="text"
                                    value={item.href}
                                    onChange={(e) => updateMenuItem(index, 'href', e.target.value)}
                                    placeholder="/sayfa"
                                    className="flex-1 bg-secondary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
                                />
                                <label className="flex items-center gap-2 text-sm text-text-muted">
                                    <input
                                        type="checkbox"
                                        checked={item.enabled}
                                        onChange={(e) => updateMenuItem(index, 'enabled', e.target.checked)}
                                        className="rounded"
                                    />
                                    Aktif
                                </label>
                                <button
                                    onClick={() => removeMenuItem(index)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">CTA Butonu</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Buton Metni</label>
                        <input
                            type="text"
                            value={ctaLabel}
                            onChange={(e) => setCtaLabel(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Buton Linki</label>
                        <input
                            type="text"
                            value={ctaHref}
                            onChange={(e) => setCtaHref(e.target.value)}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                        type="checkbox"
                        checked={ctaEnabled}
                        onChange={(e) => setCtaEnabled(e.target.checked)}
                        className="rounded"
                    />
                    CTA Butonu Aktif
                </label>
            </div>
        </div>
    );
};

export default HeaderManager;
