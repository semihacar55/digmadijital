import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';


interface Service {
    id: string;
    title: string;
    slug: string;
    sort_order: number;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch services for dropdown
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('id, title, slug, sort_order')
                .eq('status', 'published')
                .order('sort_order', { ascending: true });

            if (data) {
                setServices(data);
            }
        };
        fetchServices();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setMobileServicesOpen(false);
    }, [location]);

    const handleAnalysisClick = () => {
        if (location.pathname === '/') {
            const element = document.getElementById('ucretsiz-analiz');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            navigate('/#ucretsiz-analiz');
        }
        setIsOpen(false);
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-sm" : "bg-transparent border-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-display font-bold text-foreground tracking-tight">
                    Digma<span className="text-primary">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Services Dropdown */}
                    <div className="relative group">
                        <Link
                            to="/hizmetler"
                            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                        >
                            Hizmetler
                            <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                        </Link>


                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out">
                            <div className="bg-popover/90 backdrop-blur-xl border border-border rounded-xl shadow-2xl p-2 flex flex-col gap-1">
                                {services.length > 0 ? (
                                    services.map((service) => (
                                        <Link
                                            key={service.id}
                                            to={`/hizmetler/${service.slug}`}
                                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                                        >
                                            {service.title}
                                        </Link>
                                    ))
                                ) : (
                                    <span className="px-4 py-2 text-xs text-muted-foreground">Yükleniyor...</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link to="/vaka-calismalari" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vaka Çalışmaları</Link>
                    <Link to="/hakkimizda" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</Link>
                    <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
                    <Link to="/iletisim" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">İletişim</Link>
                </nav>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <span className="text-foreground">TR</span>
                        <span className="text-muted-foreground/20">/</span>
                        <span>EN</span>
                    </button>

                    <Button variant="default" size="sm" className="hidden md:inline-flex" onClick={handleAnalysisClick}>
                        Ücretsiz Analiz Al
                    </Button>

                    <button
                        className="md:hidden text-foreground p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {/* Mobile Services Accordion */}
                            <div>
                                <div
                                    className="flex items-center justify-between text-lg font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
                                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                >
                                    Hizmetler
                                    <ChevronDown size={18} className={`transition - transform duration - 300 ${mobileServicesOpen ? 'rotate-180' : ''} `} />
                                </div>
                                <AnimatePresence>
                                    {mobileServicesOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-secondary/50 rounded-lg mt-2"
                                        >
                                            <div className="flex flex-col p-2 gap-1">
                                                <Link to="/hizmetler" className="px-4 py-2 text-sm text-primary font-medium">
                                                    Tüm Hizmetler
                                                </Link>
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.id}
                                                        to={`/hizmetler/${service.slug}`}
                                                        className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {service.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link to="/vaka-calismalari" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Vaka Çalışmaları</Link>
                            <Link to="/hakkimizda" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Hakkımızda</Link>
                            <Link to="/blog" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">Blog</Link>
                            <Link to="/iletisim" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">İletişim</Link>

                            <Button variant="default" className="mt-4 w-full justify-between group" onClick={handleAnalysisClick}>
                                Ücretsiz Analiz Al
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export { Header };
