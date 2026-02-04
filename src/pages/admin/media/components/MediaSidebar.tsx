
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { MediaAsset } from '../MediaLibrary';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { X, Trash2, Copy, Check, ExternalLink } from 'lucide-react';

const MediaSidebar = ({ asset, onUpdate, onDelete, onClose }: {
    asset: MediaAsset;
    onUpdate: (asset: MediaAsset) => void;
    onDelete: (id: string) => void;
    onClose: () => void;
}) => {
    const [formData, setFormData] = useState({
        alt_text: asset.alt_text || '',
        caption: asset.caption || '',
        file_name: asset.file_name || ''
    });
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    // Update local state when prop changes
    if (asset.file_name !== formData.file_name && !saving) {
        // This is a simple sync, normally user effect best
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('media_assets')
                .update(formData)
                .eq('id', asset.id);

            if (error) throw error;
            onUpdate({ ...asset, ...formData });
        } catch (error) {
            console.error('Update error:', error);
            alert('Güncelleme sırasında hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Bu medyayı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;

        try {
            // 1. Delete from Storage
            const { error: storageError } = await supabase.storage
                .from(asset.bucket)
                .remove([asset.path]);

            if (storageError) throw storageError;

            // 2. Delete from DB
            const { error: dbError } = await supabase
                .from('media_assets')
                .delete()
                .eq('id', asset.id);

            if (dbError) throw dbError;

            onDelete(asset.id);
        } catch (error) {
            console.error('Delete error:', error);
            alert('Silme işlemi başarısız.');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(asset.public_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h3 className="font-semibold text-white">Detaylar</h3>
                <button onClick={onClose} className="text-text-muted hover:text-white">
                    <X size={18} />
                </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                {/* Preview */}
                <div className="aspect-video bg-black/20 rounded-lg overflow-hidden flex items-center justify-center border border-white/5">
                    {asset.mime_type?.startsWith('image/') ? (
                        <img src={asset.public_url} alt={asset.alt_text} className="w-full h-full object-contain" />
                    ) : (
                        <div className="text-text-muted text-sm">{asset.mime_type}</div>
                    )}
                </div>

                {/* Metadata Info */}
                <div className="grid grid-cols-2 gap-2 text-xs text-text-muted bg-white/5 p-3 rounded-lg">
                    <div>Boyut:</div>
                    <div className="text-right text-white">{(asset.size / 1024).toFixed(1)} KB</div>
                    <div>Yüklenme:</div>
                    <div className="text-right text-white">{new Date(asset.created_at).toLocaleDateString()}</div>
                    <div>Tip:</div>
                    <div className="text-right text-white truncate">{asset.mime_type}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="flex-1" onClick={copyToClipboard}>
                        {copied ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                        {copied ? 'Kopyalandı' : 'URL Kopyala'}
                    </Button>
                    <a href={asset.public_url} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded hover:bg-white/10 text-text-muted hover:text-white border border-white/10">
                        <ExternalLink size={18} />
                    </a>
                </div>

                {/* Edit Form */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-muted">Dosya Adı</label>
                        <Input
                            name="file_name"
                            value={formData.file_name}
                            onChange={handleChange}
                            className="h-8 text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-muted">Alt Text (SEO)</label>
                        <Input
                            name="alt_text"
                            value={formData.alt_text}
                            onChange={handleChange}
                            className="h-8 text-sm"
                            placeholder="Görseli tanımlayan metin"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-text-muted">Caption</label>
                        <Textarea
                            name="caption"
                            value={formData.caption}
                            onChange={handleChange}
                            className="min-h-[80px] text-sm"
                            placeholder="Görsel altı yazısı..."
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5 flex justify-between gap-3">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    onClick={handleDelete}
                >
                    <Trash2 size={16} className="mr-2" /> Sil
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </Button>
            </div>
        </div>
    );
};

export default MediaSidebar;
