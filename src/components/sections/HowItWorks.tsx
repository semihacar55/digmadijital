import { Section } from '../ui/Section';
import { FadeIn } from '../animations/FadeIn';
import type { HomepageSection } from '../../services/homepage.service';
import { Search, Map, Zap, BarChart, Users, Smile, Briefcase, CheckCircle } from 'lucide-react';

interface HowItWorksProps {
    data: HomepageSection;
}

const steps = [
    {
        id: '01',
        title: 'Analiz',
        desc: 'Markanızın mevcut durumunu ve hedef kitlenizi derinlemesine analiz ediyoruz.',
        icon: Search
    },
    {
        id: '02',
        title: 'Strateji',
        desc: 'Sonuç odaklı bir yol haritası oluşturmak için analizden elde ettiğimiz verilerle etkili bir strateji geliştiriyoruz.',
        icon: Map
    },
    {
        id: '03',
        title: 'Uygulama',
        desc: 'Belirlediğimiz stratejiyi, marka hedeflerinize ulaşacak şekilde titizlikle hayata geçiriyoruz.',
        icon: Zap
    },
    {
        id: '04',
        title: 'Raporlama',
        desc: 'Performans verilerini düzenli olarak analiz ediyor, sonuçları sizinle paylaşarak başarıyı ölçüyoruz.',
        icon: BarChart
    }
];

const stats = [
    { value: '15+', label: 'Kişilik Ekip', icon: Users },
    { value: '700+', label: 'Mutlu Müşteri', icon: Smile },
    { value: '90+', label: 'Danışmanlık', icon: Briefcase },
    { value: '550+', label: 'Tamamlanmış Proje', icon: CheckCircle },
];

export const HowItWorks = ({ data }: HowItWorksProps) => {
    return (
        <Section className="relative overflow-hidden py-16 md:py-24">
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-blue/20 via-black/80 to-black z-0" />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                    {/* Left Column: Visual */}
                    <FadeIn direction="right" className="relative order-2 lg:order-1">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                            {/* Image Placeholder with Gradient Fallback */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0" />

                            {/* Abstract Gradient Overlay to look like a premium image placehoder if no image */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-80" />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-yellow/20 border border-accent-yellow/30 text-accent-yellow text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
                                    Agency Life
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2 leading-tight">
                                    Veri Odaklı Büyüme
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Her adımda şeffaflık ve ölçülebilir başarı.
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-accent-blue/10 rounded-full blur-3xl" />
                        <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-accent-yellow/10 rounded-full blur-3xl" />
                    </FadeIn>

                    {/* Right Column: Steps */}
                    <div className="order-1 lg:order-2">
                        <FadeIn>
                            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                                {data.title || 'Nasıl Çalışırız?'}
                            </h2>
                            <p className="text-text-muted text-lg mb-12 max-w-xl">
                                {data.description || 'Markanızı bir üst seviyeye taşımak için kanıtlanmış 4 adımlı sürecimizi uyguluyoruz.'}
                            </p>
                        </FadeIn>

                        <div className="space-y-6">
                            {steps.map((step, index) => (
                                <FadeIn key={step.id} delay={index * 0.1}>
                                    <div className="group relative pl-4 md:pl-0">
                                        {/* Valid Desktop Row Layout */}
                                        <div className="flex gap-6 items-start p-4 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent-blue font-bold text-lg shadow-sm group-hover:scale-110 group-hover:bg-accent-blue group-hover:text-white transition-all duration-300 relative overflow-hidden">
                                                <span className="relative z-10">{step.id}</span>
                                                <div className="absolute inset-0 bg-accent-blue/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                                                    {step.title}
                                                </h3>
                                                <p className="text-text-muted text-sm leading-relaxed max-w-md group-hover:text-white/80 transition-colors">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Connector Line (except last) */}
                                        {index !== steps.length - 1 && (
                                            <div className="absolute left-[2.5rem] md:left-[3.5rem] top-16 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent group-hover:from-accent-blue/30 transition-colors hidden md:block" />
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <FadeIn delay={0.4}>
                    <div className="border-t border-white/10 pt-12 md:pt-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center group">
                                    <div className="mb-4 flex justify-center text-white/20 group-hover:text-accent-blue group-hover:scale-110 transition-all duration-300">
                                        <stat.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-display tracking-tight">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-text-muted uppercase tracking-wider font-medium group-hover:text-white transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </Section>
    );
};
