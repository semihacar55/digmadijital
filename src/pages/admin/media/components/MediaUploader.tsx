
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Upload, X, File, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaUploaderProps {
    onSuccess: () => void;
}

const MediaUploader = ({ onSuccess }: MediaUploaderProps) => {
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(Array.from(e.target.files));
        }
    };

    const handleFiles = (newFiles: File[]) => {
        // Filter out very large files if needed (e.g. > 10MB)
        const validFiles = newFiles.filter(f => f.size <= 10 * 1024 * 1024);
        if (validFiles.length < newFiles.length) {
            setError('Bazı dosyalar 10MB boyut sınırını aşıyor ve eklenmedi.');
        } else {
            setError(null);
        }
        setFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFiles = async () => {
        if (files.length === 0) return;
        setUploading(true);
        setError(null);

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                // 1. Upload to Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from('media') // Ensure bucket 'media' exists
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('media')
                    .getPublicUrl(filePath);

                // 3. Insert into media_assets table
                const { error: dbError } = await supabase
                    .from('media_assets')
                    .insert([{
                        file_name: file.name,
                        bucket: 'media',
                        path: filePath,
                        public_url: publicUrl,
                        mime_type: file.type,
                        size: file.size,
                        // width/height could be extracted for images if needed
                        alt_text: file.name.split('.')[0], // Default alt text
                    }]);

                if (dbError) {
                    console.error('DB Insert Error:', dbError);
                    // Optional: Delete uploaded file if DB insert fails
                }
            }

            setFiles([]);
            onSuccess();
        } catch (err) {
            console.error('Upload error:', err);
            setError(err instanceof Error ? err.message : 'Yükleme sırasında bir hata oluştu');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
                    dragging
                        ? "border-accent-blue bg-accent-blue/10"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*,video/*,application/pdf"
                    onChange={handleFileSelect}
                />
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    <Upload size={24} />
                </div>
                <p className="text-white font-medium mb-1">Dosyaları buraya sürükleyin veya seçin</p>
                <p className="text-text-muted text-sm">Resim, Video veya PDF (Maks 10MB)</p>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/5">
                            <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center text-text-muted">
                                <File size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate">{file.name}</p>
                                <p className="text-xs text-text-muted">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                className="text-text-muted hover:text-red-400 p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    variant="primary"
                    onClick={uploadFiles}
                    disabled={files.length === 0 || uploading}
                    className="w-full sm:w-auto"
                >
                    {uploading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Yükleniyor ({files.length})...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2" size={18} />
                            Yüklemeyi Başlat
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default MediaUploader;
