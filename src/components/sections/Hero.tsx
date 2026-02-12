import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { MessageSquare, Sparkles } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '../ui/background-beams-with-collision';

interface HeroProps {
    title?: string;
    subtitle?: string;
    badge?: string;
    ctaPrimaryLabel?: string;
    ctaSecondaryLabel?: string;
}

export const Hero = ({
    title = "Markanızı Dijitalde Büyütün",
    subtitle = "Veri odaklı performans pazarlaması ve kreatif stratejilerle markanızı bir adım öne taşıyoruz. Digma ile ölçülebilir büyüme yolculuğuna başlayın.",
    badge = "Performans Pazarlama Ajansı",
    ctaPrimaryLabel = "Ücretsiz Analiz Al",
    ctaSecondaryLabel = "Bize Ulaşın"
}: HeroProps) => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-20 overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <BackgroundBeamsWithCollision className="h-full w-full opacity-60">
                    <div />
                </BackgroundBeamsWithCollision>

                {/* Custom Glows for Lux Night Theme */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-white/10 text-primary text-sm font-medium mb-8 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            {badge}
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-6 md:mb-8 text-foreground">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i === 1 ? "text-primary block md:inline" : "block md:inline"}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-text-muted mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {subtitle}
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button
                                variant="default"
                                size="lg"
                                className="w-full sm:w-auto text-base h-12 px-8"
                                onClick={() => document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                {ctaPrimaryLabel}
                                <Sparkles className="ml-2 w-4 h-4" />
                            </Button>

                            <Link to="/iletisim" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full text-base h-12 px-8"
                                >
                                    {ctaSecondaryLabel}
                                    <MessageSquare className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges / Stats (Optional) */}
                        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-8 justify-center lg:justify-start items-center text-text-muted text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">50+</span>
                                <span className="leading-tight">Mutlu<br />Müşteri</span>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-white">%300</span>
                                <span className="leading-tight">Ortalama<br />Büyüme</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="relative hidden lg:block"
                    >
                        {/* Abstract Device/Interface Mockup */}
                        <div className="relative z-10 rounded-2xl border border-white/10 bg-surface/30 backdrop-blur-xl shadow-2xl p-2 md:p-4 aspect-square md:aspect-[4/3] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl"></div>

                            {/* Inner Content - Simulated Dashboard */}
                            <div className="h-full w-full rounded-xl overflow-hidden relative bg-black/40 border border-white/5 flex flex-col">
                                {/* Header */}
                                <div className="h-10 border-b border-white/10 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                {/* Body */}
                                <div className="p-6 flex-1 flex flex-col gap-4">
                                    <div className="flex gap-4">
                                        <div className="w-1/3 h-24 rounded-lg bg-surface/50 animate-pulse"></div>
                                        <div className="w-1/3 h-24 rounded-lg bg-surface/50 animate-pulse delay-75"></div>
                                        <div className="w-1/3 h-24 rounded-lg bg-surface/50 animate-pulse delay-150"></div>
                                    </div>
                                    <div className="flex-1 rounded-lg bg-surface/30 border border-white/5 p-4 flex items-end gap-2 pb-0 relative overflow-hidden">
                                        {/* Chart Bars */}
                                        <div className="w-1/6 h-[40%] bg-primary/20 rounded-t-sm"></div>
                                        <div className="w-1/6 h-[60%] bg-primary/40 rounded-t-sm"></div>
                                        <div className="w-1/6 h-[50%] bg-primary/30 rounded-t-sm"></div>
                                        <div className="w-1/6 h-[80%] bg-primary/60 rounded-t-sm"></div>
                                        <div className="w-1/6 h-[70%] bg-primary/50 rounded-t-sm"></div>
                                        <div className="w-1/6 h-[95%] bg-primary rounded-t-sm relative shadow-[0_0_20px_rgba(250,193,1,0.3)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements behind */}
                        <div className="absolute top-10 right-10 w-full h-full border border-primary/20 rounded-2xl z-0 transform translate-x-4 translate-y-4"></div>
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full blur-[60px] opacity-20"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
