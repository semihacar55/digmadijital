
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Upload, Loader2, Grid, List as ListIcon, RefreshCw } from 'lucide-react';
import MediaList from './components/MediaList';
import MediaUploader from './components/MediaUploader';
import MediaSidebar from './components/MediaSidebar';

export interface MediaAsset {
    id: string;
    file_name: string;
    bucket: string;
    path: string;
    public_url: string;
    mime_type: string;
    size: number;
    width?: number;
    height?: number;
    alt_text?: string;
    caption?: string;
    created_at: string;
}

const MediaLibrary = () => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
    const [showUploader, setShowUploader] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('media_assets')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAssets(data || []);
        } catch (error) {
            console.error('Error fetching media assets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadSuccess = async () => {
        setShowUploader(false);
        await fetchAssets();
    };

    const filteredAssets = assets.filter(asset =>
        asset.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (asset.alt_text && asset.alt_text.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-display font-bold text-white">Medya Kütüphanesi</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <Input
                            placeholder="Medya ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 w-64 bg-black/20 border-white/10"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-text-muted'}
                    >
                        <Grid size={18} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-white/10 text-white' : 'text-text-muted'}
                    >
                        <ListIcon size={18} />
                    </Button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchAssets}
                        disabled={loading}
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </Button>
                    <Button
                        variant="accent"
                        size="sm"
                        onClick={() => setShowUploader(true)}
                    >
                        <Upload size={18} className="mr-2" />
                        Medya Yükle
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 min-h-0">
                {/* Main Content Area */}
                <div className="flex-1 bg-secondary/30 rounded-xl border border-white/5 overflow-hidden flex flex-col relative">
                    {showUploader && (
                        <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">
                            <div className="w-full max-w-2xl bg-secondary rounded-2xl border border-white/10 p-6 shadow-2xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-white">Dosya Yükle</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setShowUploader(false)}>Kapat</Button>
                                </div>
                                <MediaUploader onSuccess={handleUploadSuccess} />
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex-1 flex items-center justify-center text-text-muted">
                            <Loader2 className="animate-spin mr-2" size={24} /> Yükleniyor...
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-4">
                            {filteredAssets.length > 0 ? (
                                <MediaList
                                    assets={filteredAssets}
                                    viewMode={viewMode}
                                    selectedId={selectedAsset?.id}
                                    onSelect={setSelectedAsset}
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-text-muted">
                                    <Grid size={48} className="mb-4 opacity-20" />
                                    <p>Henüz hiç medya yüklenmemiş.</p>
                                    <Button variant="ghost" className="text-accent-blue" onClick={() => setShowUploader(true)}>İlk dosyayı yükle</Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                {selectedAsset && (
                    <div className="w-80 bg-secondary/50 rounded-xl border border-white/5 overflow-y-auto">
                        <MediaSidebar
                            asset={selectedAsset}
                            onUpdate={(updated: MediaAsset) => {
                                setAssets(prev => prev.map(a => a.id === updated.id ? updated : a));
                                setSelectedAsset(updated);
                            }}
                            onDelete={(id: string) => {
                                setAssets(prev => prev.filter(a => a.id !== id));
                                setSelectedAsset(null);
                            }}
                            onClose={() => setSelectedAsset(null)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaLibrary;
