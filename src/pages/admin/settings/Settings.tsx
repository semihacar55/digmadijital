import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Save, Settings as SettingsIcon } from 'lucide-react';

interface SiteSettings {
    general: {
        siteName: string;
        tagline: string;
        logoLight: string;
        logoDark: string;
        favicon: string;
        phone: string;
        email: string;
        address: string;
        whatsapp: string;
        social: {
            instagram: string;
            linkedin: string;
            youtube: string;
            twitter: string;
        };
    };
    seo: {
        titleTemplate: string;
        defaultDescription: string;
        defaultOgImage: string;
        canonicalUrl: string;
        robotsIndex: boolean;
        organizationSchema: {
            name: string;
            logoUrl: string;
            sameAs: string[];
        };
    };
    integrations: {
        googleAnalytics: string;
        metaPixel: string;
        searchConsole: string;
    };
    forms: {
        notificationEmail: string;
        honeypotEnabled: boolean;
    };
    cta: {
        defaultPrimaryHref: string;
        defaultSecondaryHref: string;
    };
}

const defaultSettings: SiteSettings = {
    general: {
        siteName: 'Digma Dijital',
        tagline: 'Dijital Dönüşümde Yanınızdayız',
        logoLight: '',
        logoDark: '',
        favicon: '',
        phone: '+90 216 000 00 00',
        email: 'info@digma.com.tr',
        address: 'Teknoloji Vadisi, İstanbul',
        whatsapp: '',
        social: { instagram: '', linkedin: '', youtube: '', twitter: '' }
    },
    seo: {
        titleTemplate: '{pageTitle} | Digma Dijital',
        defaultDescription: 'Dijital pazarlama, SEO, web tasarım ve sosyal medya yönetimi hizmetleri',
        defaultOgImage: '',
        canonicalUrl: 'https://digmadijital.com',
        robotsIndex: true,
        organizationSchema: { name: 'Digma Dijital', logoUrl: '', sameAs: [] }
    },
    integrations: { googleAnalytics: '', metaPixel: '', searchConsole: '' },
    forms: { notificationEmail: 'info@digma.com.tr', honeypotEnabled: true },
    cta: { defaultPrimaryHref: '/#ucretsiz-analiz', defaultSecondaryHref: '/iletisim' }
};

