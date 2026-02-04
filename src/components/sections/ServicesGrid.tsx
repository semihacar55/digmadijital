
import { useEffect, useState } from 'react';
import { ArrowRight, BarChart2, Search, Share2, PenTool, TrendingUp, ShoppingBag, PieChart, Box } from 'lucide-react';
import { GradientCard } from '../ui/GradientCard';
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => {
                const IconComponent = iconMap[service.icon] || Box;
                return (
                    <FadeIn key={service.id} delay={index * 0.1} fullWidth>
                        <Link to={`/hizmetler/${service.slug}`} className="block h-full group">
                            <GradientCard className="h-full flex flex-col hover:border-accent-blue/50 transition-colors">
                                <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-accent-blue/20 transition-colors">
                                    <IconComponent className="w-8 h-8 text-accent-blue group-hover:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-blue transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                                    {service.summary}
                                </p>
                                <div className="flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                                    İncele <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </GradientCard>
                        </Link>
                    </FadeIn>
                );
            })}
        </div>
    );
};

export { ServicesGrid };
