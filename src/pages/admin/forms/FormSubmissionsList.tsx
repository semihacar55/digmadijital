
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Download, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import SubmissionDetail from './components/SubmissionDetail';

export interface FormSubmission {
    id: string;
    form_type: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'contacted' | 'spam' | 'archived';
    ip_address?: string;
    metadata?: Record<string, unknown>;
    notes?: string;
    created_at: string;
}

const FormSubmissionsList = () => {
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('form_submissions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error) {
            console.error('Error fetching form submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatucChange = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('form_submissions')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as FormSubmission['status'] } : s));
            if (selectedSubmission?.id === id) {
                setSelectedSubmission(prev => prev ? { ...prev, status: newStatus as FormSubmission['status'] } : null);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleUpdate = (updated: FormSubmission) => {
        setSubmissions(prev => prev.map(s => s.id === updated.id ? updated : s));
        setSelectedSubmission(updated);
    }

    const exportCSV = () => {
        const headers = ['Tarih', 'Form Tipi', 'Ad Soyad', 'Email', 'Telefon', 'Durum', 'Mesaj'];
        const csvContent = [
            headers.join(','),
            ...filteredSubmissions.map(s => [
                new Date(s.created_at).toLocaleDateString(),
                s.form_type,
                `"${s.name}"`,
                s.email,
                s.phone,
                s.status,
                `"${s.message?.replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'basvurular.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesSearch =
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs flex items-center gap-1"><Clock size={12} /> Yeni</span>;
            case 'contacted': return <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs flex items-center gap-1"><CheckCircle size={12} /> Ulaşıldı</span>;
            case 'spam': return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs flex items-center gap-1"><XCircle size={12} /> Spam</span>;
            default: return <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">{status}</span>;
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between bg-secondary/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-display font-bold text-white">Başvurular</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <Input
                            placeholder="İsim veya email ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 w-64 bg-black/20 border-white/10"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-9 bg-black/20 border border-white/10 rounded-lg px-3 text-sm text-white focus:outline-none focus:border-accent-blue"
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="new">Yeni</option>
                        <option value="contacted">Ulaşıldı</option>
                        <option value="spam">Spam</option>
                    </select>
                </div>
                <Button variant="outline" size="sm" onClick={exportCSV}>
                    <Download size={16} className="mr-2" /> CSV İndir
                </Button>
            </div>

            <div className="flex-1 flex gap-4 min-h-0">
                {/* List */}
                <div className="flex-1 bg-secondary/30 rounded-xl border border-white/5 overflow-hidden flex flex-col">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white/5 text-xs text-text-muted sticky top-0 z-10 backdrop-blur-md">
                                <tr>
                                    <th className="p-4 font-medium">Tarih</th>
                                    <th className="p-4 font-medium">Ad Soyad</th>
                                    <th className="p-4 font-medium">Form Tipi</th>
                                    <th className="p-4 font-medium">İletişim</th>
                                    <th className="p-4 font-medium">Durum</th>
                                    <th className="p-4 font-medium text-right">İşlem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-muted">Yükleniyor...</td></tr>
                                ) : filteredSubmissions.length === 0 ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-muted">Kayıt bulunamadı.</td></tr>
                                ) : (
                                    filteredSubmissions.map(sub => (
                                        <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4 text-sm text-text-muted">{new Date(sub.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 text-sm text-white font-medium">{sub.name}</td>
                                            <td className="p-4 text-sm text-text-muted capitalize">{sub.form_type}</td>
                                            <td className="p-4 text-sm text-text-muted">
                                                <div className="flex flex-col">
                                                    <span>{sub.email}</span>
                                                    <span className="text-xs opacity-70">{sub.phone}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">{getStatusBadge(sub.status)}</td>
                                            <td className="p-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedSubmission(sub)}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Detail Sidebar */}
                {selectedSubmission && (
                    <div className="w-96 bg-secondary/50 rounded-xl border border-white/5 overflow-hidden flex flex-col">
                        <SubmissionDetail
                            submission={selectedSubmission}
                            onClose={() => setSelectedSubmission(null)}
                            onStatusChange={handleStatucChange}
                            onUpdate={handleUpdate}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormSubmissionsList;
