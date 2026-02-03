
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-display font-bold text-white tracking-tight">
                            Digma<span className="text-accent-blue">.</span>
                        </Link>
                        <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                            Veri odaklı performans pazarlaması ve kreatif stratejilerle markanızı dijitalde büyütüyoruz.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"><Instagram size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"><Twitter size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Hızlı Erişim</h4>
                        <ul className="space-y-4">
                            <li><Link to="/hizmetler" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Hizmetlerimiz</Link></li>
                            <li><Link to="/vaka-calismalari" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Başarı Hikayeleri</Link></li>
                            <li><Link to="/hakkimizda" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Hakkımızda</Link></li>
                            <li><Link to="/blog" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Blog & Rehber</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Hizmetler</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Google Ads & SEO</a></li>
                            <li><a href="#" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Sosyal Medya Yönetimi</a></li>
                            <li><a href="#" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Kreatif & Tasarım</a></li>
                            <li><a href="#" className="text-text-muted hover:text-accent-blue transition-colors text-sm">Web & E-ticaret</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-text-muted text-sm">
                                <MapPin className="w-5 h-5 text-accent-blue shrink-0" />
                                <span>Maslak Mah. Büyükdere Cad. No:123<br />Sarıyer / İstanbul</span>
                            </li>
                            <li className="flex items-center gap-3 text-text-muted text-sm">
                                <Phone className="w-5 h-5 text-accent-blue shrink-0" />
                                <span>+90 (212) 555 00 00</span>
                            </li>
                            <li className="flex items-center gap-3 text-text-muted text-sm">
                                <Mail className="w-5 h-5 text-accent-blue shrink-0" />
                                <span>merhaba@digma.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-xs">
                        © {currentYear} Digma Dijital. Tüm hakları saklıdır.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-text-muted hover:text-white text-xs">Gizlilik Politikası</a>
                        <a href="#" className="text-text-muted hover:text-white text-xs">Kullanım Şartları</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
