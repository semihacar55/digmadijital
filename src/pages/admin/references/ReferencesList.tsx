
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/badge';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    MoreVertical,
    MessageSquare,
    Image as ImageIcon
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Reference {
    id: string;
    brand_name: string;
    logo_url: string;
    type: 'logo' | 'testimonial';
    sector: string;
    status: 'active' | 'inactive';
    sort_order: number;
    updated_at: string;
}

const ReferencesList = () => {
    const [references, setReferences] = useState<Reference[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<'all' | 'logo' | 'testimonial'>('all');

    useEffect(() => {
        fetchReferences();
    }, []);

    const fetchReferences = async () => {
        try {
            const { data, error } = await supabase
                .from('references')
                .select('*')
                .order('sort_order', { ascending: true })
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setReferences(data || []);
        } catch (error) {
            console.error('Error fetching references:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

        try {
            const { error } = await supabase
                .from('references')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setReferences(prev => prev.map(ref =>
                ref.id === id ? { ...ref, status: newStatus } : ref
            ));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bu referansı silmek istediğinizden emin misiniz?')) return;

        try {
            const { error } = await supabase
                .from('references')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setReferences(prev => prev.filter(ref => ref.id !== id));
        } catch (error) {
            console.error('Error deleting reference:', error);
        }
    };

    const filteredReferences = references.filter(ref => {
        const matchesSearch = ref.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ref.sector && ref.sector.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = typeFilter === 'all' || ref.type === typeFilter;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">Referanslar</h1>
                    <p className="text-text-muted mt-2">Marka logoları ve müşteri yorumlarını yönetin.</p>
                </div>
                <Link to="/admin/referanslar/new">
                    <Button variant="primary" className="flex items-center gap-2">
                        <Plus size={20} />
                        Yeni Ekle
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-secondary/30 p-4 rounded-xl border border-white/5">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <Input
                        placeholder="Marka veya sektör ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-black/20 border-white/10"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button
                        variant={typeFilter === 'all' ? 'primary' : 'outline'}
                        onClick={() => setTypeFilter('all')}
                        className="flex-1 md:flex-none"
                    >
                        Tümü
                    </Button>
                    <Button
                        variant={typeFilter === 'logo' ? 'primary' : 'outline'}
                        onClick={() => setTypeFilter('logo')}
                        className="flex-1 md:flex-none gap-2"
                    >
                        <ImageIcon size={16} />
                        Logolar
                    </Button>
                    <Button
                        variant={typeFilter === 'testimonial' ? 'primary' : 'outline'}
                        onClick={() => setTypeFilter('testimonial')}
                        className="flex-1 md:flex-none gap-2"
                    >
                        <MessageSquare size={16} />
                        Yorumlar
                    </Button>
                </div>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
                </div>
            ) : filteredReferences.length === 0 ? (
                <Card className="bg-secondary/50 border-white/5 p-12 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="text-text-muted" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Kayıt Bulunamadı</h3>
                    <p className="text-text-muted mb-6">Henüz eklenmiş bir referans yok veya arama kriterlerine uymuyor.</p>
                    <Link to="/admin/referanslar/new">
                        <Button variant="outline">İlk Referansı Ekle</Button>
                    </Link>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredReferences.map((ref) => (
                        <Card key={ref.id} className="bg-secondary/50 border-white/5 p-4 flex flex-col md:flex-row items-center gap-4 hover:border-white/10 transition-colors">
                            {/* Drag Handle (Visual only for now) */}
                            {/* <div className="text-text-muted cursor-move hidden md:block">
                                <GripVertical size={20} />
                            </div> */}

                            {/* Image */}
                            <div className="w-16 h-16 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/5">
                                <img
                                    src={ref.logo_url}
                                    alt={ref.brand_name}
                                    className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <h3 className="font-bold text-white">{ref.brand_name}</h3>
                                    {ref.type === 'testimonial' && (
                                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px]">
                                            Yorum
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-text-muted">
                                    {ref.sector && <span>{ref.sector}</span>}
                                    {ref.sector && <span>•</span>}
                                    <span>Sıra: {ref.sort_order}</span>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${ref.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                <span className="text-sm text-text-muted capitalize">{ref.status === 'active' ? 'Yayında' : 'Pasif'}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => toggleStatus(ref.id, ref.status)}
                                    title={ref.status === 'active' ? 'Yayından Kaldır' : 'Yayınla'}
                                    className="h-9 w-9 p-0"
                                >
                                    {ref.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                                </Button>

                                <Link to={`/admin/referanslar/${ref.id}`}>
                                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                                        <Edit2 size={16} />
                                    </Button>
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-text-muted hover:text-white">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-secondary border-white/10">
                                        <DropdownMenuItem
                                            className="text-red-400 focus:text-red-400 focus:bg-red-900/10 cursor-pointer gap-2"
                                            onClick={() => handleDelete(ref.id)}
                                        >
                                            <Trash2 size={16} />
                                            Sil
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReferencesList;
