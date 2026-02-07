import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Save, Layout, ChevronUp, ChevronDown, Eye, EyeOff, Settings as SettingsIcon } from 'lucide-react';

interface HomepageSection {
    id: string;
    section_key: string;
    title: string;
    description: string | null;
    cta_label: string | null;
    cta_href: string | null;
    is_enabled: boolean;
    order_index: number;
    settings: Record<string, unknown>;
}

const HomepageManager = () => {
    const [sections, setSections] = useState<HomepageSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingSection, setEditingSection] = useState<HomepageSection | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const { data, error } = await supabase
                .from('homepage_sections')
                .select('*')
                .order('order_index', { ascending: true });

            if (error) throw error;
            setSections(data || []);
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!editingSection) return;
        setSaving(true);
        try {
            const { error } = await supabase
                .from('homepage_sections')
                .update({
                    title: editingSection.title,
                    description: editingSection.description,
                    cta_label: editingSection.cta_label,
                    cta_href: editingSection.cta_href,
                    updated_at: new Date().toISOString()
                })
                .eq('id', editingSection.id);

            if (error) throw error;

            setSections(prev => prev.map(s => s.id === editingSection.id ? editingSection : s));
            setEditingSection(null);
            alert('Değişiklikler kaydedildi!');
        } catch (error) {
            console.error('Error saving section:', error);
            alert('Kaydetme sırasında bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const toggleEnabled = async (section: HomepageSection) => {
        try {
            const { error } = await supabase
                .from('homepage_sections')
                .update({ is_enabled: !section.is_enabled })
                .eq('id', section.id);

            if (error) throw error;
            setSections(prev => prev.map(s => s.id === section.id ? { ...s, is_enabled: !s.is_enabled } : s));
        } catch (error) {
            console.error('Error toggling section:', error);
        }
    };

    const moveSection = async (section: HomepageSection, direction: 'up' | 'down') => {
        const currentIndex = sections.findIndex(s => s.id === section.id);
        if (direction === 'up' && currentIndex === 0) return;
        if (direction === 'down' && currentIndex === sections.length - 1) return;

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        const swapSection = sections[newIndex];

        try {
            await supabase
                .from('homepage_sections')
                .update({ order_index: swapSection.order_index })
                .eq('id', section.id);

            await supabase
                .from('homepage_sections')
                .update({ order_index: section.order_index })
                .eq('id', swapSection.id);

            fetchSections();
        } catch (error) {
            console.error('Error moving section:', error);
        }
    };

    const getSectionLabel = (key: string) => {
        const labels: Record<string, string> = {
            hero: 'Hero / Ana Banner',
            logos: 'Referans Logoları',
            services: 'Hizmetler',
            why_digma: 'Neden Digma?',
            how_it_works: 'Nasıl Çalışırız',
            case_studies: 'Başarı Hikayeleri',
            testimonials: 'Müşteri Yorumları',
            team: 'Ekip',
            blog: 'Dijital Rehber (Blog)',
            final_cta: 'Final CTA / İletişim Formu'
        };
        return labels[key] || key;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-text-muted">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-3">
                    <Layout className="text-accent-blue" size={24} />
                    <h1 className="text-xl font-display font-bold text-white">Anasayfa Yönetimi</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 overflow-hidden">
                {/* Section List */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 p-6 overflow-y-auto">
                    <h2 className="text-lg font-bold text-white mb-4">Bölümler</h2>
                    <div className="space-y-2">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className={`p-4 rounded-lg border transition-colors ${editingSection?.id === section.id
                                    ? 'bg-accent-blue/10 border-accent-blue'
                                    : 'bg-secondary/50 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-text-muted">#{index + 1}</span>
                                        <h3 className="font-bold text-white">{getSectionLabel(section.section_key)}</h3>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => moveSection(section, 'up')}
                                            disabled={index === 0}
                                            className="p-1 text-text-muted hover:text-white disabled:opacity-30"
                                        >
                                            <ChevronUp size={16} />
                                        </button>
                                        <button
                                            onClick={() => moveSection(section, 'down')}
                                            disabled={index === sections.length - 1}
                                            className="p-1 text-text-muted hover:text-white disabled:opacity-30"
                                        >
                                            <ChevronDown size={16} />
                                        </button>
                                        <button
                                            onClick={() => toggleEnabled(section)}
                                            className={`p-1 ${section.is_enabled ? 'text-accent-green' : 'text-text-muted'}`}
                                        >
                                            {section.is_enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                                        </button>
                                        <button
                                            onClick={() => setEditingSection(section)}
                                            className="p-1 text-accent-blue hover:text-white"
                                        >
                                            <SettingsIcon size={16} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-text-muted line-clamp-1">{section.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Edit Panel */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 p-6 overflow-y-auto">
                    {editingSection ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white">
                                    {getSectionLabel(editingSection.section_key)} Düzenle
                                </h2>
                                <Button variant="accent" onClick={handleSave} disabled={saving}>
                                    <Save size={16} className="mr-2" />
                                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Başlık</label>
                                    <Input
                                        value={editingSection.title}
                                        onChange={e => setEditingSection({ ...editingSection, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Açıklama</label>
                                    <Textarea
                                        value={editingSection.description || ''}
                                        onChange={e => setEditingSection({ ...editingSection, description: e.target.value })}
                                        rows={3}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">CTA Metni</label>
                                        <Input
                                            value={editingSection.cta_label || ''}
                                            onChange={e => setEditingSection({ ...editingSection, cta_label: e.target.value })}
                                            placeholder="Örn: Tümünü Gör"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">CTA Linki</label>
                                        <Input
                                            value={editingSection.cta_href || ''}
                                            onChange={e => setEditingSection({ ...editingSection, cta_href: e.target.value })}
                                            placeholder="/sayfa veya #id"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-text-muted">Düzenlemek için bir bölüm seçin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomepageManager;
