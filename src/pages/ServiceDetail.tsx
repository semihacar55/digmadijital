import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, MessageSquare, Plus, Minus } from 'lucide-react';
import { FadeIn } from '../components/animations/FadeIn';
import SEO from '../components/seo/SEO';
import { ServiceDetailContent } from '../components/content/ServiceDetailContent';
import type { Service, CTATemplate } from '../types/service';
import { HeroSection } from '../components/ui/HeroSection';



// CTA Templates - defined in code
const CTA_TEMPLATES: CTATemplate[] = [
    {
        key: 'get-offer',
        defaultLabel: 'Teklif Al',
        defaultHref: '/#ucretsiz-analiz',
        defaultVariant: 'default',
        defaultTarget: 'same_tab',
        order: 0
    },
    {
        key: 'contact',
        defaultLabel: 'Bize Ulaşın',
        defaultHref: '/iletisim',
        defaultVariant: 'outline',
        defaultTarget: 'same_tab',
        order: 1
    },
    {
        key: 'book-call',
        defaultLabel: '15 Dakikalık Ücretsiz Görüşme',
        defaultHref: '/#ucretsiz-analiz',
        defaultVariant: 'secondary',
        defaultTarget: 'same_tab',
        order: 2
    }
];

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            // Fetch service
            const { data: serviceData, error: serviceError } = await supabase
                .from('services')
                .select('*')
                .eq('slug', slug)
                .single();

            if (serviceError) {
                console.error('Error fetching service:', serviceError);
            } else if (serviceData) {
                setService(serviceData);
            }

            setLoading(false);
        };
        if (slug) fetchData();
    }, [slug]);

    // Helper: Merge templates with database overrides
    const getMergedCTAs = () => {
        return CTA_TEMPLATES.map(template => {
            const override = service?.cta_overrides?.[template.key] || {};

            return {
                key: template.key,
                label: override.label ?? template.defaultLabel,
                href: override.href ?? template.defaultHref,
                variant: override.variant ?? template.defaultVariant,
                target: override.target ?? template.defaultTarget,
                isEnabled: override.isEnabled ?? true,
                order: template.order
            };
        })
            .filter(btn => btn.isEnabled && btn.label && btn.href)
            .sort((a, b) => a.order - b.order);
    };


    // CTA Rendering Helper
    const renderCTA = (
        label: string,
        href: string,
        target: 'same_tab' | 'new_tab',
        variant: 'default' | 'outline' | 'secondary' | 'ghost' | 'accent' = 'default',
        className: string = 'rounded-full px-7 h-12 text-base'
    ) => {

        if (!href || !label) return null; // Hide if empty

        const isExternal = href.startsWith('http://') || href.startsWith('https://');
        const targetAttr = target === 'new_tab' ? '_blank' : undefined;
        const rel = isExternal && target === 'new_tab' ? 'noopener noreferrer' : undefined;

        const button = (
            <Button variant={variant} size="lg" className={className}>
                {label}
                {variant === 'default' && <ArrowRight className="ml-2 w-5 h-5" />}
                {variant === 'outline' && label.includes('Ulaş') && <MessageSquare size={20} className="mr-2" />}
            </Button>
        );

        if (isExternal) {
            return (
                <a href={href} target={targetAttr} rel={rel}>
                    {button}
                </a>
            );
        }

        return <Link to={href}>{button}</Link>;
    };

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

    const graphSchema = {
        "@context": "https://schema.org",
        "@graph": [
            jsonLd,
            ...(faqJsonLd ? [faqJsonLd] : [])
        ]
    };

    return (
        <>
            <SEO
                title={`${service.seo_title || service.title} | Digma Dijital`}
                description={service.seo_desc || service.summary}
                schema={graphSchema}
            />

            {/* Page Wrapper - Default Theme - Transparent for Global Background */}
            <div className="min-h-screen relative overflow-hidden bg-transparent text-foreground">

                {/* HERO SECTION - Aceternity Landing Style */}
                <HeroSection
                    title={service.title}
                    subtitle={service.summary}
                    ctas={getMergedCTAs().map(btn => ({
                        label: btn.label,
                        href: btn.href,
                        variant: btn.variant,
                        target: btn.target === 'new_tab' ? '_blank' : undefined,
                        rel: btn.target === 'new_tab' ? 'noopener noreferrer' : undefined
                    }))}
                    imageSrc={service.image_url}
                    className="mb-0"
                />

                {/* BENEFITS STRIP - Glass Theme */}
                {service.benefits && service.benefits.length > 0 && (
                    <div className="border-y border-white/10 bg-surface/30 backdrop-blur-md">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
                                {service.benefits.map((benefit, index) => (
                                    <div key={index} className="p-6 flex items-center gap-3 justify-center text-center lg:text-left lg:justify-start">
                                        <CheckCircle2 className="text-accent-emerald shrink-0 w-5 h-5" />
                                        <span className="font-medium text-white/90">{benefit.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT & CONTENT BODY */}
                {(service.content || (service.process && service.process.length > 0)) && (
                    <Section className="py-24">
                        <div className="container mx-auto px-4">
                            {/* CONTENT BODY */}
                            {service.content && (
                                <FadeIn>
                                    <ServiceDetailContent>
                                        {service.content}
                                    </ServiceDetailContent>
                                </FadeIn>
                            )}

                            {/* PROCESS SECTION */}
                            {service.process && service.process.length > 0 && (
                                <FadeIn>
                                    <div className="max-w-6xl mx-auto mt-32">
                                        <div className="text-center mb-16">
                                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Uygulama Sürecimiz</h2>
                                            <p className="text-white/60 text-lg">Projenizi başarıya taşırken izlediğimiz adımlar.</p>
                                        </div>
                                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {service.process.map((step, index) => (
                                                <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm p-8 rounded-2xl relative group hover:border-accent-gold/50 hover:bg-white/10 transition-all duration-300">
                                                    <div className="text-4xl font-bold text-accent-gold/20 absolute top-4 right-6 group-hover:text-accent-gold/40 transition-colors">
                                                        {index + 1}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                                                    <p className="text-white/60 leading-relaxed relative z-10">{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            )}
                        </div>
                    </Section>
                )}

                {/* FAQ SECTION - Glass Theme */}
                {service.faq && service.faq.length > 0 && (
                    <Section className="py-24 border-t border-white/5 bg-surface-2/20">
                        <div className="container mx-auto px-4 max-w-3xl">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Sıkça Sorulan Sorular</h2>
                            </div>
                            <div className="space-y-4">
                                {service.faq.map((item, index) => (
                                    <FadeIn key={index} delay={index * 0.1}>
                                        <div className="border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all hover:border-white/20">
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex items-center justify-between p-6 text-left transition-colors"
                                            >
                                                <span className="font-medium text-white text-lg pr-8">{item.question}</span>
                                                {openFaqIndex === index ? (
                                                    <Minus className="text-accent-emerald shrink-0" />
                                                ) : (
                                                    <Plus className="text-white/50 shrink-0 group-hover:text-white" />
                                                )}
                                            </button>
                                            {openFaqIndex === index && (
                                                <div className="p-6 pt-0 text-white/70 leading-relaxed border-t border-white/10 bg-white/5">
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

                {/* FINAL CTA - Dark Premium */}
                <Section className="py-24">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-accent-magenta/12 via-white/5 to-transparent border border-white/10 p-12 md:p-20 rounded-3xl relative overflow-hidden backdrop-blur-md shadow-2xl">
                            {/* Background Orbs */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-magenta/15 rounded-full blur-[128px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/12 rounded-full blur-[96px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight">
                                    Markanızı Büyütmeye Hazır mısınız?
                                </h2>
                                <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                                    Profesyonel ekibimizle tanışın ve projeniz için en doğru stratejiyi birlikte belirleyelim.
                                </p>
                                {getMergedCTAs().slice(0, 1).map((btn, idx) => (
                                    <span key={btn.key || idx}>
                                        {renderCTA(
                                            btn.label,
                                            btn.href,
                                            btn.target,
                                            btn.variant,
                                            'w-full sm:w-auto min-h-[60px] h-auto whitespace-normal py-4 px-10 text-lg font-semibold shadow-lg hover:shadow-accent-gold/25 hover:scale-105 transition-all duration-300'
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
};

export default ServiceDetail;
