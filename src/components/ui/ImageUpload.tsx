import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from './Button';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    bucket?: string;
    className?: string;
    label?: string;
    id?: string;
}

export const ImageUpload = ({
    value,
    onChange,
    bucket = 'media',
    className = '',
    label = 'Görsel Yükle',
    id
}: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
            onChange(data.publicUrl);

        } catch (error) {
            alert('Yükleme hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {value ? (
                <div className="relative aspect-video w-full max-w-sm rounded-lg overflow-hidden border border-white/10 bg-black/20 group">
                    <img
                        src={value}
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
                            size="sm"
                            onClick={handleRemove}
                        >
                            <X size={16} className="mr-2" />
                            Kaldır
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-lg cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 text-text-muted animate-spin mb-2" />
                            ) : (
                                <Upload className="w-8 h-8 text-text-muted mb-2" />
                            )}
                            <p className="text-sm text-text-muted">
                                {uploading ? 'Yükleniyor...' : label}
                            </p>
                            <p className="text-xs text-text-muted mt-1">PNG, JPG, GIF up to 2MB</p>
                        </div>
                        <input
                            id={id}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}

            {/* Direct URL Input fallback */}
            {!value && (
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <ImageIcon size={14} />
                        </div>
                        <input
                            type="text"
                            placeholder="veya görsel bağlantısı yapıştırın"
                            className="w-full bg-secondary/30 text-white text-sm rounded-md border border-white/10 py-2 pl-9 pr-3 focus:outline-none focus:border-accent-blue"
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