const Settings = () => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'integrations' | 'forms' | 'cta'>('general');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('data')
                .single();

            if (error) throw error;
            if (data?.data) {
                setSettings(data.data as SiteSettings);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('site_settings')
                .update({ data: settings, updated_at: new Date().toISOString() })
                .eq('id', (await supabase.from('site_settings').select('id').single()).data?.id);

            if (error) throw error;
            alert('Ayarlar başarıyla kaydedildi!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Kaydetme sırasında bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'general' as const, label: 'Genel' },
        { id: 'seo' as const, label: 'SEO' },
        { id: 'integrations' as const, label: 'Entegrasyonlar' },
        { id: 'forms' as const, label: 'Form Ayarları' },
        { id: 'cta' as const, label: 'CTA Varsayılanları' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-text-muted">Ayarlar yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                    <SettingsIcon className="text-accent-blue" size={24} />
                    <h1 className="text-xl font-display font-bold text-white">Site Ayarları</h1>
                </div>
                <Button variant="accent" onClick={handleSave} disabled={saving}>
                    <Save size={16} className="mr-2" />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-secondary/30 p-2 rounded-xl border border-white/5">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                            ? 'bg-accent-blue text-white'
                            : 'text-text-muted hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 bg-secondary/30 rounded-xl border border-white/5 p-6 overflow-y-auto">
                {activeTab === 'general' && (
                    <div className="space-y-6 max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Site Adı</label>
                                <Input
                                    value={settings.general.siteName}
                                    onChange={e => setSettings({ ...settings, general: { ...settings.general, siteName: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Slogan</label>
                                <Input
                                    value={settings.general.tagline}
                                    onChange={e => setSettings({ ...settings, general: { ...settings.general, tagline: e.target.value } })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Telefon</label>
                                <Input
                                    value={settings.general.phone}
                                    onChange={e => setSettings({ ...settings, general: { ...settings.general, phone: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">E-posta</label>
                                <Input
                                    type="email"
                                    value={settings.general.email}
                                    onChange={e => setSettings({ ...settings, general: { ...settings.general, email: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">WhatsApp</label>
                                <Input
                                    value={settings.general.whatsapp}
                                    onChange={e => setSettings({ ...settings, general: { ...settings.general, whatsapp: e.target.value } })}
                                    placeholder="https://wa.me/905..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Adres</label>
                            <Textarea
                                value={settings.general.address}
                                onChange={e => setSettings({ ...settings, general: { ...settings.general, address: e.target.value } })}
                                rows={2}
                            />
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <h3 className="text-lg font-bold text-white mb-4">Sosyal Medya</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Instagram</label>
                                    <Input
                                        value={settings.general.social.instagram}
                                        onChange={e => setSettings({ ...settings, general: { ...settings.general, social: { ...settings.general.social, instagram: e.target.value } } })}
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">LinkedIn</label>
                                    <Input
                                        value={settings.general.social.linkedin}
                                        onChange={e => setSettings({ ...settings, general: { ...settings.general, social: { ...settings.general.social, linkedin: e.target.value } } })}
                                        placeholder="https://linkedin.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">YouTube</label>
                                    <Input
                                        value={settings.general.social.youtube}
                                        onChange={e => setSettings({ ...settings, general: { ...settings.general, social: { ...settings.general.social, youtube: e.target.value } } })}
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Twitter</label>
                                    <Input
                                        value={settings.general.social.twitter}
                                        onChange={e => setSettings({ ...settings, general: { ...settings.general, social: { ...settings.general.social, twitter: e.target.value } } })}
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'seo' && (
                    <div className="space-y-6 max-w-3xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Başlık Şablonu</label>
                            <Input
                                value={settings.seo.titleTemplate}
                                onChange={e => setSettings({ ...settings, seo: { ...settings.seo, titleTemplate: e.target.value } })}
                                placeholder="{pageTitle} | Site Adı"
                            />
                            <p className="text-xs text-text-muted">Kullanım: {'{pageTitle}'} yerine sayfa başlığı gelir</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Varsayılan Meta Açıklama</label>
                            <Textarea
                                value={settings.seo.defaultDescription}
                                onChange={e => setSettings({ ...settings, seo: { ...settings.seo, defaultDescription: e.target.value } })}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Canonical URL</label>
                                <Input
                                    value={settings.seo.canonicalUrl}
                                    onChange={e => setSettings({ ...settings, seo: { ...settings.seo, canonicalUrl: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Robots</label>
                                <select
                                    value={settings.seo.robotsIndex ? 'index' : 'noindex'}
                                    onChange={e => setSettings({ ...settings, seo: { ...settings.seo, robotsIndex: e.target.value === 'index' } })}
                                    className="w-full bg-background border border-white/10 rounded-lg p-2.5 text-white"
                                >
                                    <option value="index">Index (Aranabilir)</option>
                                    <option value="noindex">No Index</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'integrations' && (
                    <div className="space-y-6 max-w-3xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Google Analytics / GTM ID</label>
                            <Input
                                value={settings.integrations.googleAnalytics}
                                onChange={e => setSettings({ ...settings, integrations: { ...settings.integrations, googleAnalytics: e.target.value } })}
                                placeholder="G-XXXXXXXXXX veya GTM-XXXXXXX"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Meta Pixel ID</label>
                            <Input
                                value={settings.integrations.metaPixel}
                                onChange={e => setSettings({ ...settings, integrations: { ...settings.integrations, metaPixel: e.target.value } })}
                                placeholder="1234567890"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Search Console Verification</label>
                            <Input
                                value={settings.integrations.searchConsole}
                                onChange={e => setSettings({ ...settings, integrations: { ...settings.integrations, searchConsole: e.target.value } })}
                                placeholder="google-site-verification=..."
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'forms' && (
                    <div className="space-y-6 max-w-3xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Bildirim E-posta Adresi</label>
                            <Input
                                type="email"
                                value={settings.forms.notificationEmail}
                                onChange={e => setSettings({ ...settings, forms: { ...settings.forms, notificationEmail: e.target.value } })}
                            />
                            <p className="text-xs text-text-muted">Yeni form başvuruları bu adrese bildirilir</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="honeypot"
                                checked={settings.forms.honeypotEnabled}
                                onChange={e => setSettings({ ...settings, forms: { ...settings.forms, honeypotEnabled: e.target.checked } })}
                                className="w-5 h-5 rounded bg-background border-white/10"
                            />
                            <label htmlFor="honeypot" className="text-sm text-white">Honeypot spam koruması aktif</label>
                        </div>
                    </div>
                )}

                {activeTab === 'cta' && (
                    <div className="space-y-6 max-w-3xl">
                        <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-lg p-4 mb-6">
                            <p className="text-sm text-white">
                                Bu ayarlar, hizmet sayfalarında CTA linkleri boş bırakıldığında kullanılacak varsayılan linklerdir.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Primary CTA Varsayılan Link</label>
                            <Input
                                value={settings.cta.defaultPrimaryHref}
                                onChange={e => setSettings({ ...settings, cta: { ...settings.cta, defaultPrimaryHref: e.target.value } })}
                                placeholder="/#ucretsiz-analiz"
                            />
                            <p className="text-xs text-text-muted">Örnek: /#ucretsiz-analiz, /iletisim, https://...</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Secondary CTA Varsayılan Link</label>
                            <Input
                                value={settings.cta.defaultSecondaryHref}
                                onChange={e => setSettings({ ...settings, cta: { ...settings.cta, defaultSecondaryHref: e.target.value } })}
                                placeholder="/iletisim"
                            />
                            <p className="text-xs text-text-muted">Örnek: /iletisim, /#contact, https://...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;
