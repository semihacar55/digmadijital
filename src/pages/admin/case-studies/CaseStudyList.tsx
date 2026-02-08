import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Plus, Search, Edit, Trash2, Briefcase, Eye } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';

interface CaseStudy {
    id: string;
    title: string;
    sector: string;
    status: 'draft' | 'published' | 'archived';
    updated_at: string;
    slug: string;
    views_count: number;
}

const CaseStudyList = () => {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .order('updated_at', { ascending: false });

        if (data) setCaseStudies(data);
        if (error) console.error('Error fetching case studies:', error);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bu vaka çalışmasını silmek istediğinize emin misiniz?')) return;

        const { error } = await supabase.from('case_studies').delete().eq('id', id);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            setCaseStudies(caseStudies.filter(c => c.id !== id));
        }
    };

    const filteredStudies = caseStudies.filter(study => {
        const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            study.sector?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || study.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <FadeIn>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">Vaka Çalışmaları</h1>
                    <Link to="/admin/case-studies/new">
                        <Button variant="accent" className="flex items-center gap-2">
                            <Plus size={18} />
                            Yeni Vaka Ekle
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 flex flex-col md:flex-row items-center gap-4">
                    <div className="flex-1 w-full md:w-auto relative">
                        <Input
                            placeholder="Vaka veya sektör ara..."
                            icon={<Search size={16} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-text-muted focus:outline-none focus:border-accent-blue"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                        <option value="archived">Arşivlenmiş</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                                <th className="p-4 text-sm font-medium text-text-muted">Başlık</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Sektör</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Görüntülenme</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Durum</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Son Güncelleme</th>
                                <th className="p-4 text-sm font-medium text-text-muted text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-text-muted">Yükleniyor...</td>
                                </tr>
                            ) : filteredStudies.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-text-muted">Kayıt bulunamadı.</td>
                                </tr>
                            ) : (
                                filteredStudies.map((study) => (
                                    <tr key={study.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center border border-white/10 text-accent-blue">
                                                    <Briefcase size={20} />
                                                </div>
                                                <div>
                                                    <span className="font-medium text-white block">{study.title}</span>
                                                    <span className="text-xs text-text-muted">/{study.slug}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-text-muted">{study.sector || '-'}</td>
                                        <td className="p-4 text-sm text-text-muted">{study.views_count}</td>
                                        <td className="p-4">
                                            <span className={`
                                                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                                ${study.status === 'published'
                                                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                    : study.status === 'draft'
                                                        ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                        : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}
                                            `}>
                                                {study.status === 'published' ? 'Yayında' : study.status === 'draft' ? 'Taslak' : 'Arşiv'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-text-muted">
                                            {new Date(study.updated_at).toLocaleDateString('tr-TR')}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link to={`/vaka-calismalari/${study.slug}`} target="_blank">
                                                    <Button variant="outline" className="h-8 w-8 p-0 flex items-center justify-center" title="Önizle">
                                                        <Eye size={14} />
                                                    </Button>
                                                </Link>
                                                <Link to={`/admin/case-studies/${study.id}`}>
                                                    <Button variant="outline" className="h-8 w-8 p-0 flex items-center justify-center" title="Düzenle">
                                                        <Edit size={14} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="secondary"
                                                    className="h-8 w-8 p-0 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
                                                    onClick={() => handleDelete(study.id)}
                                                    title="Sil"
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

export default CaseStudyList;
