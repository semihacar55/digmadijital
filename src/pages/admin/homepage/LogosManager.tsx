import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trash2, Plus, GripVertical, Save, Link, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

interface Logo {
    id: string;
    name: string;
    logo_url: string;
    alt_text: string;
    link_url: string | null;
    sort_order: number;
    is_enabled: boolean;
}

const LogosManager = () => {
    const [logos, setLogos] = useState<Logo[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchLogos();
    }, []);

    const fetchLogos = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('homepage_logos')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setLogos(data || []);
        } catch (error) {
            console.error('Error fetching logos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedLogos: Logo[]) => {
        setSaving(true);
        try {
            // Upsert all modified logos
            // Note: In a real drag-drop scenario, we'd batch update sort_orders.
            // For now, we update individually or batch if Supabase supports it cleanly.
            // Simple approach: Iterate and update.
            for (const logo of updatedLogos) {
                const { error } = await supabase.from('homepage_logos').upsert({
                    id: logo.id.startsWith('new-') ? undefined : logo.id,
                    name: logo.name,
                    logo_url: logo.logo_url,
                    alt_text: logo.alt_text,
                    link_url: logo.link_url,
                    sort_order: logo.sort_order,
                    is_enabled: logo.is_enabled,
                    updated_at: new Date().toISOString()
                });
                if (error) throw error;
            }

            alert('Değişiklikler kaydedildi!');
            fetchLogos(); // Refresh IDs
        } catch (error) {
            console.error('Error saving logos:', error);
            alert('Hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        const newLogo: Logo = {
            id: `new-${Date.now()}`,
            name: 'Yeni Marka',
            logo_url: 'https://placehold.co/200x80/333/FFF?text=LOGO',
            alt_text: 'Marka Logosu',
            link_url: null,
            sort_order: logos.length + 1,
            is_enabled: true
        };
        setLogos([...logos, newLogo]);
    };

    const handleDelete = async (id: string, index: number) => {
        if (!id.startsWith('new-')) {
            if (!confirm('Bu logoyu silmek istediğinize emin misiniz?')) return;
            await supabase.from('homepage_logos').delete().eq('id', id);
        }
        const newLogos = logos.filter((_, i) => i !== index);
        setLogos(newLogos);
    };

    const updateLogo = (index: number, field: keyof Logo, value: any) => {
        const newLogos = [...logos];
        newLogos[index] = { ...newLogos[index], [field]: value };
        setLogos(newLogos);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index === 0) return;
        if (direction === 'down' && index === logos.length - 1) return;

        const newLogos = [...logos];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;

        // Swap sort orders
        const tempOrder = newLogos[index].sort_order;
        newLogos[index].sort_order = newLogos[swapIndex].sort_order;
        newLogos[swapIndex].sort_order = tempOrder;

        // Swap positions in array
        [newLogos[index], newLogos[swapIndex]] = [newLogos[swapIndex], newLogos[index]];

        setLogos(newLogos);
    };

    if (loading) return <div className="p-8 text-center text-text-muted">Yükleniyor...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <ImageIcon className="text-accent-blue" size={24} />
                    <h1 className="text-2xl font-display font-bold text-white">Referans Logoları</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleAdd}>
                        <Plus size={18} className="mr-2" />
                        Yeni Ekle
                    </Button>
                    <Button variant="accent" onClick={() => handleSave(logos)} disabled={saving}>
                        <Save size={18} className="mr-2" />
                        {saving ? 'Kaydediliyor...' : 'Kaydet'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {logos.map((logo, index) => (
                    <div key={logo.id} className={`bg-secondary/30 border ${logo.is_enabled ? 'border-white/10' : 'border-red-500/20 opacity-70'} rounded-xl p-4 flex flex-col gap-4 group`}>
                        <div className="bg-white/5 rounded-lg p-4 h-24 flex items-center justify-center relative overflow-hidden">
                            {logo.logo_url ? (
                                <img src={logo.logo_url} alt={logo.name} className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                            ) : (
                                <span className="text-text-muted text-xs">Görsel Yok</span>
                            )}
                            <button
                                className="absolute top-2 right-2 p-1 bg-black/50 rounded text-text-muted hover:text-white"
                                onClick={() => updateLogo(index, 'is_enabled', !logo.is_enabled)}
                            >
                                {logo.is_enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                            </button>
                        </div>

                        <div className="space-y-3">
                            <Input
                                value={logo.name}
                                onChange={(e) => updateLogo(index, 'name', e.target.value)}
                                placeholder="Marka Adı"
                                className="h-8 text-sm"
                            />
                            <div className="relative">
                                <Link className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted" size={12} />
                                <Input
                                    value={logo.logo_url}
                                    onChange={(e) => updateLogo(index, 'logo_url', e.target.value)}
                                    placeholder="Logo URL"
                                    className="pl-7 h-8 text-xs font-mono"
                                />
                            </div>
                            <div className="relative">
                                <Link className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted" size={12} />
                                <Input
                                    value={logo.link_url || ''}
                                    onChange={(e) => updateLogo(index, 'link_url', e.target.value)}
                                    placeholder="Website (Opsiyonel)"
                                    className="pl-7 h-8 text-xs font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveItem(index, 'up')} disabled={index === 0}><GripVertical size={14} className="rotate-90" /></Button>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => moveItem(index, 'down')} disabled={index === logos.length - 1}><GripVertical size={14} /></Button>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-400 hover:text-red-300" onClick={() => handleDelete(logo.id, index)}>
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogosManager;
