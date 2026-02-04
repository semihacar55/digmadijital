
import type { MediaAsset } from '../MediaLibrary';
import { FileVideo, FileText, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaListProps {
    assets: MediaAsset[];
    viewMode: 'grid' | 'list';
    selectedId?: string;
    onSelect: (asset: MediaAsset) => void;
}

const MediaList = ({ assets, viewMode, selectedId, onSelect }: MediaListProps) => {

    const getIcon = (mimeType: string) => {
        if (mimeType.startsWith('video/')) return <FileVideo size={24} />;
        if (mimeType.includes('pdf')) return <FileText size={24} />;
        return <File size={24} />;
    };

    if (viewMode === 'list') {
        return (
            <div className="space-y-1">
                {assets.map(asset => (
                    <div
                        key={asset.id}
                        onClick={() => onSelect(asset)}
                        className={cn(
                            "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors border",
                            selectedId === asset.id
                                ? "bg-accent-blue/10 border-accent-blue"
                                : "bg-white/5 border-transparent hover:bg-white/10"
                        )}
                    >
                        <div className="w-10 h-10 rounded bg-black/20 flex items-center justify-center shrink-0 overflow-hidden">
                            {asset.mime_type?.startsWith('image/') ? (
                                <img src={asset.public_url} alt={asset.alt_text} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-text-muted">{getIcon(asset.mime_type || '')}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{asset.file_name}</p>
                            <p className="text-xs text-text-muted truncate">{asset.alt_text || 'No alt text'}</p>
                        </div>
                        <div className="text-xs text-text-muted hidden sm:block">
                            {(asset.size / 1024).toFixed(1)} KB
                        </div>
                        <div className="text-xs text-text-muted hidden sm:block">
                            {new Date(asset.created_at).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {assets.map(asset => (
                <div
                    key={asset.id}
                    onClick={() => onSelect(asset)}
                    className={cn(
                        "group relative aspect-square rounded-xl border overflow-hidden cursor-pointer transition-all",
                        selectedId === asset.id
                            ? "border-accent-blue ring-2 ring-accent-blue/20"
                            : "border-white/10 hover:border-white/30"
                    )}
                >
                    <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                        {asset.mime_type?.startsWith('image/') ? (
                            <img
                                src={asset.public_url}
                                alt={asset.alt_text}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                        ) : (
                            <div className="text-text-muted group-hover:text-white transition-colors">
                                {getIcon(asset.mime_type || '')}
                            </div>
                        )}
                    </div>

                    {/* Overlay info on hover */}
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-xs text-white truncate">{asset.file_name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MediaList;
