import { useState, useEffect } from 'react';
import { Section } from '../components/ui/Section';
import SEO from '../components/seo/SEO';
import { PageHero } from '../components/ui/PageHero';
import { FadeIn } from '../components/animations/FadeIn';
import { getPageByKey, getDefaultPageContent } from '../services/pages.service';
import ReactMarkdown from 'react-markdown';

const About = () => {
    const [loading, setLoading] = useState(true);
    const [heroTitle, setHeroTitle] = useState('Hakkımızda');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [seoTitle, setSeoTitle] = useState('Hakkımızda | Digma Dijital');
    const [seoDescription, setSeoDescription] = useState('');

    useEffect(() => {
        const fetchPage = async () => {
            const page = await getPageByKey('about');
            if (page) {
                setHeroTitle(page.hero_title || 'Hakkımızda');
                setHeroSubtitle(page.hero_subtitle || '');
                setContent(page.content_markdown || '');
                setSeoTitle(page.seo_title || 'Hakkımızda | Digma Dijital');
                setSeoDescription(page.seo_description || '');
            } else {
                // Fallback to defaults
                const defaults = getDefaultPageContent('about');
                setHeroTitle(defaults.hero_title || 'Hakkımızda');
                setHeroSubtitle(defaults.hero_subtitle || '');
                setContent(defaults.content_markdown || '');
            }
            setLoading(false);
        };
        fetchPage();
    }, []);

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
            />

            <PageHero
                title={heroTitle}
                subtitle={heroSubtitle}
                breadcrumb={[{ label: 'Digma' }, { label: 'Hakkımızda' }]}
            >
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
                    <FadeIn delay={0.1}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">5+</div>
                            <div className="text-sm text-text-muted">Yıl Deneyim</div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">100+</div>
                            <div className="text-sm text-text-muted">Tamamlanan Proje</div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">50+</div>
                            <div className="text-sm text-text-muted">Mutlu Müşteri</div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-blue rounded-xl flex items-center justify-center mb-4 mx-auto">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">%98</div>
                            <div className="text-sm text-text-muted">Başarı Oranı</div>
                        </div>
                    </FadeIn>
                </div>
            </PageHero>

            <div className="pb-12">
                <Section>
                    <FadeIn>
                        <div className="max-w-4xl mx-auto relative z-10">
                            {/* Content */}
                            <div className="prose prose-invert prose-lg max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => (
                                            <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
                                        ),
                                        h2: ({ children }) => (
                                            <h2 className="text-2xl font-bold text-white mb-3 mt-8">{children}</h2>
                                        ),
                                        h3: ({ children }) => (
                                            <h3 className="text-xl font-bold text-white mb-2 mt-6">{children}</h3>
                                        ),
                                        p: ({ children }) => (
                                            <p className="text-text-muted mb-4 leading-relaxed">{children}</p>
                                        ),
                                        ul: ({ children }) => (
                                            <ul className="list-disc list-inside text-text-muted mb-4 space-y-2">{children}</ul>
                                        ),
                                        ol: ({ children }) => (
                                            <ol className="list-decimal list-inside text-text-muted mb-4 space-y-2">{children}</ol>
                                        ),
                                        strong: ({ children }) => (
                                            <strong className="text-white font-semibold">{children}</strong>
                                        ),
                                        em: ({ children }) => (
                                            <em className="text-accent-blue">{children}</em>
                                        ),
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </FadeIn>
                </Section>
            </div>
        </>
    );
};

export default About;
