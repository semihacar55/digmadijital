import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Plus, Trash, GripVertical, CheckCircle, Search, Map, Zap, BarChart, Users, Smile, Briefcase } from 'lucide-react';
import type { HomepageSection } from '@/services/homepage.service';

const ICON_OPTIONS = [
    { label: 'Search', value: 'Search', icon: Search },
    { label: 'Map', value: 'Map', icon: Map },
    { label: 'Zap', value: 'Zap', icon: Zap },
    { label: 'BarChart', value: 'BarChart', icon: BarChart },
    { label: 'Users', value: 'Users', icon: Users },
    { label: 'Smile', value: 'Smile', icon: Smile },
    { label: 'Briefcase', value: 'Briefcase', icon: Briefcase },
    { label: 'CheckCircle', value: 'CheckCircle', icon: CheckCircle },
];

export default function HowItWorksManager() {
    const [section, setSection] = useState<HomepageSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial State Structure for Settings
    const [settings, setSettings] = useState({
        badge: 'Süreç',
        steps: [
            { id: '01', title: 'Analiz', desc: 'Durum analizi...', icon: 'Search' },
            { id: '02', title: 'Strateji', desc: 'Yol haritası...', icon: 'Map' },
            { id: '03', title: 'Uygulama', desc: 'Uygulama aşaması...', icon: 'Zap' }
        ],
        stats_enabled: true,
        stats: [
            { value: '15+', label: 'Kişilik Ekip', icon: 'Users' },
            { value: '700+', label: 'Mutlu Müşteri', icon: 'Smile' }
        ]
    });

    useEffect(() => {
        fetchSection();
    }, []);

    const fetchSection = async () => {
        try {
            const { data, error } = await supabase
                .from('homepage_sections')
                .select('*')
                .eq('section_key', 'how_it_works')
                .single();

            if (error) throw error;
            if (data) {
                setSection(data);
                // Merge existing settings with defaults
                setSettings(prev => ({ ...prev, ...(data.settings || {}) }));
            }
        } catch (error) {
            console.error('Error fetching section:', error);
            setMessage({ type: 'error', text: 'Veri yüklenirken hata oluştu.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!section) return;
        setSaving(true);
        setMessage(null);

        try {
            const { error } = await supabase
                .from('homepage_sections')
                .update({
                    title: section.title,
                    description: section.description,
                    is_enabled: section.is_enabled,
                    settings: settings // Save the JSONB structure
                })
                .eq('id', section.id);

            if (error) throw error;
            setMessage({ type: 'success', text: 'Değişiklikler başarıyla kaydedildi.' });
        } catch (error) {
            console.error('Error saving:', error);
            setMessage({ type: 'error', text: 'Kaydederken bir hata oluştu.' });
        } finally {
            setSaving(false);
        }
    };

    // Helper to update a field in a step
    const updateStep = (index: number, field: string, value: string) => {
        const newSteps = [...settings.steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setSettings({ ...settings, steps: newSteps });
    };

    const addStep = () => {
        const id = (settings.steps.length + 1).toString().padStart(2, '0');
        setSettings({
            ...settings,
            steps: [...settings.steps, { id, title: 'Yeni Adım', desc: '', icon: 'CheckCircle' }]
        });
    };

    const removeStep = (index: number) => {
        const newSteps = settings.steps.filter((_, i) => i !== index);
        setSettings({ ...settings, steps: newSteps });
    };

    // Helper to update a field in a stat
    const updateStat = (index: number, field: string, value: string) => {
        const newStats = [...settings.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setSettings({ ...settings, stats: newStats });
    };

    const addStat = () => {
        setSettings({
            ...settings,
            stats: [...settings.stats, { value: '0+', label: 'Yeni İstatistik', icon: 'CheckCircle' }]
        });
    };

    const removeStat = (index: number) => {
        const newStats = settings.stats.filter((_, i) => i !== index);
        setSettings({ ...settings, stats: newStats });
    };

    if (loading) return <div className="p-8 text-white">Yükleniyor...</div>;
    if (!section) return <div className="p-8 text-white">Section bulunamadı (how_it_works).</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Nasıl Çalışırız Bölümü Yönetimi</h1>
                    <p className="text-white/60">Anasayfadaki süreç adımlarını ve istatistikleri buradan yönetebilirsiniz.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-accent-blue hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
            </div>

            {message && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    <CheckCircle size={20} />
                    {message.text}
                </div>
            )}

            {/* General Settings */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Genel Ayarlar</h2>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-white cursor-pointer">
                        <input
                            type="checkbox"
                            checked={section.is_enabled}
                            onChange={(e) => setSection({ ...section, is_enabled: e.target.checked })}
                            className="w-5 h-5 rounded border-white/10 bg-white/5 text-accent-blue focus:ring-accent-blue"
                        />
                        <span>Bölümü Aktif Et</span>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Başlık</label>
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) => setSection({ ...section, title: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Badge (Etiket)</label>
                        <input
                            type="text"
                            value={settings.badge}
                            onChange={(e) => setSettings({ ...settings, badge: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-white/70 mb-2">Açıklama</label>
                        <textarea
                            rows={3}
                            value={section.description || ''}
                            onChange={(e) => setSection({ ...section, description: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-accent-blue focus:ring-1 focus:ring-accent-blue outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Steps Management */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">Süreç Adımları</h2>
                    <button onClick={addStep} className="text-sm flex items-center gap-1 text-accent-blue hover:text-white transition-colors">
                        <Plus size={16} /> Yeni Adım Ekle
                    </button>
                </div>

                <div className="space-y-4">
                    {settings.steps.map((step, index) => (
                        <div key={index} className="bg-black/20 border border-white/5 rounded-lg p-4 group">
                            <div className="flex items-start gap-4">
                                <div className="mt-2 text-white/30">
                                    <GripVertical size={20} />
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4">
                                    <div className="md:col-span-1">
                                        <label className="block text-xs text-white/50 mb-1">No</label>
                                        <input
                                            type="text"
                                            value={step.id}
                                            onChange={(e) => updateStep(index, 'id', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs text-white/50 mb-1">Başlık</label>
                                        <input
                                            type="text"
                                            value={step.title}
                                            onChange={(e) => updateStep(index, 'title', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label className="block text-xs text-white/50 mb-1">Açıklama</label>
                                        <input
                                            type="text"
                                            value={step.desc}
                                            onChange={(e) => updateStep(index, 'desc', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs text-white/50 mb-1">İkon</label>
                                        <select
                                            value={step.icon}
                                            onChange={(e) => updateStep(index, 'icon', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        >
                                            {ICON_OPTIONS.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeStep(index)}
                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Management */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-semibold text-white">İstatistikler</h2>
                        <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.stats_enabled}
                                onChange={(e) => setSettings({ ...settings, stats_enabled: e.target.checked })}
                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-accent-blue focus:ring-accent-blue"
                            />
                            <span>Göster</span>
                        </label>
                    </div>
                    <button onClick={addStat} className="text-sm flex items-center gap-1 text-accent-blue hover:text-white transition-colors">
                        <Plus size={16} /> Yeni İstatistik Ekle
                    </button>
                </div>

                {settings.stats_enabled && (
                    <div className="space-y-4">
                        {settings.stats.map((stat, index) => (
                            <div key={index} className="bg-black/20 border border-white/5 rounded-lg p-4 flex items-start gap-4">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-xs text-white/50 mb-1">Değer (örn: 15+)</label>
                                        <input
                                            type="text"
                                            value={stat.value}
                                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/50 mb-1">Etiket (örn: Mutlu Müşteri)</label>
                                        <input
                                            type="text"
                                            value={stat.label}
                                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/50 mb-1">İkon</label>
                                        <select
                                            value={stat.icon}
                                            onChange={(e) => updateStat(index, 'icon', e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-white text-sm"
                                        >
                                            {ICON_OPTIONS.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeStat(index)}
                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
