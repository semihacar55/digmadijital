import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { ArrowLeft, Save, Loader2, Globe, Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import { FadeIn } from '../../../components/animations/FadeIn';
import { ImageUpload } from '../../../components/ui/ImageUpload';

// Types for JSON columns
interface ProcessStep {
    title: string;
    desc: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface Benefit {
    title: string;
    desc: string;
}

const ServiceEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id && id !== 'new';

    // Refs for inserting content
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Main Form Data
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        summary: '',
        content: '',
        icon: 'Box',
        status: 'draft',
        seo_title: '',
        seo_desc: '',
        image_url: '', // Hero Image
    });

    // Sub-lists Data
    const [process, setProcess] = useState<ProcessStep[]>([]);
    const [faq, setFaq] = useState<FAQItem[]>([]);
    const [benefits, setBenefits] = useState<Benefit[]>([]);

    useEffect(() => {
        if (isEditing) fetchService();
    }, [id]);

    const fetchService = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setFormData({
                title: data.title || '',
                slug: data.slug || '',
                summary: data.summary || '',
                content: data.content || '',
                icon: data.icon || 'Box',
                status: data.status || 'draft',
                seo_title: data.seo_title || '',
                seo_desc: data.seo_desc || '',
                image_url: data.image_url || '',
            });
            // Safely parse JSON or use defaults
            setProcess(Array.isArray(data.process) ? data.process : []);
            setFaq(Array.isArray(data.faq) ? data.faq : []);
            setBenefits(Array.isArray(data.benefits) ? data.benefits : []);
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

    // --- Helper for Array Fields ---

    const addItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, emptyItem: T) => {
        setList(prev => [...prev, emptyItem]);
    };

    const removeItem = <T,>(setList: React.Dispatch<React.SetStateAction<T[]>>, index: number) => {
        setList(prev => prev.filter((_, i) => i !== index));
    };

    const updateItem = <T,>(
        setList: React.Dispatch<React.SetStateAction<T[]>>,
        index: number,
        field: keyof T,
        value: string
    ) => {
        setList(prev => {
            const newList = [...prev];
            newList[index] = { ...newList[index], [field]: value };
            return newList;
        });
    };

    // --- Image Insertion (Markdown) ---

    // This is a bit of a hack to use the ImageUpload component just to get a URL
    // without binding it to a specific form field directly.
    // In a real app we might put this in a modal.
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

            // Restore focus (timeout helps with React state update cycle)
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
            }, 0);
        } else {
            // Fallback
            setFormData(prev => ({ ...prev, content: prev.content + markdownImage }));
        }
    };

    // --- Submit ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            process,
            faq,
            benefits,
            // features can be added similarly if needed later
        };

        let error;

        if (isEditing) {
            const { error: err } = await supabase.from('services').update(payload).eq('id', id);
            error = err;
        } else {
            const { error: err } = await supabase.from('services').insert([payload]);
            error = err;
        }

        setSaving(false);

        if (error) {
            alert('Hata: ' + error.message);
        } else {
            navigate('/admin/services');
        }
    };

    if (loading) return <div className="p-8 text-center text-white">Yükleniyor...</div>;

    return (
        <FadeIn>
            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div className="flex items-center justify-between sticky top-20 bg-primary/95 backdrop-blur z-20 py-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="h-10 w-10 p-0 flex items-center justify-center rounded-full"
                            onClick={() => navigate('/admin/services')}
                        >
                            <ArrowLeft size={20} />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">
                            {isEditing ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="h-10 rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                        >
                            <option value="draft">Taslak</option>
                            <option value="published">Yayında</option>
                        </select>
                        <Button variant="accent" disabled={saving}>
                            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                            <span className="ml-2">{saving ? 'Kaydediliyor...' : 'Kaydet'}</span>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Basic Info */}
                        <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                            <h2 className="text-lg font-semibold text-white mb-4">Temel Bilgiler</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Başlık</label>
                                <Input name="title" value={formData.title} onChange={handleTitleChange} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Kısa Özet (Hero Yanı)</label>
                                <Textarea name="summary" value={formData.summary} onChange={handleChange} rows={3} />
                            </div>

                            {/* Rich Content Editor */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-text-muted">Detaylı İçerik (Markdown)</label>
                                    <div className="relative">
                                        <label htmlFor="content-image-upload" className="cursor-pointer text-xs flex items-center gap-1 text-accent-blue hover:text-white transition-colors">
                                            <ImageIcon size={14} /> Görsel Ekle
                                        </label>
                                        <div className="hidden">
                                            <ImageUpload
                                                id="content-image-upload"
                                                onChange={handleContentImageUpload}
                                            // We don't bind value here because we just want the callback
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Textarea
                                    ref={contentTextareaRef}
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="font-mono min-h-[400px]"
                                />
                            </div>
                        </div>

                        {/* PROCESS STEPS */}
                        <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-white">Süreç Adımları</h2>
                                <Button type="button" variant="outline" size="sm" onClick={() => addItem(setProcess, { title: '', desc: '' })}>
                                    <Plus size={16} className="mr-2" /> Ekle
                                </Button>
                            </div>
                            {process.map((step, index) => (
                                <div key={index} className="flex gap-4 items-start bg-black/20 p-4 rounded-lg border border-white/5">
                                    <div className="mt-3 text-text-muted"><GripVertical size={20} /></div>
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="Adım Başlığı (Örn: Keşif & Analiz)"
                                            value={step.title}
                                            onChange={(e) => updateItem(setProcess, index, 'title', e.target.value)}
                                        />
                                        <Textarea
                                            placeholder="Açıklama"
                                            value={step.desc}
                                            onChange={(e) => updateItem(setProcess, index, 'desc', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                    <Button type="button" variant="secondary" className="text-red-400 mt-1" onClick={() => removeItem(setProcess, index)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-4 bg-secondary/30 p-6 rounded-2xl border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-lg font-semibold text-white">Sıkça Sorulan Sorular</h2>
                                <Button type="button" variant="outline" size="sm" onClick={() => addItem(setFaq, { question: '', answer: '' })}>
                                    <Plus size={16} className="mr-2" /> Ekle
                                </Button>
                            </div>
                            {faq.map((item, index) => (
                                <div key={index} className="flex gap-4 items-start bg-black/20 p-4 rounded-lg border border-white/5">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="Soru"
                                            value={item.question}
                                            onChange={(e) => updateItem(setFaq, index, 'question', e.target.value)}
                                        />
                                        <Textarea
                                            placeholder="Cevap"
                                            value={item.answer}
                                            onChange={(e) => updateItem(setFaq, index, 'answer', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                    <Button type="button" variant="secondary" className="text-red-400 mt-1" onClick={() => removeItem(setFaq, index)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">

                        {/* HERO IMAGE UPLOAD */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-4">Hero Görseli</h2>
                            <ImageUpload
                                value={formData.image_url}
                                onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                                label="Kapak Görseli Yükle"
                            />
                        </div>

                        {/* Settings */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <h2 className="text-lg font-semibold text-white mb-4">Ayarlar</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">URL (Slug)</label>
                                <Input name="slug" value={formData.slug} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">İkon (Lucide)</label>
                                <Input name="icon" value={formData.icon} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Benefits / Highlights */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-sm font-semibold text-white">Öne Çıkanlar (Benefits)</h2>
                                <Button type="button" variant="ghost" size="sm" onClick={() => addItem(setBenefits, { title: '', desc: '' })}>
                                    <Plus size={14} />
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {benefits.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="Örn: %100 Memnuniyet"
                                            value={item.title}
                                            onChange={(e) => updateItem(setBenefits, index, 'title', e.target.value)}
                                            className="text-xs"
                                        />
                                        <Button type="button" variant="ghost" className="h-10 w-8 px-0 text-red-400" onClick={() => removeItem(setBenefits, index)}>
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="bg-secondary/30 p-6 rounded-2xl border border-white/5 space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Globe size={18} className="text-accent-blue" />
                                <h2 className="text-lg font-semibold text-white">SEO</h2>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Title</label>
                                <Input name="seo_title" value={formData.seo_title} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Description</label>
                                <Textarea name="seo_desc" value={formData.seo_desc} onChange={handleChange} rows={3} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </FadeIn>
    );
};

export default ServiceEditor;
