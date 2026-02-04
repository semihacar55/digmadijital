
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { ArrowLeft, Save, Loader2, Globe, Image as ImageIcon, Search, Layout, Settings as SettingsIcon } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';
import { ImageUpload } from '../../../components/ui/ImageUpload';

const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        summary: '',
        content: '',
        cover_image: '',
        category: '',
        tags: [] as string[],
        status: 'draft',
        published_at: '',
        author_id: '',
        // SEO
        seo_title: '',
        seo_desc: '',
        focus_keyword: '',
        canonical_url: '',
        is_indexable: true,
        is_featured: false,
        featured_order: 999,
    });

    useEffect(() => {
        if (isEditing) fetchPost();
        getCurrentUser();
    }, [id]);

    const getCurrentUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && !formData.author_id) {
            setFormData(prev => ({ ...prev, author_id: user.id }));
        }
    };

    const fetchPost = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setFormData({
                ...data,
                tags: data.tags || [],
                seo_title: data.seo_title || '',
                seo_desc: data.seo_desc || '',
                focus_keyword: data.focus_keyword || '',
                canonical_url: data.canonical_url || '',
                summary: data.summary || '',
                cover_image: data.cover_image || '',
                category: data.category || '',
                published_at: data.published_at ? new Date(data.published_at).toISOString().slice(0, 16) : ''
            });
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: !isEditing && !prev.slug ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : prev.slug
        }));
    };

    const handleContentImageUpload = (url: string) => {
        if (!url) return;
        const markdownImage = `\n![Görsel Açıklaması](${url})\n`;
        const textarea = contentTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = formData.content;
            const newText = text.substring(0, start) + markdownImage + text.substring(end);
            setFormData(prev => ({ ...prev, content: newText }));
        } else {
            setFormData(prev => ({ ...prev, content: prev.content + markdownImage }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            published_at: formData.status === 'published' && !formData.published_at
                ? new Date().toISOString()
                : formData.published_at || null
        };

        if (isEditing) {
            const { error } = await supabase.from('posts').update(payload).eq('id', id);
            if (error) alert('Hata: ' + error.message);
            else navigate('/admin/blog');
        } else {
            const { error } = await supabase.from('posts').insert([payload]);
            if (error) alert('Hata: ' + error.message);
            else navigate('/admin/blog');
        }
        setSaving(false);
    };

    if (loading) return <div className="p-8 text-center text-white">Yükleniyor...</div>;

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-0 bg-primary/95 backdrop-blur z-30 py-4 border-b border-white/5 px-4 -mx-4 lg:-mx-8 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="h-10 w-10 p-0 flex items-center justify-center rounded-full"
                            onClick={() => navigate('/admin/blog')}
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">
                            {isEditing ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex bg-secondary rounded-lg p-1 border border-white/10">
                            <button
                                type="button"
                                onClick={() => setActiveTab('content')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'content' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
                            >
                                <Layout size={14} className="inline mr-2" /> İçerik
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('seo')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'seo' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
                            >
                                <Search size={14} className="inline mr-2" /> SEO
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('settings')}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-text-muted hover:text-white'}`}
                            >
                                <SettingsIcon size={14} className="inline mr-2" /> Ayarlar
                            </button>
                        </div>
                        <Button variant="accent" disabled={saving}>
                            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            <span className="ml-2 hidden sm:inline">{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Tabs */}
                <div className="sm:hidden flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 border-b border-white/5">
                    <button type="button" onClick={() => setActiveTab('content')} className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border ${activeTab === 'content' ? 'bg-accent-blue/10 border-accent-blue text-accent-blue' : 'border-white/10 text-text-muted'}`}>İçerik</button>
                    <button type="button" onClick={() => setActiveTab('seo')} className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border ${activeTab === 'seo' ? 'bg-accent-blue/10 border-accent-blue text-accent-blue' : 'border-white/10 text-text-muted'}`}>SEO</button>
                    <button type="button" onClick={() => setActiveTab('settings')} className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full border ${activeTab === 'settings' ? 'bg-accent-blue/10 border-accent-blue text-accent-blue' : 'border-white/10 text-text-muted'}`}>Ayarlar</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN (Main Content) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* CONTENT TAB */}
                        {activeTab === 'content' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Başlık</label>
                                        <Input name="title" value={formData.title} onChange={handleTitleChange} required placeholder="Blog yazısı başlığı..." className="text-lg font-semibold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Özet (Excerpt)</label>
                                        <Textarea name="summary" value={formData.summary} onChange={handleChange} rows={3} placeholder="Liste sayfalarında görünecek kısa açıklama..." />
                                    </div>
                                </div>

                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-text-muted">İçerik (Markdown)</label>
                                        <div className="relative">
                                            <label htmlFor="content-image-upload" className="cursor-pointer text-xs flex items-center gap-1 text-accent-blue hover:text-white transition-colors">
                                                <ImageIcon size={14} /> Görsel Ekle
                                            </label>
                                            <div className="hidden">
                                                <ImageUpload
                                                    onChange={handleContentImageUpload}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Textarea
                                        ref={contentTextareaRef}
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        className="font-mono min-h-[500px] text-base"
                                        placeholder="# Başlık\n\nBuraya içeriğinizi yazın..."
                                    />
                                </div>
                            </div>
                        )}

                        {/* SEO TAB */}
                        {activeTab === 'seo' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe size={18} className="text-accent-blue" />
                                        <h2 className="text-lg font-semibold text-white">Arama Motoru Optimizasyonu</h2>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-text-muted">SEO Başlığı</label>
                                            <span className={`text-xs ${formData.seo_title.length > 60 ? 'text-red-400' : 'text-text-muted'}`}>{formData.seo_title.length} / 60</span>
                                        </div>
                                        <Input
                                            name="seo_title"
                                            value={formData.seo_title}
                                            onChange={handleChange}
                                            placeholder={formData.title}
                                        />
                                        <p className="text-xs text-text-muted">Boş bırakılırsa ana başlık kullanılır.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <label className="text-sm font-medium text-text-muted">Meta Açıklaması</label>
                                            <span className={`text-xs ${formData.seo_desc.length > 160 ? 'text-red-400' : 'text-text-muted'}`}>{formData.seo_desc.length} / 160</span>
                                        </div>
                                        <Textarea name="seo_desc" value={formData.seo_desc} onChange={handleChange} rows={3} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Odak Anahtar Kelime</label>
                                        <Input name="focus_keyword" value={formData.focus_keyword} onChange={handleChange} placeholder="Örn: dijital pazarlama" />
                                    </div>
                                </div>

                                {/* SERP Preview */}
                                <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-sm font-medium text-text-muted mb-2">Google Önizlemesi</h3>
                                    <div className="bg-white p-4 rounded-lg max-w-2xl">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-800">digma.com</span>
                                                <span className="text-xs text-gray-500">https://digma.com/blog/{formData.slug}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate">
                                            {formData.seo_title || formData.title || 'Başlık Yok'}
                                        </h3>
                                        <p className="text-sm text-[#4d5156] line-clamp-2 mt-1">
                                            {formData.seo_desc || formData.summary || 'Açıklama yok...'}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <h3 className="text-sm font-medium text-white mb-2">Gelişmiş SEO</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Canonical URL</label>
                                        <Input name="canonical_url" value={formData.canonical_url} onChange={handleChange} placeholder="Varsayılan: mevcut sayfa URL'si" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-4">
                                        <input
                                            type="checkbox"
                                            id="is_indexable"
                                            checked={formData.is_indexable}
                                            onChange={(e) => setFormData(prev => ({ ...prev, is_indexable: e.target.checked }))}
                                            className="w-4 h-4 rounded border-gray-600 bg-secondary text-accent-blue focus:ring-accent-blue"
                                        />
                                        <label htmlFor="is_indexable" className="text-sm text-text-muted">Arama motorları bu sayfayı indekslesin (index, follow)</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SETTINGS TAB */}
                        {activeTab === 'settings' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <label className="text-lg font-semibold text-white mb-4 block">Yayın Ayarları</label>

                                    {/* Status & Date */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Durum</label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full h-10 rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                                            >
                                                <option value="draft">Taslak</option>
                                                <option value="published">Yayında</option>
                                                <option value="scheduled">Zamanlanmış</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Yayın Tarihi</label>
                                            <Input
                                                type="datetime-local"
                                                name="published_at"
                                                value={formData.published_at}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">URL (Slug)</label>
                                        <Input name="slug" value={formData.slug} onChange={handleChange} />
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-4">
                                            <input
                                                type="checkbox"
                                                id="is_featured"
                                                checked={formData.is_featured}
                                                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                                className="w-4 h-4 rounded border-gray-600 bg-secondary text-accent-blue focus:ring-accent-blue"
                                            />
                                            <label htmlFor="is_featured" className="text-sm font-medium text-white">Anasayfada Göster (Dijital Rehber)</label>
                                        </div>
                                        {formData.is_featured && (
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-muted">Anasayfa Sırası</label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={formData.featured_order}
                                                    onChange={e => setFormData({ ...formData, featured_order: parseInt(e.target.value) || 999 })}
                                                    placeholder="1, 2, 3..."
                                                />
                                                <p className="text-xs text-text-muted">Küçük rakam önce görünür</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                                    <label className="text-lg font-semibold text-white mb-4 block">Sınıflandırma</label>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Kategori</label>
                                        <Input name="category" value={formData.category} onChange={handleChange} placeholder="Örn: Teknoloji, Pazarlama" />
                                    </div>

                                    {/* Features/Tags could go here */}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN (Always visible on large screens, simpler version) */}
                    <div className="hidden lg:block space-y-6">
                        {/* HERO IMAGE */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-4">Kapak Görseli</h2>
                            <ImageUpload
                                value={formData.cover_image}
                                onChange={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                                label="Kapak Görseli Yükle"
                            />
                        </div>

                        {/* Quick Status */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-2">Durum</h2>
                            <div className={`p-3 rounded-lg border text-center font-medium ${formData.status === 'published' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                formData.status === 'scheduled' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                                }`}>
                                {formData.status === 'published' ? 'YAYINDA' : formData.status === 'scheduled' ? 'ZAMANLANDI' : 'TASLAK'}
                            </div>
                            {formData.published_at && (
                                <p className="text-xs text-center text-text-muted">
                                    {new Date(formData.published_at).toLocaleString('tr-TR')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </FadeIn>
    );
};

export default BlogEditor;
