import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PremiumBackground } from '../components/ui/PremiumBackground';
import { FadeIn } from '../components/animations/FadeIn';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';

interface CaseStudy {
    id: string;
    title: string;
    excerpt: string;
    cover_image: string;
    client_name: string;
    client_visible: boolean;
    sector: string;
    services: string[];
    published_at: string;
    problem: string;
    solution: string;
    results: { value: string; unit: string; label: string }[];
    process_steps: string[];
    gallery: string[];
    testimonial: { name: string; company: string; quote: string; avatar: string };
    seo_title: string;
    seo_desc: string;
    is_indexable: boolean;
}

const CaseStudyDetail = () => {
    const { slug } = useParams();
    const [study, setStudy] = useState<CaseStudy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) fetchStudy(slug);
    }, [slug]);

    const fetchStudy = async (slug: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published') // Only show published
            .single();

        if (data) setStudy(data);
        if (error) console.error('Error:', error);
        setLoading(false);
    };

    if (loading) {
        return (
            <PremiumBackground>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue"></div>
                </div>
            </PremiumBackground>
        );
    }

    if (!study) {
        return (
            <PremiumBackground>
                <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl font-bold mb-4">Vaka Çalışması Bulunamadı</h1>
                    <Link to="/vaka-calismalari" className="text-accent-blue hover:underline">Listeye Dön</Link>
                </div>
            </PremiumBackground>
        );
    }

    return (
        <PremiumBackground>
            <Helmet>
                <title>{study.seo_title || study.title} | Digma</title>
                <meta name="description" content={study.seo_desc || study.excerpt} />
                {!study.is_indexable && <meta name="robots" content="noindex, nofollow" />}
            </Helmet>

            <article className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <Link to="/vaka-calismalari" className="inline-flex items-center text-sm text-text-muted hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Vaka Çalışmaları
                    </Link>

                    {/* Header */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        <FadeIn>
                            <div className="space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    {study.sector && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10">
                                            {study.sector}
                                        </span>
                                    )}
                                    {study.client_visible && study.client_name && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                                            {study.client_name}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                                    {study.title}
                                </h1>
                                <p className="text-xl text-text-muted leading-relaxed">
                                    {study.excerpt}
                                </p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2} className="relative">
                            <div className="aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                <img src={study.cover_image} alt={study.title} className="w-full h-full object-cover" />
                            </div>
                        </FadeIn>
                    </div>

                    {/* KPI Results */}
                    {study.results && study.results.length > 0 && (
                        <FadeIn delay={0.3}>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                                {study.results.map((res, idx) => (
                                    <div key={idx} className="bg-secondary/40 backdrop-blur border border-white/5 p-6 rounded-2xl text-center hover:border-accent-blue/30 transition-colors">
                                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-display">
                                            {res.value}<span className="text-2xl text-accent-blue ml-1">{res.unit}</span>
                                        </div>
                                        <div className="text-sm md:text-base text-text-muted font-medium uppercase tracking-wider">
                                            {res.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    )}

                    {/* Content: Problem & Solution */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-12">
                            <FadeIn delay={0.4}>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold">!</span>
                                    Problem & Zorluklar
                                </h2>
                                <div className="glass-card p-8 rounded-2xl prose prose-invert max-w-none">
                                    <Markdown remarkPlugins={[remarkGfm]}>{study.problem}</Markdown>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.5}>
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold">✓</span>
                                    Çözüm & Yaklaşım
                                </h2>
                                <div className="glass-card p-8 rounded-2xl prose prose-invert max-w-none">
                                    <Markdown remarkPlugins={[remarkGfm]}>{study.solution}</Markdown>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Sidebar: Services & Steps */}
                        <div className="space-y-8">
                            {study.services && (
                                <FadeIn delay={0.6}>
                                    <div className="glass-card p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-white mb-4">Verilen Hizmetler</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {study.services.map((service, idx) => (
                                                <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-sm text-text-muted">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}

                            {study.process_steps && (
                                <FadeIn delay={0.7}>
                                    <div className="glass-card p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-white mb-4">Süreç Adımları</h3>
                                        <ul className="space-y-4">
                                            {study.process_steps.map((step, idx) => (
                                                <li key={idx} className="flex gap-3">
                                                    <div className="flex-none w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-xs font-bold mt-0.5">
                                                        {idx + 1}
                                                    </div>
                                                    <span className="text-sm text-text-muted leading-relaxed">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeIn>
                            )}
                        </div>
                    </div>

                    {/* Testimonial */}
                    {study.testimonial && study.testimonial.quote && (
                        <FadeIn>
                            <div className="mb-20">
                                <div className="glass-card p-10 md:p-16 rounded-3xl text-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-50"></div>
                                    <span className="text-6xl text-accent-blue/20 font-serif absolute top-8 left-8">"</span>
                                    <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed relative z-10">
                                        "{study.testimonial.quote}"
                                    </blockquote>
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="font-bold text-white">{study.testimonial.name}</div>
                                        <div className="text-sm text-accent-blue">{study.testimonial.company}</div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* Gallery */}
                    {study.gallery && study.gallery.length > 0 && (
                        <FadeIn>
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">Proje Galerisi</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {study.gallery.map((img, idx) => (
                                    <div key={idx} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    )}
                </div>
            </article>
        </PremiumBackground>
    );
};

export default CaseStudyDetail;
