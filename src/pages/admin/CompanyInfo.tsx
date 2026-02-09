import { useState, useEffect } from 'react';
import { getCompanyInfo, updateCompanyInfo, getDefaultCompanyInfo, type CompanyInfo, type SocialLink } from '../../services/company.service';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';

const CompanyInfoPage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [formData, setFormData] = useState<Partial<CompanyInfo>>(getDefaultCompanyInfo());
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCompanyInfo();
            if (data) {
                setFormData({
                    company_name: data.company_name,
                    phone: data.phone,
                    whatsapp: data.whatsapp,
                    email: data.email,
                    address: data.address,
                    business_hours: data.business_hours,
                    logo_url: data.logo_url
                });
                setSocialLinks(data.social_links || []);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        const result = await updateCompanyInfo({
            ...formData,
            social_links: socialLinks
        });

        setSaving(false);

        if (result.success) {
            setMessage({ type: 'success', text: 'Şirket bilgileri başarıyla güncellendi!' });
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.error || 'Bir hata oluştu.' });
        }
    };

    const addSocialLink = () => {
        setSocialLinks([...socialLinks, { platform: '', url: '' }]);
    };

    const removeSocialLink = (index: number) => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
    };

    const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
        const updated = [...socialLinks];
        updated[index] = { ...updated[index], [field]: value };
        setSocialLinks(updated);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Şirket Bilgileri</h1>
                <p className="text-text-muted">Tüm sitede kullanılan iletişim bilgilerini buradan yönetin.</p>
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-secondary/30 p-6 rounded-xl border border-white/10 space-y-6">
                    <h2 className="text-xl font-bold text-white">Temel Bilgiler</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Şirket Adı</label>
                        <Input
                            value={formData.company_name || ''}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            placeholder="Digma Dijital"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Telefon</label>
                            <Input
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="+90 (212) 555 00 00"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">WhatsApp</label>
                            <Input
                                value={formData.whatsapp || ''}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                placeholder="+90 555 123 45 67"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">E-posta</label>
                        <Input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="merhaba@digma.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Adres</label>
                        <Textarea
                            value={formData.address || ''}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul"
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted">Çalışma Saatleri</label>
                        <Input
                            value={formData.business_hours || ''}
                            onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
                            placeholder="Pazartesi - Cuma: 09:00 - 18:00"
                        />
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-secondary/30 p-6 rounded-xl border border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Sosyal Medya</h2>
                        <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                            <Plus size={16} className="mr-2" />
                            Ekle
                        </Button>
                    </div>

                    {socialLinks.length === 0 ? (
                        <p className="text-text-muted text-sm">Sosyal medya linki eklenmedi.</p>
                    ) : (
                        <div className="space-y-4">
                            {socialLinks.map((link, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Platform</label>
                                        <Input
                                            value={link.platform}
                                            onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
                                            placeholder="instagram, linkedin, twitter"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">URL</label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={link.url}
                                                onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                                placeholder="https://instagram.com/digmadijital"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => removeSocialLink(index)}
                                                className="shrink-0"
                                            >
                                                <Trash2 size={16} className="text-red-400" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <Button type="submit" variant="accent" size="lg" disabled={saving}>
                        {saving ? (
                            <>
                                <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                                Kaydediliyor...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 w-5 h-5" />
                                Kaydet
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CompanyInfoPage;
