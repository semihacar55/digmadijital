import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface WhyDigmaItem {
    id?: string;
    section_key: string;
    title: string;
    text: string;
    icon: string;
    sort_order: number;
}

interface SectionData {
    id: string;
    title: string;
    description: string;
    image1_url: string;
    image1_alt: string;
    image2_url: string;
    image2_alt: string;
}

const WhyDigmaEditor = () => {
    const [section, setSection] = useState<SectionData | null>(null);
    const [items, setItems] = useState<WhyDigmaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch Section Data
            const { data: sectionData, error: sectionError } = await supabase
                .from('homepage_sections')
                .select('*')
                .eq('section_key', 'why_digma')
                .single();

            if (sectionError) throw sectionError;

            // Fetch Items
            const { data: itemsData, error: itemsError } = await supabase
                .from('homepage_why_digma_items')
                .select('*')
                .order('sort_order', { ascending: true });

            if (itemsError) throw itemsError;

            setSection(sectionData);
            setItems(itemsData || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!section) return;
        setSaving(true);
        try {
            // Update Section
            const { error: sectionError } = await supabase
                .from('homepage_sections')
                .update({
                    title: section.title,
                    description: section.description,
                    image1_url: section.image1_url,
                    image1_alt: section.image1_alt,
                    image2_url: section.image2_url,
                    image2_alt: section.image2_alt,
                    updated_at: new Date().toISOString()
                })
                .eq('id', section.id);

            if (sectionError) throw sectionError;

            // Upsert Items
            // For simplicity, we upsert all items. Deleted items are handled separately by deleteItem.
            for (const item of items) {
                // Correct upsert approach:
                if (item.id) {
                    const { error } = await supabase.from('homepage_why_digma_items').update({
                        title: item.title,
                        text: item.text,
                        icon: item.icon,
                        sort_order: item.sort_order,
                        updated_at: new Date().toISOString()
                    }).eq('id', item.id);
                    if (error) throw error;
                } else {
                    const { error } = await supabase.from('homepage_why_digma_items').insert({
                        section_key: 'why_digma',
                        title: item.title,
                        text: item.text,
                        icon: item.icon,
                        sort_order: item.sort_order
                    });
                    if (error) throw error;
                }
            }

            alert('Kaydedildi!');
            fetchData(); // Refresh to get IDs for new items
        } catch (error) {
            console.error('Error saving:', error);
            alert('Hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const addNewItem = () => {
        setItems([...items, {
            section_key: 'why_digma',
            title: '',
            text: '',
            icon: 'CheckCircle',
            sort_order: items.length + 1
        }]);
    };

    const deleteItem = async (index: number) => {
        const item = items[index];
        if (item.id) {
            if (!confirm('Bu maddeyi silmek istediğinize emin misiniz?')) return;
            await supabase.from('homepage_why_digma_items').delete().eq('id', item.id);
        }
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const updateItem = (index: number, field: keyof WhyDigmaItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === items.length - 1) return;

        const newItems = [...items];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap sort orders
        const tempOrder = newItems[index].sort_order;
        newItems[index].sort_order = newItems[swapIndex].sort_order;
        newItems[swapIndex].sort_order = tempOrder;

        // Swap positions in array
        [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];

        setItems(newItems);
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Yükleniyor...</div>;
    if (!section) return <div className="p-8 text-center text-red-500">Bölüm verisi bulunamadı. Lütfen SQL scriptini çalıştırın.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-display font-bold text-white">"Neden Digma?" Bloğu Düzenle</h1>
                <Button variant="accent" onClick={handleSave} disabled={saving}>
                    <Save size={18} className="mr-2" />
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </Button>
            </div>

            {/* General Settings */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white mb-4">Genel Ayarlar</h2>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Başlık</label>
                    <Input
                        value={section.title}
                        onChange={(e) => setSection({ ...section, title: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Açıklama</label>
                    <Textarea
                        value={section.description || ''}
                        onChange={(e) => setSection({ ...section, description: e.target.value })}
                        rows={3}
                    />
                </div>
            </div>

            {/* Images */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-6">
                <h2 className="text-lg font-bold text-white mb-4">Görseller</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-muted">Görsel 1 (Üst/Sol)</label>
                        <Input
                            value={section.image1_url || ''}
                            onChange={(e) => setSection({ ...section, image1_url: e.target.value })}
                            placeholder="https://..."
                        />
                        <Input
                            value={section.image1_alt || ''}
                            onChange={(e) => setSection({ ...section, image1_alt: e.target.value })}
                            placeholder="Resim açıklaması (Alt text)"
                        />
                        {section.image1_url && (
                            <div className="aspect-video bg-black/20 rounded-lg overflow-hidden border border-white/10 mt-2">
                                <img src={section.image1_url} alt="Preview 1" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-text-muted">Görsel 2 (Alt/Sağ)</label>
                        <Input
                            value={section.image2_url || ''}
                            onChange={(e) => setSection({ ...section, image2_url: e.target.value })}
                            placeholder="https://..."
                        />
                        <Input
                            value={section.image2_alt || ''}
                            onChange={(e) => setSection({ ...section, image2_alt: e.target.value })}
                            placeholder="Resim açıklaması (Alt text)"
                        />
                        {section.image2_url && (
                            <div className="aspect-video bg-black/20 rounded-lg overflow-hidden border border-white/10 mt-2">
                                <img src={section.image2_url} alt="Preview 2" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Feature List */}
            <div className="bg-secondary/30 border border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">Maddeler</h2>
                    <Button variant="outline" size="sm" onClick={addNewItem}>
                        <Plus size={16} className="mr-2" />
                        Yeni Ekle
                    </Button>
                </div>

                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="bg-black/20 border border-white/5 rounded-lg p-4 flex gap-4 items-start">
                            <div className="flex flex-col gap-2 pt-2">
                                <button
                                    onClick={() => moveItem(index, 'up')}
                                    disabled={index === 0}
                                    className="text-text-muted hover:text-white disabled:opacity-20"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => moveItem(index, 'down')}
                                    disabled={index === items.length - 1}
                                    className="text-text-muted hover:text-white disabled:opacity-20"
                                >
                                    <ArrowDown size={16} />
                                </button>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">Başlık</label>
                                        <Input
                                            value={item.title}
                                            onChange={(e) => updateItem(index, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-text-muted mb-1">
                                            İkon (Lucide Name)
                                            <a href="https://lucide.dev/icons" target="_blank" className="ml-2 text-accent-blue hover:text-white">Liste ↗</a>
                                        </label>
                                        <Input
                                            value={item.icon || ''}
                                            onChange={(e) => updateItem(index, 'icon', e.target.value)}
                                            placeholder="Example: CheckCircle"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-text-muted mb-1">Açıklama</label>
                                    <Textarea
                                        value={item.text}
                                        onChange={(e) => updateItem(index, 'text', e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => deleteItem(index)}
                                className="text-red-400 hover:text-red-300 p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyDigmaEditor;
