
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Plus, Search, Edit, Trash2, Eye, FileText } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';

interface Service {
    id: string;
    title: string;
    status: 'draft' | 'published';
    created_at: string;
    slug: string;
}

const ServicesList = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setServices(data);
        if (error) console.error('Error fetching services:', error);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bu hizmeti silmek istediğinize emin misiniz?')) return;

        const { error } = await supabase.from('services').delete().eq('id', id);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <FadeIn>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">Hizmetler</h1>
                    <Link to="/admin/services/new">
                        <Button variant="accent" className="flex items-center gap-2">
                            <Plus size={18} />
                            Yeni Hizmet Ekle
                        </Button>
                    </Link>
                </div>

                {/* Filter Bar */}
                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                        <Input
                            placeholder="Hizmet ara..."
                            icon={<Search size={16} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-sm font-medium text-text-muted">Başlık</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Slug</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Durum</th>
                                <th className="p-4 text-sm font-medium text-text-muted text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-text-muted">Yükleniyor...</td>
                                </tr>
                            ) : filteredServices.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-text-muted">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filteredServices.map((service) => (
                                    <tr key={service.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center border border-white/10 text-accent-blue">
                                                    <FileText size={20} />
                                                </div>
                                                <span className="font-medium text-white">{service.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-text-muted">/{service.slug}</td>
                                        <td className="p-4">
                                            <span className={`
                                                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                                ${service.status === 'published'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}
                                            `}>
                                                {service.status === 'published' ? 'Yayında' : 'Taslak'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/admin/services/${service.id}`}>
                                                    <Button variant="outline" className="h-8 w-8 p-0 flex items-center justify-center">
                                                        <Edit size={14} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="secondary" // Use secondary for delete to avoid red clashes or create danger variant later
                                                    className="h-8 w-8 p-0 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>
    );
};

export default ServicesList;
