import { useState, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import SEO from '../components/seo/SEO';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { PageHero } from '../components/ui/PageHero';
import { FadeIn } from '../components/animations/FadeIn';
import { submitForm } from '../services/form.service';
import { getPageByKey } from '../services/pages.service';
import { getCompanyInfo, getDefaultCompanyInfo, type CompanyInfo } from '../services/company.service';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [loading, setLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState('İletişim');
    const [heroSubtitle, setHeroSubtitle] = useState('Bizimle iletişime geçin');
    const [companyInfo, setCompanyInfo] = useState<Partial<CompanyInfo>>(getDefaultCompanyInfo());
    const [formEnabled, setFormEnabled] = useState(true);
    const [seoTitle, setSeoTitle] = useState('İletişim | Digma Dijital');
    const [seoDescription, setSeoDescription] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        honeypot: '' // Spam protection
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            // Fetch page content (hero, SEO, form settings)
            const page = await getPageByKey('contact');
            if (page) {
                setHeroTitle(page.hero_title || 'İletişim');
                setHeroSubtitle(page.hero_subtitle || 'Bizimle iletişime geçin');
                setFormEnabled(page.contact_form_enabled);
                setSeoTitle(page.seo_title || 'İletişim | Digma Dijital');
                setSeoDescription(page.seo_description || '');
            }

            // Fetch company info (centralized contact details)
            const info = await getCompanyInfo();
            if (info) {
                setCompanyInfo(info);
            }

            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg('');

        const res = await submitForm({
            form_type: 'contact',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            honeypot: formData.honeypot
        });

        if (res.success) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
        } else {
            setStatus('error');
            setErrorMsg(res.error || 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const handleRetry = () => {
        setStatus('idle');
        setErrorMsg('');
    };

    // Schema.org LocalBusiness structured data
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": companyInfo.company_name || "Digma Dijital",
        "telephone": companyInfo.phone || "",
        "email": companyInfo.email || "",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "İstanbul",
            "addressCountry": "TR",
            "streetAddress": companyInfo.address || ""
        },
        ...(companyInfo.business_hours && {
            "openingHours": companyInfo.business_hours
        }),
        ...(companyInfo.social_links && companyInfo.social_links.length > 0 && {
            "sameAs": companyInfo.social_links.map(link => link.url)
        })
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
            <SEO
                title={seoTitle}
                description={seoDescription}
                schema={localBusinessSchema}
            />

            <PageHero
                title={heroTitle}
                subtitle={heroSubtitle}
                breadcrumb={[{ label: 'Digma' }, { label: 'İletişim' }]}
            />

            <div className="pb-12 px-4 bg-transparent">
                <Section className="bg-surface/30 rounded-3xl">
                    <FadeIn>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                            {/* Left: Info */}
                            <div className="space-y-6">
                                {companyInfo.email && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-gold shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">E-posta</h3>
                                            <p className="text-text-muted">{companyInfo.email}</p>
                                        </div>
                                    </div>
                                )}
                                {companyInfo.phone && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-gold shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Telefon</h3>
                                            <p className="text-text-muted">{companyInfo.phone}</p>
                                            {companyInfo.whatsapp && companyInfo.whatsapp !== companyInfo.phone && (
                                                <p className="text-text-muted text-sm mt-1">WhatsApp: {companyInfo.whatsapp}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {companyInfo.address && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-gold shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Adres</h3>
                                            <p className="text-text-muted">{companyInfo.address}</p>
                                        </div>
                                    </div>
                                )}
                                {companyInfo.business_hours && (
                                    <div className="pt-4 border-t border-white/10">
                                        <h3 className="text-lg font-bold text-white mb-2">Çalışma Saatleri</h3>
                                        <p className="text-text-muted">{companyInfo.business_hours}</p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Form */}
                            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5">
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
                                ) : status === 'error' ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 mb-6">
                                            <Mail size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Bir Hata Oluştu</h3>
                                        <p className="text-text-muted mb-8">{errorMsg}</p>
                                        <Button variant="default" onClick={handleRetry}>Tekrar Dene</Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Honeypot field - hidden from users */}
                                        <div className="hidden" aria-hidden="true">
                                            <input
                                                type="text"
                                                name="website"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={formData.honeypot}
                                                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Ad Soyad</label>
                                            <Input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Adınız Soyadınız"
                                                aria-label="Ad Soyad"
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
                                                aria-label="E-posta"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-muted">Telefon</label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+90 555 123 45 67"
                                                aria-label="Telefon"
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
                                                aria-label="Mesaj"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="w-full h-12 text-lg"
                                            disabled={status === 'submitting'}
                                        >
                                            {status === 'submitting' ? (
                                                <>
                                                    <Mail className="mr-2 w-5 h-5 animate-pulse" />
                                                    Gönderiliyor...
                                                </>
                                            ) : (
                                                <>
                                                    Gönder
                                                    <Send className="ml-2" size={18} />
                                                </>
                                            )}
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
