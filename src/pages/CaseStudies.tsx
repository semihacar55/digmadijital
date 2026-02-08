import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PremiumBackground } from '../components/ui/PremiumBackground';
import { PageHero } from '../components/ui/PageHero';
import { FadeIn } from '../components/animations/FadeIn';
import SEO from '../components/seo/SEO';
import { ArrowRight, Briefcase } from 'lucide-react';

interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    client_name: string;
    sector: string;
    services: string[];
}

const CaseStudies = () => {
    const [studies, setStudies] = useState<CaseStudy[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('Tümü');
    const [sectors, setSectors] = useState<string[]>(['Tümü']);

    useEffect(() => {
        fetchStudies();
    }, []);

    const fetchStudies = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('case_studies')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false });

        if (data) {
            setStudies(data);
            // Extract unique sectors
            const uniqueSectors = Array.from(new Set(data.map(s => s.sector))).filter(Boolean);
            setSectors(['Tümü', ...uniqueSectors]);
        }
        if (error) console.error(error);
        setLoading(false);
    };

    const filteredStudies = activeFilter === 'Tümü'
        ? studies
        : studies.filter(s => s.sector === activeFilter);


    return (
        <PremiumBackground>
            <SEO
                title="Vaka Çalışmaları | Digma Digital Agency"
                description="Markalar için yarattığımız başarı hikayeleri ve dijital dönüşüm projeleri."
            />

            <PageHero
                title="Başarı Hikayeleri"
                subtitle="İş ortaklarımız için veriye dayalı stratejilerle nasıl değer yarattığımızı keşfedin."
                breadcrumb={[{ label: 'Digma' }, { label: 'Vaka Çalışmaları' }]}
            />

            <div className="pb-20 px-4">
                <div className="container mx-auto">

                    {/* Filter */}
                    <FadeIn delay={0.1}>
                        <div className="flex flex-wrap justify-center gap-2 mb-16">
                            {sectors.map(sector => (
                                <button
                                    key={sector}
                                    onClick={() => setActiveFilter(sector)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeFilter === sector
                                        ? 'bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/20'
                                        : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    {sector}
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
                        </div>
                    ) : filteredStudies.length === 0 ? (
                        <div className="text-center py-20 text-text-muted glass-card max-w-md mx-auto rounded-2xl">
                            Henüz vaka çalışması bulunmuyor.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredStudies.map((study, index) => (
                                <FadeIn key={study.id} delay={index * 0.1}>
                                    <Link to={`/vaka-calismalari/${study.slug}`} className="group relative block h-full min-h-[400px] rounded-3xl overflow-hidden glass-card hover:border-accent-blue/30 transition-all duration-500">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 z-0">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
                                            <img
                                                src={study.cover_image}
                                                alt={study.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                    {study.services.slice(0, 3).map((s, i) => (
                                                        <span key={i} className="text-xs font-semibold bg-white/10 backdrop-blur px-3 py-1 rounded-full text-white border border-white/10">
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-2 text-accent-blue text-sm font-bold tracking-wider uppercase mb-2">
                                                    <Briefcase size={14} />
                                                    {study.client_name}
                                                </div>

                                                <h2 className="text-3xl font-display font-bold text-white mb-4 leading-tight group-hover:text-accent-blue transition-colors">
                                                    {study.title}
                                                </h2>

                                                <p className="text-text-muted line-clamp-2 text-base mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {study.excerpt}
                                                </p>

                                                <div className="flex items-center text-white font-semibold text-sm group-hover:gap-3 transition-all">
                                                    İncele <ArrowRight size={18} className="ml-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </FadeIn>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PremiumBackground>
    );
};

export default CaseStudies;
