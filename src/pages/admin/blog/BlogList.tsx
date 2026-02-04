
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Plus, Search, Edit, Trash2, FileText, Globe, Eye } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';

interface Post {
    id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published' | 'scheduled';
    created_at: string;
    views_count: number;
    category: string;
}

const BlogList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setPosts(data);
        if (error) {
            console.error('Error fetching posts:', error);
            alert('Error fetching posts: ' + error.message);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;

        const { error } = await supabase.from('posts').delete().eq('id', id);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <FadeIn>
            <div className="space-y-6">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-white">Blog Yazıları</h1>
                    <Link to="/admin/blog/new">
                        <Button variant="accent" className="flex items-center gap-2">
                            <Plus size={18} />
                            Yeni Yazı Ekle
                        </Button>
                    </Link>
                </div>

                {/* Filter Bar */}
                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1 w-full sm:w-auto">
                        <Input
                            placeholder="Yazı ara..."
                            icon={<Search size={16} />}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="bg-secondary border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-blue w-full sm:w-48 cursor-pointer hover:bg-white/5 transition-colors"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">Tüm Durumlar</option>
                        <option value="published">Yayında</option>
                        <option value="draft">Taslak</option>
                        <option value="scheduled">Zamanlanmış</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-secondary/30 rounded-xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5">
                                    <th className="p-4 text-sm font-medium text-text-muted">Başlık</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Kategori</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Durum</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Görüntülenme</th>
                                    <th className="p-4 text-sm font-medium text-text-muted text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-text-muted">Yükleniyor...</td>
                                    </tr>
                                ) : filteredPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-text-muted">Kayıt bulunamadı.</td>
                                    </tr>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <tr key={post.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/50 flex items-center justify-center border border-white/10 text-accent-blue">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{post.title}</div>
                                                        <div className="text-xs text-text-muted">/{post.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-text-muted">{post.category || '-'}</td>
                                            <td className="p-4">
                                                <span className={`
                                                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                                    ${post.status === 'published'
                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                        : post.status === 'scheduled'
                                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}
                                                `}>
                                                    {post.status === 'published' ? 'Yayında' : post.status === 'scheduled' ? 'Zamanlanmış' : 'Taslak'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-text-muted">
                                                <div className="flex items-center gap-1">
                                                    <Eye size={14} />
                                                    {post.views_count || 0}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {post.status === 'published' && (
                                                        <a
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="h-8 w-8 flex items-center justify-center rounded-lg border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-colors"
                                                            title="Önizle"
                                                        >
                                                            <Globe size={14} />
                                                        </a>
                                                    )}
                                                    <Link to={`/admin/blog/${post.id}`}>
                                                        <Button variant="outline" className="h-8 w-8 p-0 flex items-center justify-center">
                                                            <Edit size={14} />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="secondary"
                                                        className="h-8 w-8 p-0 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/20"
                                                        onClick={() => handleDelete(post.id)}
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
            </div>
        </FadeIn>
    );
};

export default BlogList;
