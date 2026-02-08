import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Section } from '../components/ui/Section';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { FadeIn } from '../components/animations/FadeIn';
import SEO from '../components/seo/SEO';

const Services = () => {
    return (
        <>
            <SEO
                title="Hizmetlerimiz | Digma Dijital"
                description="Web tasarım, SEO, sosyal medya yönetimi ve daha fazlası. İşletmeniz için uçtan uca dijital çözümler."
            />
            <BackgroundBeamsWithCollision className="min-h-[60vh] flex-col justify-center">
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
                            Hizmetlerimiz
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed pointer-events-auto">
                            Markanızın dijital dünyada büyümesi için ihtiyaç duyduğunuz tüm çözümleri tek çatı altında sunuyoruz.
                        </p>
                    </FadeIn>
                </div>
            </BackgroundBeamsWithCollision>
            <Section className="pb-20">
                <div className="container mx-auto px-4">
                    <ServicesGrid />
                </div>
            </Section>
        </>
    );
};
export default Services;
