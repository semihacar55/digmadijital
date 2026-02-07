import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { PageHero } from '../components/ui/PageHero';
import { FadeIn } from '../components/animations/FadeIn';
import { submitForm } from '../services/form.service';
import { getPageByKey, getDefaultPageContent } from '../services/pages.service';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [loading, setLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState('İletişim');
    const [heroSubtitle, setHeroSubtitle] = useState('Bizimle iletişime geçin');
    const [email, setEmail] = useState('info@digma.com.tr');
    const [phone, setPhone] = useState('+90 216 000 00 00');
    const [address, setAddress] = useState('Teknoloji Vadisi, İstanbul');
    const [formEnabled, setFormEnabled] = useState(true);
    const [seoTitle, setSeoTitle] = useState('İletişim | Digma Dijital');
    const [seoDescription, setSeoDescription] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchPage = async () => {
            const page = await getPageByKey('contact');
            if (page) {
                setHeroTitle(page.hero_title || 'İletişim');
                setHeroSubtitle(page.hero_subtitle || 'Bizimle iletişime geçin');
                setEmail(page.contact_email || 'info@digma.com.tr');
                setPhone(page.contact_phone || '+90 216 000 00 00');
                setAddress(page.contact_address || 'Teknoloji Vadisi, İstanbul');
                setFormEnabled(page.contact_form_enabled);
                setSeoTitle(page.seo_title || 'İletişim | Digma Dijital');
                setSeoDescription(page.seo_description || '');
            } else {
                // Fallback to defaults
                const defaults = getDefaultPageContent('contact');
                setEmail(defaults.contact_email || 'info@digma.com.tr');
                setPhone(defaults.contact_phone || '+90 216 000 00 00');
                setAddress(defaults.contact_address || 'Teknoloji Vadisi, İstanbul');
            }
            setLoading(false);
        };
        fetchPage();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const res: any = await submitForm({
            form_type: 'contact',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        });

        if (res.success) {
            setStatus('success');
            if (res.detail?.email_status === 'failed') {
                alert('Mesajınız kaydedildi ancak bildirim gönderilemedi, lütfen tekrar deneyin.');
            }
            setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
            setStatus('error');
            setErrorMsg(res.error || 'Bir hata oluştu.');
        }
    };

    if (loading) {
        return (
            <div className="pt-12 md:pt-16 pb-12">
                <Section>
                    <div className="text-center text-text-muted">Yükleniyor...</div>
                </Section>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{seoTitle}</title>
                {seoDescription && <meta name="description" content={seoDescription} />}
            </Helmet>

            <PageHero
                title={heroTitle}
                subtitle={heroSubtitle}
                breadcrumb={[{ label: 'Digma' }, { label: 'İletişim' }]}
            />

            <div className="pb-12 px-4">
                <Section>
                    <FadeIn>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                            {/* Left: Info */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">E-posta</h3>
                                        <p className="text-text-muted">{email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Telefon</h3>
                                        <p className="text-text-muted">{phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Adres</h3>
                                        <p className="text-text-muted">{address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="bg-secondary/30 p-8 rounded-2xl border border-white/5">
                                {!formEnabled ? (
                                    <div className="h-full flex items-center justify-center text-center py-12">
                                        <p className="text-text-muted">İletişim formu şu anda devre dışı.</p>
                                    </div>
                                ) : status === 'success' ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                                        <p className="text-text-muted mb-8">En kısa sürede size dönüş yapacağız.</p>
                                        <Button variant="outline" onClick={() => setStatus('idle')}>Yeni Mesaj Gönder</Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Ad Soyad</label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Adınız Soyadınız"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">E-posta</label>
                                            <Input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Telefon</label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+90 555 123 45 67"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Mesajınız</label>
                                            <Textarea
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Projenizden bahseder misiniz?"
                                            />
                                        </div>

                                        {status === 'error' && (
                                            <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                                {errorMsg}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            variant="accent"
                                            className="w-full h-12 text-lg"
                                            disabled={status === 'submitting'}
                                        >
                                            {status === 'submitting' ? 'Gönderiliyor...' : 'Gönder'}
                                            {!status.startsWith('submit') && <Send className="ml-2" size={18} />}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                </Section>
            </div>
        </>
    );
};

export default Contact;
