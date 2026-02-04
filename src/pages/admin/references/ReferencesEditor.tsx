import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ArrowLeft, Save, Upload, Loader2, Image as ImageIcon } from 'lucide-react';

const ReferencesEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        brand_name: '',
        type: 'logo', // logo or testimonial
        logo_url: '',
        website_url: '',
        sector: '',
        sort_order: 0,
        status: 'active',
        content: '',
        person_name: '',
        person_role: '',
        person_company: '',
        rating: 5
    });

    useEffect(() => {
        if (isEditing) {
            fetchReference();
        }
    }, [id]);

    const fetchReference = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('references')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                // Ensure no nulls for form inputs
                setFormData({
                    brand_name: data.brand_name || '',
                    type: data.type || 'logo',
                    logo_url: data.logo_url || '',
                    website_url: data.website_url || '',
                    sector: data.sector || '',
                    sort_order: data.sort_order || 0,
                    status: data.status || 'active',
                    content: data.content || '',
                    person_name: data.person_name || '',
                    person_role: data.person_role || '',
                    person_company: data.person_company || '',
                    rating: data.rating || 5
                });
            }
        } catch (error) {
            console.error('Error fetching reference:', error);
            alert('Referans bilgileri yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `references/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('public')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('public')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, logo_url: publicUrl }));
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Resim yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.brand_name) {
            alert('Lütfen marka adını giriniz.');
            return;
        }

        if (!formData.logo_url) {
            alert('Lütfen bir logo/ikon yükleyiniz.');
            return;
        }

        try {
            setSaving(true);

            const dataToSave = { ...formData };

            // Clean up unnecessary fields based on type
            if (dataToSave.type === 'logo') {
                // @ts-ignore - explicitly setting to null for DB cleanup
                dataToSave.content = null;
                // @ts-ignore
                dataToSave.person_name = null;
                // @ts-ignore
                dataToSave.person_role = null;
                // @ts-ignore
                dataToSave.person_company = null;
                // @ts-ignore
                dataToSave.rating = null;
            }

            let error;
            if (isEditing) {
                const { error: updateError } = await supabase
                    .from('references')
                    .update(dataToSave)
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('references')
                    .insert([dataToSave]);
                error = insertError;
            }

            if (error) throw error;

            navigate('/admin/referanslar');
        } catch (error) {
            console.error('Error saving reference:', error);
            alert('Kaydedilirken bir hata oluştu.');
        } finally {
            setSaving(false);
        }
    };

    if (loading && isEditing) {
        return <div className="p-8 text-center text-white">Yükleniyor...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin/referanslar')}
                    className="h-10 w-10 border-white/10 hover:bg-white/5 p-0"
                >
                    <ArrowLeft size={20} />
                </Button>
                <div>
                    <h1 className="text-3xl font-display font-bold text-white">
                        {isEditing ? 'Referans Düzenle' : 'Yeni Referans'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card className="bg-secondary/50 border-white/5 p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Type Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Referans Türü</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full h-10 rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            >
                                <option value="logo">Sadece Logo (Brand Strip)</option>
                                <option value="testimonial">Müşteri Yorumu (Testimonial)</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Durum</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full h-10 rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            >
                                <option value="active">Yayında (Aktif)</option>
                                <option value="inactive">Taslak (Pasif)</option>
                            </select>
                        </div>

                        {/* Brand Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Marka Adı <span className="text-red-500">*</span></label>
                            <Input
                                name="brand_name"
                                value={formData.brand_name}
                                onChange={handleChange}
                                placeholder="Örn: Acme Corp"
                            />
                        </div>

                        {/* Sector */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Sektör</label>
                            <Input
                                name="sector"
                                value={formData.sector || ''}
                                onChange={handleChange}
                                placeholder="Örn: Teknoloji"
                            />
                        </div>

                        {/* Sort Order */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Sıralama</label>
                            <Input
                                type="number"
                                name="sort_order"
                                value={formData.sort_order}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Website URL */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Web Sitesi (Opsiyonel)</label>
                            <Input
                                name="website_url"
                                value={formData.website_url || ''}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <label className="text-sm font-medium text-text-muted">Logo / Görsel <span className="text-red-500">*</span></label>

                        <div className="flex gap-6 items-start">
                            <div className="w-32 h-32 bg-black/20 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden relative group">
                                {formData.logo_url ? (
                                    <img
                                        src={formData.logo_url}
                                        alt="Preview"
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <ImageIcon className="text-white/20" size={32} />
                                )}
                            </div>

                            <div className="flex-1 space-y-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="relative overflow-hidden"
                                    disabled={loading}
                                >
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={16} />
                                            Yükleniyor...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="mr-2" size={16} />
                                            Görsel Yükle
                                        </>
                                    )}
                                </Button>
                                <p className="text-sm text-text-muted">
                                    PNG, JPG veya SVG formatında, tercihen transparan arkaplanlı logo yükleyin.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Testimonial Specific Fields */}
                {formData.type === 'testimonial' && (
                    <Card className="bg-secondary/50 border-white/5 p-6 space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Müşteri Yorumu Detayları</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-muted">Yorum Metni <span className="text-red-500">*</span></label>
                            <Textarea
                                name="content"
                                value={formData.content || ''}
                                onChange={handleChange}
                                placeholder="Müşterinin yorumu..."
                                className="min-h-[120px]"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Kişi Adı Soyadı</label>
                                <Input
                                    name="person_name"
                                    value={formData.person_name || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Ünvan / Pozisyon</label>
                                <Input
                                    name="person_role"
                                    value={formData.person_role || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Puan (1-5)</label>
                                <select
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="w-full h-10 rounded-lg border border-white/10 bg-secondary px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                                >
                                    <option value="5">5 Yıldız</option>
                                    <option value="4">4 Yıldız</option>
                                    <option value="3">3 Yıldız</option>
                                    <option value="2">2 Yıldız</option>
                                    <option value="1">1 Yıldız</option>
                                </select>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/referanslar')}
                        disabled={saving}
                    >
                        İptal
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="min-w-[120px]"
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={16} />
                                Kaydediliyor
                            </>
                        ) : (
                            <>
                                <Save className="mr-2" size={16} />
                                Kaydet
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReferencesEditor;
