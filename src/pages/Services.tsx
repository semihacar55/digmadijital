import { useEffect, useState } from 'react';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Section } from '../components/ui/Section';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { FadeIn } from '../components/animations/FadeIn';
import SEO from '../components/seo/SEO';
import { Button } from '../components/ui/Button';
import { ArrowRight, Smartphone, Target, TrendingUp, Zap } from 'lucide-react';
import { getPageByKey, getDefaultPageContent } from '../services/pages.service';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const Services = () => {
    // const [loading, setLoading] = useState(true); // Unused
    const [pageContent, setPageContent] = useState(getDefaultPageContent('services'));

    useEffect(() => {
        const fetchPage = async () => {
            const page = await getPageByKey('services');
            if (page) {
                setPageContent(page);
            }
            // setLoading(false);
        };
        fetchPage();
    }, []);

    const processSteps = [
        {
            icon: Target,
            title: 'Analiz',
            description: 'Mevcut durumunuzu, rakiplerinizi ve hedef kitlenizi derinlemesine analiz ederek yol haritasını belirliyoruz.'
        },
        {
            icon: Zap,
            title: 'Strateji',
            description: 'Veriler ışığında markanıza özel, ölçülebilir ve sonuç odaklı bir dijital büyüme stratejisi kurguluyoruz.'
        },
        {
            icon: Smartphone,
            title: 'Uygulama',
            description: 'Belirlenen stratejiyi en son teknolojiler ve kreatif yaklaşımlarla hayata geçiriyoruz.'
        },
        {
            icon: TrendingUp,
            title: 'Optimizasyon',
            description: 'Sürekli test ve veri analizi ile kampanyaları iyileştiriyor, maksimum ROI (Yatırım Getirisi) sağlıyoruz.'
        }
    ];

    return (
        <>
            <SEO
                title={pageContent.seo_title || "Hizmetlerimiz | Digma Dijital"}
                description={pageContent.seo_description || "Web tasarım, SEO, sosyal medya yönetimi ve daha fazlası."}
            />

            <BackgroundBeamsWithCollision className="min-h-[50vh] flex-col justify-center">
                <div className="relative z-10 px-4 text-center">
                    <FadeIn>
                        {/* Breadcrumb */}
                        <div className="mb-6 flex justify-center pointer-events-auto">
                            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                <p className="text-sm text-text-muted/80">
                                    <span>Digma</span>
                                    <span className="text-accent-blue mx-2">/</span>
                                    <span className="text-white">Hizmetler</span>
                                </p>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white pointer-events-auto">
                            {pageContent.title || 'Hizmetlerimiz'}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed pointer-events-auto">
                            {pageContent.hero_subtitle || 'Markanızın dijital dünyada büyümesi için ihtiyaç duyduğunuz tüm çözümleri tek çatı altında sunuyoruz.'}
                        </p>
                    </FadeIn>
                </div>
            </BackgroundBeamsWithCollision>

            {/* Services Grid */}
            <Section className="pb-10 pt-20">
                <div className="container mx-auto px-4">
                    <ServicesGrid limit={100} />
                </div>
            </Section>

            {/* Mission Section (Editable) */}
            <Section className="bg-secondary/20 py-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-sm font-medium mb-4">
                                    <span className="w-2 h-2 rounded-full bg-accent-blue"></span>
                                    Misyonumuz
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    {pageContent.hero_title || 'Misyonumuz'}
                                </h2>
                                <div className="prose prose-invert prose-lg text-text-muted">
                                    <ReactMarkdown>
                                        {pageContent.content_markdown || ''}
                                    </ReactMarkdown>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="w-full md:w-1/2">
                            <FadeIn delay={0.2}>
                                <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                                    <img
                                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop"
                                        alt="Team Meeting"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                                            <p className="text-white font-medium">"Başarınız, bizim başarımızdır."</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Process Section */}
            <Section className="py-24 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Nasıl Çalışırız?</h2>
                        <p className="text-text-muted text-lg">Başarıya giden yolda izlediğimiz 4 adımlı kanıtlanmış sürecimiz.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <FadeIn key={index} delay={index * 0.1}>
                                <div className="group relative">
                                    {/* Connector Line (Desktop) */}
                                    {index < processSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-[2.5rem] left-1/2 w-full h-[2px] bg-white/5 z-0 group-hover:bg-gradient-to-r group-hover:from-accent-blue/50 group-hover:to-transparent transition-all duration-500"></div>
                                    )}

                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-20 h-20 rounded-2xl bg-secondary border border-white/10 flex items-center justify-center mb-6 group-hover:border-accent-blue/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                                            <step.icon className="w-8 h-8 text-white group-hover:text-accent-blue transition-colors duration-300" />
                                        </div>
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-accent-blue mb-4">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="py-0 mb-20">
                <FadeIn>
                    <div className="container mx-auto px-4">
                        <div className="bg-gradient-to-br from-accent-blue/20 to-accent-purple/10 rounded-3xl p-8 md:p-16 text-center border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm z-0"></div>
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Projenizi Hayata Geçirelim</h2>
                                <p className="text-xl text-text-muted mb-10">
                                    Hemen ücretsiz analiz alın veya detayları görüşmek için bizimle iletişime geçin.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button variant="accent" size="lg" onClick={() => document.getElementById('ucretsiz-analiz')?.scrollIntoView({ behavior: 'smooth' })}>
                                        Ücretsiz Analiz Al
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                    <Link to="/iletisim">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                            Bize Ulaşın
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </>
    );
};
export default Services;

