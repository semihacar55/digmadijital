

import { CheckCircle, Users } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { GradientCard } from '../components/ui/GradientCard';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { HowItWorks } from '../components/sections/HowItWorks';

import { Hero } from '../components/sections/Hero';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { submitForm } from '../services/form.service';
import { getHomepageSections, type HomepageSection } from '../services/homepage.service';
import { getLogos, type Reference } from '../services/reference.service';
import SEO from '../components/seo/SEO';
import { generateOrganizationSchema } from '../utils/seo-helpers';

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    sector: string;
    services?: string[];
    results?: { value: string; unit: string; label: string }[];
}

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    summary: string;
    cover_image: string;
    category: string;
    published_at: string;
}

const Home = () => {
    const [featuredCaseStudies, setFeaturedCaseStudies] = useState<CaseStudy[]>([]);
    const [loadingCaseStudies, setLoadingCaseStudies] = useState(true);
    const [featuredBlogPosts, setFeaturedBlogPosts] = useState<BlogPost[]>([]);
    const [loadingBlogPosts, setLoadingBlogPosts] = useState(true);
    const [sections, setSections] = useState<HomepageSection[]>([]);
    const [loadingSections, setLoadingSections] = useState(true);
    const [logos, setLogos] = useState<Reference[]>([]);
    const [loadingLogos, setLoadingLogos] = useState(true);

    // Analysis Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMsg(''); // Clear previous errors

        const res: any = await submitForm({
            form_type: 'analysis',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            metadata: {
                website: formData.website,
                budget: formData.budget
            }
        });

        if (res.success) {
            setStatus('success');
            if (res.detail?.email_status === 'failed') {
                // Optional: show a warning toast that email notification failed but record saved
                console.warn('Email notification failed');
            }
            setFormData({ name: '', email: '', phone: '', website: '', budget: '', message: '' });
        } else {
            setStatus('error');
            setErrorMsg(res.error || 'Bir hata oluştu, lütfen tekrar deneyin.');
        }
    };

    useEffect(() => {
        fetchFeaturedCaseStudies();
        fetchFeaturedBlogPosts();
        loadSections();
        fetchLogos();
    }, []);

    const fetchLogos = async () => {
        setLoadingLogos(true);
        const data = await getLogos();
        setLogos(data);
        setLoadingLogos(false);
    };

    const loadSections = async () => {
        setLoadingSections(true);
        const data = await getHomepageSections();
        setSections(data);
        setLoadingSections(false);
    };

    const fetchFeaturedCaseStudies = async () => {
        try {
            const { data, error } = await supabase
                .from('case_studies')
                .select('id, title, slug, excerpt, cover_image, sector, services, results')
                .eq('status', 'published')
                .eq('is_featured', true)
                .order('featured_order', { ascending: true })
                .limit(3);

            if (error) throw error;
            setFeaturedCaseStudies(data || []);
        } catch (error) {
            console.error('Error fetching featured case studies:', error);
        } finally {
            setLoadingCaseStudies(false);
        }
    };

    const fetchFeaturedBlogPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('id, title, slug, summary, cover_image, category, published_at')
                .eq('status', 'published')
                .eq('is_featured', true)
                .order('featured_order', { ascending: true })
                .limit(3);

            if (error) throw error;
            setFeaturedBlogPosts(data || []);
        } catch (error) {
            console.error('Error fetching featured blog posts:', error);
        } finally {
            setLoadingBlogPosts(false);
        }
    };

    const renderSection = (section: HomepageSection) => {
        switch (section.section_key) {
            case 'hero':
                return null; // Handled explicitly at top of page
            case 'logos':
                return (
                    <div key={section.id} className="relative border-y border-white/5 py-10 overflow-hidden">
                        {/* Premium Glassmorphism Background */}
                        <div className="absolute inset-0 bg-surface/50 backdrop-blur-md" />
                        <div className="absolute inset-0 bg-gradient-radial from-accent-gold/5 via-transparent to-transparent" />

                        <div className="container mx-auto px-4 relative z-10">
                            <h3 className="text-center text-text-muted text-sm uppercase tracking-widest mb-8">
                                {section.title || 'Global ve Yerel Markaların Güvenilir İş Ortağı'}
                            </h3>
                            {loadingLogos ? (
                                <div className="flex justify-center gap-8 md:gap-16 opacity-30">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="h-12 w-32 bg-white/20 rounded animate-pulse" />
                                    ))}
                                </div>
                            ) : logos.length > 0 ? (
                                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                                    {logos.map((logo) => (
                                        <div
                                            key={logo.id}
                                            className="h-12 w-auto flex items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                            title={logo.brand_name}
                                        >
                                            <img
                                                src={logo.logo_url}
                                                alt={logo.brand_name}
                                                className="h-full w-auto object-contain max-w-[150px]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-text-muted text-sm">Henüz referans logo eklenmedi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'services':
                return (
                    <Section key={section.id} id="hizmetler" className="relative">
                        {/* Gradient Orb Overlays */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent-magenta/10 to-transparent rounded-full blur-[120px] -translate-y-1/2" />
                            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-accent-emerald/10 to-transparent rounded-full blur-[130px] translate-y-1/2" />
                        </div>

                        <div className="relative z-10">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                                    {section.title}
                                    {section.section_key === 'services' && section.settings?.highlight && (
                                        <span className="text-primary block">{section.settings.highlight as string}</span>
                                    )}
                                </h2>
                                <p className="text-text-muted text-lg">{section.description}</p>
                            </div>
                            <ServicesGrid limit={6} />
                        </div>
                    </Section>
                );
            case 'why_digma':
                return (
                    <Section key={section.id} className="relative overflow-hidden">
                        {/* Premium Glassmorphism Background */}
                        <div className="absolute inset-0 bg-surface-2/30" />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/5 via-transparent to-accent-gold/5" />

                        {/* Diagonal Gradient Streaks */}
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-accent-emerald/10 to-transparent rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 rotate-45" />
                        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-accent-gold/10 to-transparent rounded-full blur-[110px] -translate-x-1/2 translate-y-1/2 -rotate-45" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">{section.title}</h2>
                                {section.description && <p className="text-text-muted mb-8">{section.description}</p>}
                                <div className="space-y-8">
                                    {[
                                        { title: 'Şeffaf Raporlama', desc: 'Her kuruşun nereye gittiğini ve ne getirdiğini panelinizden canlı izleyin.' },
                                        { title: 'Kârlılık Odaklılık', desc: 'Sadece tıklama değil, gerçek satış ve ROI (Yatırım Getirisi) odaklı çalışıyoruz.' },
                                        { title: 'Test Kültürü', desc: 'A/B testleri ile sürekli optimize ediyor, en iyi performansı yakalayana kadar durmuyoruz.' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-12 h-12 rounded-full bg-accent-emerald/10 flex items-center justify-center shrink-0">
                                                <CheckCircle className="text-accent-emerald" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-text-muted">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-gradient-to-tr from-accent-magenta/20 to-accent-emerald/20 backdrop-blur-3xl border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
                                    {/* Abstract Visual Placeholder */}
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <GradientCard className="bg-primary/80 border-0 shadow-2xl skew-y-6 translate-y-8"><div className="h-32"></div></GradientCard>
                                        <GradientCard className="bg-primary/80 border-0 shadow-2xl -skew-y-6"><div className="h-32"></div></GradientCard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>
                );
            case 'how_it_works':
                return <HowItWorks key={section.id} data={section} />;
            case 'case_studies':
                return (
                    <Section key={section.id} className="relative bg-surface-2/50">
                        {/* Layered Depth Background */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-gradient-to-r from-accent-magenta/8 to-transparent rounded-full blur-[120px]" />
                            <div className="absolute bottom-1/3 right-0 w-[700px] h-[700px] bg-gradient-to-l from-accent-emerald/8 to-transparent rounded-full blur-[130px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{section.title}</h2>
                                    {section.description && <p className="text-text-muted">{section.description}</p>}
                                </div>
                                <Link to={section.cta_href || '/vaka-calismalari'}>
                                    <Button variant="outline" className="hidden md:inline-flex">{section.cta_label || 'Tümünü Gör'}</Button>
                                </Link>
                            </div>

                            {loadingCaseStudies ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="aspect-[4/3] bg-white/5 rounded-2xl mb-4" />
                                            <div className="h-6 bg-white/5 rounded mb-2 w-3/4" />
                                            <div className="h-4 bg-white/5 rounded w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            ) : featuredCaseStudies.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredCaseStudies.map((study) => (
                                        <Link key={study.id} to={`/vaka-calismalari/${study.slug}`}>
                                            <div className="group cursor-pointer h-full">
                                                <div className="bg-secondary/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent-gold/50 transition-all duration-300">
                                                    {/* Cover Image with Overlay */}
                                                    <div className="aspect-[16/10] relative overflow-hidden">
                                                        {study.cover_image ? (
                                                            <img
                                                                src={study.cover_image}
                                                                alt={study.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        ) : (
                                                            <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/20 to-accent-emerald/10" />
                                                        )}
                                                        {/* Gradient Overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                                        {/* Sector Badge */}
                                                        <div className="absolute top-4 left-4">
                                                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                                                                {study.sector}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-6 flex flex-col flex-1">
                                                        <h3 className="text-xl font-bold mb-3 group-hover:text-accent-gold transition-colors line-clamp-2">
                                                            {study.title}
                                                        </h3>

                                                        {study.excerpt && (
                                                            <p className="text-text-muted text-sm mb-4 line-clamp-3 flex-1">
                                                                {study.excerpt}
                                                            </p>
                                                        )}

                                                        {/* Service Tags */}
                                                        {study.services && study.services.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {study.services.slice(0, 3).map((service: string, idx: number) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-2 py-1 bg-primary/50 border border-white/10 rounded text-xs text-text-muted"
                                                                    >
                                                                        {service}
                                                                    </span>
                                                                ))}
                                                                {study.services.length > 3 && (
                                                                    <span className="px-2 py-1 text-xs text-text-muted">
                                                                        +{study.services.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* Explore Button */}
                                                        <div className="flex items-center text-accent-gold text-sm font-medium group-hover:gap-2 transition-all">
                                                            <span>İncele</span>
                                                            <svg
                                                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 text-text-muted">
                                    <p>Henüz vaka çalışması eklenmedi.</p>
                                </div>
                            )}

                            <div className="flex justify-center mt-12 md:hidden">
                                <Link to={section.cta_href || '/vaka-calismalari'}>
                                    <Button variant="outline">{section.cta_label || 'Tümünü Gör'}</Button>
                                </Link>
                            </div>
                        </div>
                    </Section>
                );
            case 'testimonials':
                return (
                    <Section key={section.id} className="relative">
                        {/* Soft Ambient Glow */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-accent-magenta/8 via-accent-gold/5 to-transparent rounded-full blur-[140px]" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">{section.title}</h2>
                            <Testimonials />
                        </div>
                    </Section>
                );
            case 'team':
                return (
                    <Section key={section.id} className="bg-surface-2/20">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">{section.title}</h2>
                            {section.description && <p className="text-text-muted">{section.description}</p>}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="group text-center">
                                    <div className="aspect-square rounded-full bg-white/5 mb-4 mx-auto overflow-hidden border border-white/10 group-hover:border-accent-gold transition-colors relative">
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                                        {/* Photo placeholder */}
                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                            <Users size={32} />
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-white text-lg">İsim Soyisim</h4>
                                    <p className="text-accent-gold text-sm">Uzmanlık Alanı</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                );
            case 'blog':
                return (
                    <Section key={section.id} className="relative bg-surface/30">
                        {/* Subtle Dot Pattern Background */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[size:40px_40px] opacity-50" />
                            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-accent-green/8 to-transparent rounded-full blur-[120px]" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
                                <Link to={section.cta_href || '/blog'} className="text-accent-gold hover:text-white transition-colors text-sm font-medium">{section.cta_label || 'Tüm Yazılar'} &rarr;</Link>
                            </div>

                            {loadingBlogPosts ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="h-48 bg-white/5 rounded-xl mb-4" />
                                            <div className="h-4 bg-white/5 rounded mb-2 w-1/4" />
                                            <div className="h-6 bg-white/5 rounded mb-3 w-3/4" />
                                            <div className="h-4 bg-white/5 rounded w-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : featuredBlogPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {featuredBlogPosts.map((post) => (
                                        <Link key={post.id} to={`/blog/${post.slug}`} className="block h-full">
                                            <div className="group h-full flex flex-col">
                                                <div className="h-48 bg-secondary rounded-xl mb-4 overflow-hidden shrink-0">
                                                    {post.cover_image ? (
                                                        <img
                                                            src={post.cover_image}
                                                            alt={post.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-accent-magenta/20 to-accent-emerald/10" />
                                                    )}
                                                </div>
                                                <span className="text-accent-gold text-xs font-bold uppercase tracking-wider mb-2">{post.category || 'Rehber'}</span>
                                                <h3 className="text-lg font-bold mb-3 leading-snug group-hover:text-accent-gold transition-colors line-clamp-2">
                                                    {post.title}
                                                </h3>
                                                <p className="text-text-muted text-sm line-clamp-3 mt-auto">
                                                    {post.summary}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-text-muted">Henüz blog yazısı eklenmedi.</p>
                                </div>
                            )}
                        </div>
                    </Section>
                );
            case 'final_cta':
                return (
                    <Section key={section.id} id="ucretsiz-analiz" className="py-0">
                        {/* Enhanced Premium Glassmorphism Container */}
                        <div className="relative rounded-3xl overflow-hidden">
                            {/* Animated Border Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-magenta/30 via-accent-gold/20 to-accent-emerald/20 animate-pulse-slow" />

                            {/* Glassmorphism Form Container */}
                            <div className="relative bg-gradient-to-br from-accent-magenta/20 to-accent-gold/10 backdrop-blur-xl rounded-3xl p-8 md:p-16 text-center border border-white/20 m-[2px]">
                                {/* Background Orbs */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                                    <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-accent-magenta/20 to-transparent rounded-full blur-[100px]" />
                                    <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-accent-emerald/20 to-transparent rounded-full blur-[120px]" />
                                </div>

                                <div className="relative z-10 max-w-2xl mx-auto">
                                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{section.title}</h2>
                                    {section.description && <p className="text-xl text-text-muted mb-10">{section.description}</p>}

                                    {/* Analysis Form */}
                                    {status === 'success' ? (
                                        <div className="bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
                                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6">
                                                <CheckCircle size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Başvurunuz Alındı!</h3>
                                            <p className="text-text-muted mb-8">Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                                            <Button variant="outline" onClick={() => setStatus('idle')}>Yeni Başvuru Yap</Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4 text-left bg-card/80 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                                            {/* Form Layout */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Ad Soyad</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors disabled:opacity-50"
                                                        placeholder="Adınız"
                                                        disabled={status === 'submitting'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">E-posta</label>
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors disabled:opacity-50"
                                                        placeholder="ornek@sirket.com"
                                                        disabled={status === 'submitting'}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Telefon</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors disabled:opacity-50"
                                                        placeholder="555..."
                                                        disabled={status === 'submitting'}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1 text-muted-foreground">Web Sitesi</label>
                                                    <input
                                                        type="url"
                                                        value={formData.website}
                                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors disabled:opacity-50"
                                                        placeholder="sirket.com"
                                                        disabled={status === 'submitting'}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Aylık Reklam Bütçesi</label>
                                                <select
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors disabled:opacity-50"
                                                    disabled={status === 'submitting'}
                                                >
                                                    <option value="">Seçiniz</option>
                                                    <option value="Belirtmek İstemiyorum">Belirtmek İstemiyorum</option>
                                                    <option value="10.000₺ - 50.000₺">10.000₺ - 50.000₺</option>
                                                    <option value="50.000₺ - 100.000₺">50.000₺ - 100.000₺</option>
                                                    <option value="100.000₺+">100.000₺+</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-muted-foreground">Notunuz</label>
                                                <textarea
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors h-24 disabled:opacity-50"
                                                    placeholder="Hedeflerinizden kısaca bahsedin..."
                                                    disabled={status === 'submitting'}
                                                ></textarea>
                                            </div>

                                            {status === 'error' && (
                                                <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                                    {errorMsg}
                                                </div>
                                            )}

                                            <Button
                                                variant="default"
                                                size="lg"
                                                className="w-full"
                                                type="submit"
                                                disabled={status === 'submitting'}
                                            >
                                                {status === 'submitting' ? 'Gönderiliyor...' : 'Analizi Gönder'}
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Section>
                );
            default:
                return null;
        }
    };

    if (loadingSections) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="animate-pulse text-text-muted">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <>
            <SEO
                title="Digma Dijital | Performans Pazarlama Ajansı"
                description="Markanızı veri odaklı stratejilerle büyütüyoruz. SEO, Google Ads, Sosyal Medya Yönetimi ve Web Yazılım hizmetleri."
                schema={generateOrganizationSchema()}
            />

            <Hero />
            {sections.map(section => section.is_enabled && renderSection(section))}
        </>
    );
};

export default Home;

