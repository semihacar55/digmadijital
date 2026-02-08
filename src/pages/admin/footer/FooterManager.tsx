import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { getLayoutSettings, updateLayoutSettings, type FooterColumn, type SocialLink, type ContactInfo } from '../../../services/layout.service';

const FooterManager = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [columns, setColumns] = useState<FooterColumn[]>([]);
    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [contact, setContact] = useState<ContactInfo>({});
    const [copyright, setCopyright] = useState('');
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        const settings = await getLayoutSettings();
        if (settings) {
            setColumns(settings.footer_columns || []);
            setSocials(settings.footer_socials || []);
            setContact(settings.footer_contact || {});
            setCopyright(settings.footer_copyright);
            setEnabled(settings.footer_enabled);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const result = await updateLayoutSettings({
            footer_columns: columns,
            footer_socials: socials,
            footer_contact: contact,
            footer_copyright: copyright,
            footer_enabled: enabled,
        });

        if (result.success) {
            alert('Footer ayarları başarıyla güncellendi!');
            window.location.reload();
        } else {
            alert('Hata: ' + result.error);
        }
        setSaving(false);
    };

    const addColumn = () => {
        setColumns([...columns, { title: 'Yeni Kolon', links: [] }]);
    };

    const updateColumn = (index: number, field: 'title', value: string) => {
        const updated = [...columns];
        updated[index] = { ...updated[index], [field]: value };
        setColumns(updated);
    };

    const addLinkToColumn = (columnIndex: number) => {
        const updated = [...columns];
        updated[columnIndex].links.push({ label: 'Yeni Link', href: '/' });
        setColumns(updated);
    };

    const updateLink = (columnIndex: number, linkIndex: number, field: 'label' | 'href', value: string) => {
        const updated = [...columns];
        updated[columnIndex].links[linkIndex] = { ...updated[columnIndex].links[linkIndex], [field]: value };
        setColumns(updated);
    };

    const removeLink = (columnIndex: number, linkIndex: number) => {
        const updated = [...columns];
        updated[columnIndex].links = updated[columnIndex].links.filter((_, i) => i !== linkIndex);
        setColumns(updated);
    };

    const removeColumn = (index: number) => {
        setColumns(columns.filter((_: any, i: number) => i !== index));
    };

    const addSocial = () => {
        setSocials([...socials, { platform: 'instagram', url: '#' }]);
    };

    const updateSocial = (index: number, field: 'platform' | 'url', value: any) => {
        const updated = [...socials];
        updated[index] = { ...updated[index], [field]: value };
        setSocials(updated);
    };

    const removeSocial = (index: number) => {
        setSocials(socials.filter((_, i) => i !== index));
    };

    if (loading) {
        return <div className="p-8 text-text-muted">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Footer Yönetimi</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-blue/80 disabled:bg-accent-blue/50 text-white rounded-lg transition-colors"
                >
                    <Save size={18} />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
            </div>

            {/* Footer Columns */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Footer Kolonları</h2>
                    <button
                        onClick={addColumn}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        Kolon Ekle
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {columns.map((column, colIndex) => (
                        <div key={colIndex} className="bg-background border border-white/10 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={column.title}
                                    onChange={(e) => updateColumn(colIndex, 'title', e.target.value)}
                                    placeholder="Kolon Başlığı"
                                    className="flex-1 bg-secondary border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
                                />
                                <button
                                    onClick={() => removeColumn(colIndex)}
                                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {column.links.map((link: any, linkIndex: number) => (
                                    <div key={linkIndex} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={link.label}
                                            onChange={(e) => updateLink(colIndex, linkIndex, 'label', e.target.value)}
                                            placeholder="Link Adı"
                                            className="flex-1 bg-secondary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue"
                                        />
                                        <input
                                            type="text"
                                            value={link.href}
                                            onChange={(e) => updateLink(colIndex, linkIndex, 'href', e.target.value)}
                                            placeholder="/sayfa"
                                            className="flex-1 bg-secondary border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-blue"
                                        />
                                        <button
                                            onClick={() => removeLink(colIndex, linkIndex)}
                                            className="p-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={() => addLinkToColumn(colIndex)}
                                    className="text-sm text-accent-blue hover:text-accent-blue/80"
                                >
                                    + Link Ekle
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Media */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Sosyal Medya</h2>
                    <button
                        onClick={addSocial}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        Sosyal Medya Ekle
                    </button>
                </div>

                <div className="space-y-3">
                    {socials.map((social, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <select
                                value={social.platform}
                                onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                                className="bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
                            >
                                <option value="instagram">Instagram</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="twitter">Twitter</option>
                                <option value="facebook">Facebook</option>
                                <option value="youtube">YouTube</option>
                            </select>
                            <input
                                type="text"
                                value={social.url}
                                onChange={(e) => updateSocial(index, 'url', e.target.value)}
                                placeholder="https://..."
                                className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-blue"
                            />
                            <button
                                onClick={() => removeSocial(index)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">İletişim Bilgileri</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-2">Adres</label>
                        <input
                            type="text"
                            value={contact.address || ''}
                            onChange={(e) => setContact({ ...contact, address: e.target.value })}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-2">Telefon</label>
                            <input
                                type="text"
                                value={contact.phone || ''}
                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-text-muted mb-2">E-posta</label>
                            <input
                                type="email"
                                value={contact.email || ''}
                                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-secondary border border-white/10 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-bold text-white">Copyright & Ayarlar</h2>

                <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Copyright Metni</label>
                    <input
                        type="text"
                        value={copyright}
                        onChange={(e) => setCopyright(e.target.value)}
                        placeholder="© 2024 Digma Dijital. Tüm hakları saklıdır."
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                    />
                </div>

                <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setEnabled(e.target.checked)}
                        className="rounded"
                    />
                    Footer Aktif
                </label>
            </div>
        </div>
    );
};

export default FooterManager;
