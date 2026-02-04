import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Save, ArrowLeft, Eye, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    client_name: string;
    client_visible: boolean;
    sector: string;
    services: string[];
    status: 'draft' | 'published' | 'archived';
    problem: string;
    solution: string;
    results: { value: string; unit: string; label: string }[];
    process_steps: string[];
    gallery: string[];
    testimonial: { name: string; company: string; quote: string; avatar: string };
    seo_title: string;
    seo_desc: string;
    og_image: string;
    canonical_url: string;
    is_indexable: boolean;
    is_featured: boolean;
    featured_order: number;
}

const CaseStudyEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [availableServices, setAvailableServices] = useState<{ id: string; title: string }[]>([]);

    // Tab state
    const [activeTab, setActiveTab] = useState<'general' | 'content' | 'results' | 'gallery' | 'seo'>('general');

    const [formData, setFormData] = useState<CaseStudy>({
        id: '',
        title: '',
        slug: '',
        excerpt: '',
        cover_image: '',
        client_name: '',
        client_visible: true,
        sector: '',
        services: [],
        status: 'draft',
        problem: '',
        solution: '',
        results: [], // [{ value: '50', unit: '%', label: 'Artış' }]
        process_steps: [],
        gallery: [],
        testimonial: { name: '', company: '', quote: '', avatar: '' },
        seo_title: '',
        seo_desc: '',
        og_image: '',
        canonical_url: '',
        is_indexable: true,
        is_featured: false,
        featured_order: 999,
    });

    useEffect(() => {
        fetchServices();
        if (id) {
            fetchCaseStudy(id);
        }
    }, [id]);

    const fetchServices = async () => {
        const { data } = await supabase.from('services').select('id, title');
        if (data) setAvailableServices(data);
    };

    const fetchCaseStudy = async (studyId: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .eq('id', studyId)
            .single();

        if (error) {
            console.error('Error fetching case study:', error);
            navigate('/admin/case-studies');
            return;
        }

        if (data) {
            setFormData({
                ...data,
                services: data.services || [],
                results: data.results || [],
                process_steps: data.process_steps || [],
                gallery: data.gallery || [],
                testimonial: data.testimonial || { name: '', company: '', quote: '', avatar: '' },
                seo_title: data.seo_title || '',
                seo_desc: data.seo_desc || '',
                og_image: data.og_image || '',
                canonical_url: data.canonical_url || '',
            });
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const dataToSave = {
                ...formData,
                updated_at: new Date().toISOString(),
                published_at: formData.status === 'published' ? new Date().toISOString() : null,
            };

            // Remove id from save data if creating new
            const { id: _, ...payload } = dataToSave;

            let error;
            if (id) {
                const { error: updateError } = await supabase
                    .from('case_studies')
                    .update(payload)
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('case_studies')
                    .insert([payload]);
                error = insertError;
            }

            if (error) throw error;
            alert('Başarıyla kaydedildi!');
            if (!id) navigate('/admin/case-studies');

        } catch (error) {
            alert('Hata: ' + (error instanceof Error ? error.message : 'Bir hata oluştu'));
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-');
    };

    const handleServiceToggle = (serviceTitle: string) => {
        setFormData(prev => {
            const exists = prev.services.includes(serviceTitle);
            return {
                ...prev,
                services: exists
                    ? prev.services.filter(s => s !== serviceTitle)
                    : [...prev.services, serviceTitle]
            };
        });
    };

    // Generic array handlers
    const addResult = () => setFormData(p => ({ ...p, results: [...p.results, { value: '', unit: '', label: '' }] }));
    const removeResult = (idx: number) => setFormData(p => ({ ...p, results: p.results.filter((_, i) => i !== idx) }));
    const updateResult = (idx: number, field: string, val: string) => {
        const newResults = [...formData.results];
        newResults[idx] = { ...newResults[idx], [field]: val };
        setFormData({ ...formData, results: newResults });
    };

    const addProcessStep = () => setFormData(p => ({ ...p, process_steps: [...p.process_steps, ''] }));
    const removeProcessStep = (idx: number) => setFormData(p => ({ ...p, process_steps: p.process_steps.filter((_, i) => i !== idx) }));
    const updateProcessStep = (idx: number, val: string) => {
        const newSteps = [...formData.process_steps];
        newSteps[idx] = val;
        setFormData({ ...formData, process_steps: newSteps });
    };

    const handleImageUpload = async (_: unknown, field: 'cover_image' | 'og_image' | 'gallery') => {
        // Mock upload for now or simple prompt
        // Ideally integrate real file upload
        const url = prompt("Resim URL'ini giriniz:");
        if (url) {
            if (field === 'gallery') {
                setFormData(p => ({ ...p, gallery: [...p.gallery, url] }));
            } else {
                setFormData(p => ({ ...p, [field]: url }));
            }
        }
    };

    return (
        <FadeIn>
            <div className="space-y-8 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={() => navigate('/admin/case-studies')} className="p-2">
                            <ArrowLeft size={20} />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">
                            {id ? 'Vaka Düzenle' : 'Yeni Vaka Ekle'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {id && (
                            <a href={`/vaka-calismalari/${formData.slug}`} target="_blank" rel="noreferrer">
                                <Button variant="secondary" className="gap-2">
                                    <Eye size={18} /> Önizle
                                </Button>
                            </a>
                        )}
                        <Button variant="accent" onClick={handleSave} disabled={loading} className="gap-2">
                            <Save size={18} />
                            {loading ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 overflow-x-auto">
                    {[
                        { id: 'general', label: 'Genel Bilgiler' },
                        { id: 'content', label: 'İçerik & Süreç' },
                        { id: 'results', label: 'Sonuçlar & Referans' },
                        { id: 'gallery', label: 'Galeri' },
                        { id: 'seo', label: 'SEO Ayarları' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                ? 'border-accent-blue text-accent-blue'
                                : 'border-transparent text-text-muted hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* GENERAL TAB */}
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Başlık</label>
                                    <Input
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value, slug: !id ? generateSlug(e.target.value) : formData.slug })}
                                        placeholder="Örn: X Markası İçin %200 Büyüme"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Slug (URL)</label>
                                    <Input
                                        value={formData.slug}
                                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Müşteri Adı</label>
                                        <Input
                                            value={formData.client_name}
                                            onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Sektör</label>
                                        <select
                                            className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-blue"
                                            value={formData.sector}
                                            onChange={e => setFormData({ ...formData, sector: e.target.value })}
                                        >
                                            <option value="">Seçiniz...</option>
                                            <option value="Teknoloji">Teknoloji</option>
                                            <option value="E-Ticaret">E-Ticaret</option>
                                            <option value="Sağlık">Sağlık</option>
                                            <option value="Eğitim">Eğitim</option>
                                            <option value="Gayrimenkul">Gayrimenkul</option>
                                            <option value="Diğer">Diğer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Kısa Özet (Excerpt)</label>
                                    <textarea
                                        rows={4}
                                        className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent-blue"
                                        value={formData.excerpt}
                                        onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted mb-2 block">Kullanılan Hizmetler</label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableServices.map(service => (
                                            <button
                                                key={service.id}
                                                onClick={() => handleServiceToggle(service.title)}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${formData.services.includes(service.title)
                                                    ? 'bg-accent-blue/20 border-accent-blue text-accent-blue'
                                                    : 'bg-secondary border-white/10 text-text-muted hover:border-white/20'
                                                    }`}
                                            >
                                                {service.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTENT TAB */}
                        {activeTab === 'content' && (
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Problem / Zorluklar</label>
                                    <textarea
                                        rows={6}
                                        className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent-blue font-mono text-sm"
                                        value={formData.problem}
                                        onChange={e => setFormData({ ...formData, problem: e.target.value })}
                                        placeholder="Markdown formatında..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Çözüm / Yaklaşım</label>
                                    <textarea
                                        rows={8}
                                        className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent-blue font-mono text-sm"
                                        value={formData.solution}
                                        onChange={e => setFormData({ ...formData, solution: e.target.value })}
                                        placeholder="Markdown formatında..."
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-text-muted">Süreç Adımları</label>
                                        <Button size="sm" variant="outline" onClick={addProcessStep} className="gap-2">
                                            <Plus size={14} /> Adım Ekle
                                        </Button>
                                    </div>
                                    {formData.process_steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <span className="flex-none w-8 h-10 flex items-center justify-center bg-white/5 rounded text-sm text-text-muted">{idx + 1}</span>
                                            <Input
                                                value={step}
                                                onChange={e => updateProcessStep(idx, e.target.value)}
                                                placeholder={`Adım ${idx + 1}...`}
                                            />
                                            <Button variant="secondary" onClick={() => removeProcessStep(idx)} className="px-3 text-red-400">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RESULTS TAB */}
                        {activeTab === 'results' && (
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-text-muted">KPI Sonuçları</label>
                                        <Button size="sm" variant="outline" onClick={addResult} className="gap-2">
                                            <Plus size={14} /> Sonuç Ekle
                                        </Button>
                                    </div>
                                    {formData.results.map((res, idx) => (
                                        <div key={idx} className="flex gap-4 items-start bg-secondary/50 p-4 rounded-xl border border-white/5">
                                            <div className="grid grid-cols-3 gap-4 flex-1">
                                                <div>
                                                    <label className="text-xs text-text-muted mb-1 block">Değer</label>
                                                    <Input value={res.value} onChange={e => updateResult(idx, 'value', e.target.value)} placeholder="250" />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-text-muted mb-1 block">Birim</label>
                                                    <Input value={res.unit} onChange={e => updateResult(idx, 'unit', e.target.value)} placeholder="%" />
                                                </div>
                                                <div>
                                                    <label className="text-xs text-text-muted mb-1 block">Etiket</label>
                                                    <Input value={res.label} onChange={e => updateResult(idx, 'label', e.target.value)} placeholder="Trafik Artışı" />
                                                </div>
                                            </div>
                                            <Button variant="secondary" onClick={() => removeResult(idx)} className="mt-6 text-red-400">
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/10">
                                    <h3 className="text-lg font-bold text-white">Müşteri Yorumu (Testimonial)</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            placeholder="İsim Soyisim"
                                            value={formData.testimonial.name}
                                            onChange={e => setFormData({ ...formData, testimonial: { ...formData.testimonial, name: e.target.value } })}
                                        />
                                        <Input
                                            placeholder="Firma / Ünvan"
                                            value={formData.testimonial.company}
                                            onChange={e => setFormData({ ...formData, testimonial: { ...formData.testimonial, company: e.target.value } })}
                                        />
                                    </div>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent-blue"
                                        placeholder="Müşteri yorumu..."
                                        value={formData.testimonial.quote}
                                        onChange={e => setFormData({ ...formData, testimonial: { ...formData.testimonial, quote: e.target.value } })}
                                    />
                                </div>
                            </div>
                        )}

                        {/* GALLERY TAB */}
                        {activeTab === 'gallery' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-white">Proje Görselleri</h3>
                                    <Button variant="outline" size="sm" onClick={() => handleImageUpload(null, 'gallery')} className="gap-2">
                                        <Plus size={16} /> Görsel Ekle
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {formData.gallery.map((img, idx) => (
                                        <div key={idx} className="relative group aspect-video rounded-lg overflow-hidden bg-secondary border border-white/10">
                                            <img src={img} alt="" className="w-full h-full object-cover" />
                                            <button
                                                onClick={() => setFormData(p => ({ ...p, gallery: p.gallery.filter((_, i) => i !== idx) }))}
                                                className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEO TAB */}
                        {activeTab === 'seo' && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">SEO Başlığı (Title)</label>
                                    <Input
                                        value={formData.seo_title}
                                        onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                                        placeholder="Max 60 karakter"
                                    />
                                    <p className="text-xs text-right text-text-muted">{formData.seo_title.length} / 60</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Meta Açıklama (Description)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full bg-secondary border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent-blue"
                                        value={formData.seo_desc}
                                        onChange={e => setFormData({ ...formData, seo_desc: e.target.value })}
                                        placeholder="Max 160 karakter"
                                    />
                                    <p className="text-xs text-right text-text-muted">{formData.seo_desc.length} / 160</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Canonical URL</label>
                                    <Input
                                        value={formData.canonical_url}
                                        onChange={e => setFormData({ ...formData, canonical_url: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="indexable"
                                        checked={formData.is_indexable}
                                        onChange={e => setFormData({ ...formData, is_indexable: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-600 bg-secondary text-accent-blue focus:ring-accent-blue"
                                    />
                                    <label htmlFor="indexable" className="text-sm text-white">Arama motorları tarafından dizinlensin</label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <div className="bg-secondary/30 p-6 rounded-xl border border-white/5 space-y-4">
                            <h3 className="font-bold text-white mb-4">Yayın Ayarları</h3>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Durum</label>
                                <select
                                    className="w-full bg-primary border border-white/10 rounded-lg p-2.5 text-white"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                                >
                                    <option value="draft">Taslak</option>
                                    <option value="published">Yayında</option>
                                    <option value="archived">Arşiv</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.is_featured}
                                        onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-600 bg-secondary text-accent-blue focus:ring-accent-blue"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-white">Anasayfada Göster</label>
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

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Görünürlük</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.client_visible}
                                        onChange={e => setFormData({ ...formData, client_visible: e.target.checked })}
                                    />
                                    <span className="text-sm text-text-muted">Müşteri adı sitede görünsün</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary/30 p-6 rounded-xl border border-white/5 space-y-4">
                            <h3 className="font-bold text-white mb-4">Kapak Görseli</h3>
                            {formData.cover_image ? (
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group">
                                    <img src={formData.cover_image} alt="Cover" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="secondary" size="sm" onClick={() => handleImageUpload(null, 'cover_image')}>
                                            Değiştir
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleImageUpload(null, 'cover_image')}
                                    className="aspect-video rounded-lg border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-text-muted hover:border-accent-blue/50 hover:text-accent-blue cursor-pointer transition-colors"
                                >
                                    <ImageIcon size={24} />
                                    <span className="text-sm">Görsel Yükle</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
};

export default CaseStudyEditor;
