import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, MessageSquare, Plus, Minus } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    desc?: string;
}

interface Service {
    id: string;
    title: string;
    summary: string;
    content: string;
    icon: string;
    seo_title: string;
    seo_desc: string;
    image_url?: string;
    process: ProcessStep[];
    faq: FAQItem[];
    benefits: Benefit[];
}

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data) setService(data);
            if (error) console.error('Error fetching service:', error);
            setLoading(false);
        };

        if (slug) fetchService();
    }, [slug]);

    if (loading) return (
        <Section className="min-h-screen flex items-center justify-center">
            <div className="text-white">Yükleniyor...</div>
        </Section>
    );

    if (!service) return (
        <Section className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl text-white">Hizmet bulunamadı.</h1>
            <Link to="/hizmetler">
                <Button variant="outline">Hizmetlere Dön</Button>
            </Link>
        </Section>
    );

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // SEO Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.seo_desc || service.summary,
        "provider": {
            "@type": "Organization",
            "name": "Digma Dijital"
        }
    };

    const faqJsonLd = service.faq?.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    } : null;

    return (
        <>
            <Helmet>
                <title>{service.seo_title || service.title} | Digma Dijital</title>
                <meta name="description" content={service.seo_desc || service.summary} />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                {faqJsonLd && <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>}
            </Helmet>

            <div className="min-h-screen pt-24 lg:pt-32 pb-20">
                {/* HERO SECTION */}
                <Section className="py-10 lg:py-32 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        {/* Primary Glow */}
                        <div
                            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] opacity-20 sm:opacity-30 animate-pulse"
                            style={{ animationDuration: '8s' }}
                        />
                        {/* Secondary Glow */}
                        <div
                            className="absolute bottom-[0%] right-[-5%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px] opacity-20 sm:opacity-30"
                        />
                        {/* Noise Overlay */}
                        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('/noise.svg')] bg-repeat" />
                    </div>

                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none hidden lg:block" />
                    <div className="container mx-auto px-4 relative z-10">
                        <FadeIn>
                            <div className="max-w-4xl text-left">
                                <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                                    {service.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-text-muted mb-10 leading-relaxed max-w-3xl">
                                    {service.summary}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="accent"
                                        size="lg"
                                        className="w-full sm:w-auto h-14 sm:h-auto text-lg px-8"
                                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        Teklif Al
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto h-14 sm:h-auto text-lg px-8 gap-2"
                                    >
                                        <MessageSquare size={20} />
                                        Bize Ulaşın
                                    </Button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </Section>

                {/* BENEFITS STRIP */}
                {service.benefits && service.benefits.length > 0 && (
                    <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="p-6 flex items-center gap-3 justify-center text-center lg:text-left lg:justify-start">
                                        <CheckCircle2 className="text-accent-blue shrink-0 w-5 h-5" />
                                        <span className="font-medium text-white">{benefit.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT & CONTENT BODY */}
                {(service.content || (service.process && service.process.length > 0)) && (
                    <Section className="py-20">
                        <div className="container mx-auto px-4">
                            {/* CONTENT BODY */}
                            {service.content && (
                                <FadeIn>
                                    <div className="max-w-4xl mx-auto mb-20">
                                        <article className="prose prose-invert prose-lg max-w-none prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-headings:font-display">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    img: ({ node, ...props }) => (
                                                        <img {...props} className="w-full h-auto rounded-xl border border-white/10 shadow-lg" loading="lazy" />
                                                    )
                                                }}
                                            >
                                                {service.content}
                                            </ReactMarkdown>
                                        </article>
                                    </div>
                                </FadeIn>
                            )}

                            {/* PROCESS SECTION */}
                            {service.process && service.process.length > 0 && (
                                <FadeIn>
                                    <div className="max-w-6xl mx-auto">
                                        <div className="text-center mb-16">
                                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Uygulama Sürecimiz</h2>
                                            <p className="text-text-muted">Projenizi başarıya taşırken izlediğimiz adımlar.</p>
                                        </div>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {service.process.map((step, index) => (
                                                <div key={index} className="bg-secondary/30 border border-white/5 p-8 rounded-2xl relative group hover:border-accent-blue/30 transition-colors">
                                                    <div className="text-4xl font-bold text-white/5 absolute top-4 right-6 group-hover:text-accent-blue/10 transition-colors">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                                                    <p className="text-text-muted leading-relaxed relative z-10">{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}
                        </div>
                    </Section>
                )}

                {/* FAQ SECTION */}
                {service.faq && service.faq.length > 0 && (
                    <Section className="py-20 bg-black/20">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sıkça Sorulan Sorular</h2>
                            </div>
                            <div className="space-y-4">
                                {service.faq.map((item, index) => (
                                    <FadeIn key={index} delay={index * 0.1}>
                                        <div className="border border-white/5 rounded-xl bg-secondary/20 overflow-hidden">
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                            >
                                                <span className="font-medium text-white text-lg">{item.question}</span>
                                                {openFaqIndex === index ? (
                                                    <Minus className="text-accent-blue" />
                                                ) : (
                                                    <Plus className="text-text-muted" />
                                                )}
                                            </button>
                                            {openFaqIndex === index && (
                                                <div className="p-6 pt-0 text-text-muted leading-relaxed border-t border-white/5 bg-black/20">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </Section>
                )}

                {/* FINAL CTA */}
                <Section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-secondary to-primary border border-white/10 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Markanızı Büyütmeye Hazır mısınız?
                                </h2>
                                <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
                                    Profesyonel ekibimizle tanışın ve projeniz için en doğru stratejiyi birlikte belirleyelim.
                                </p>
                                <Button
                                    variant="accent"
                                    size="lg"
                                    className="w-full sm:w-auto min-h-[56px] h-auto whitespace-normal py-3 px-8 text-lg"
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    15 Dakikalık Ücretsiz Görüşme
                                </Button>
                            </div>
                            {/* Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent-blue/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
};

export default ServiceDetail;
