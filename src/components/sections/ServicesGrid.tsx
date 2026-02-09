
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BarChart2, Search, Share2, PenTool, TrendingUp, ShoppingBag, PieChart, Box } from 'lucide-react';

import { Link } from 'react-router-dom';
import { FadeIn } from '../animations/FadeIn';
import { supabase } from '../../lib/supabase';

// Map icon names (string) to Lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    BarChart2, Search, Share2, PenTool, TrendingUp, ShoppingBag, PieChart, Box
};

interface Service {
    id: string;
    title: string;
    slug: string;
    summary: string;
    icon: string;
}

const ServicesGrid = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('*')
                .eq('status', 'published')
                .order('sort_order', { ascending: true });

            if (data && data.length > 0) {
                setServices(data);
            } else {
                // Fallback / Initial Mock Data if DB is empty
                setServices([
                    { icon: 'BarChart2', title: "Meta & Google Ads", summary: "Veri odaklı performans yönetimi ile reklam getirilerinizi maksimize edin.", slug: "performance-ads", id: '1' },
                    { icon: 'Search', title: "SEO Stratejileri", summary: "Teknik ve içerik optimizasyonu ile organik trafikte kalıcı artış sağlayın.", slug: "seo", id: '2' },
                    { icon: 'Share2', title: "Sosyal Medya Yönetimi", summary: "Marka bilinirliğini artıran, etkileşim odaklı içerik stratejileri.", slug: "social-media", id: '3' },
                    { icon: 'PenTool', title: "Kreatif & Tasarım", summary: "Dönüşüm odaklı reklam görselleri ve kullanıcı dostu arayüzler.", slug: "creative", id: '4' },
                    { icon: 'TrendingUp', title: "CRO & Optimizasyon", summary: "Web sitenizin ziyaretçi-müşteri dönüşüm oranlarını bilimsel testlerle artırın.", slug: "cro", id: '5' },
                    { icon: 'PieChart', title: "Analytics & Tracking", summary: "GA4, GTM ve Pixel kurulumlarıyla her veriyi doğru ölçümleyin.", slug: "analytics", id: '6' },
                ]);
            }
            setLoading(false);
        };

        fetchServices();
    }, []);


    if (loading) return <div className="text-center text-text-muted">Yükleniyor...</div>;

    // Limit to 6 items for the perfect grid layout
    const displayServices = services.slice(0, 6);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {displayServices.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Box;

                return (
                    <FadeIn
                        key={service.id}
                        delay={index * 0.1}
                        className="h-full"
                    >
                        <Link to={`/hizmetler/${service.slug}`} className="block h-full group">
                            <div className="h-full flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 relative overflow-hidden group-hover:shadow-2xl">

                                {/* Header: Icon & Title */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-accent-blue group-hover:text-white group-hover:bg-accent-blue group-hover:border-accent-blue transition-colors">
                                        <IconComponent size={24} />
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                                        <ArrowRight className="text-white/40 -rotate-45" size={20} />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {service.summary}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3 group/btn">
                                        <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                            <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-lg font-bold text-white tracking-wide group-hover:text-accent-blue transition-colors">
                                            İncele
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                );
            })}
        </div>
    );
};

export { ServicesGrid };
