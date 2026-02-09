import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { getCompanyInfo, getDefaultCompanyInfo, type CompanyInfo } from '../../services/company.service';
import { NewsletterForm } from '../forms/NewsletterForm';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [companyInfo, setCompanyInfo] = useState<Partial<CompanyInfo>>(getDefaultCompanyInfo());

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            const data = await getCompanyInfo();
            if (data) {
                setCompanyInfo(data);
            }
        };
        fetchCompanyInfo();
    }, []);

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'instagram': return Instagram;
            case 'linkedin': return Linkedin;
            case 'twitter': return Twitter;
            default: return null;
        }
    };

    return (
        <footer className="bg-secondary/50 border-t border-border pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-display font-bold text-foreground tracking-tight">
                            {companyInfo.company_name || 'Digma'}<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Veri odaklı performans pazarlaması ve kreatif stratejilerle markanızı dijitalde büyütüyoruz.
                        </p>
                        <div className="flex gap-4">
                            {companyInfo.social_links?.map((social, index) => {
                                const Icon = getSocialIcon(social.platform);
                                if (!Icon) return null;
                                return (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-surface rounded-full hover:bg-primary hover:text-white text-foreground transition-colors"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-foreground font-bold mb-6">Hızlı Erişim</h4>
                        <ul className="space-y-4">
                            <li><Link to="/hizmetler" className="text-muted-foreground hover:text-primary transition-colors text-sm">Hizmetlerimiz</Link></li>
                            <li><Link to="/vaka-calismalari" className="text-muted-foreground hover:text-primary transition-colors text-sm">Başarı Hikayeleri</Link></li>
                            <li><Link to="/hakkimizda" className="text-muted-foreground hover:text-primary transition-colors text-sm">Hakkımızda</Link></li>
                            <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog & Rehber</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <NewsletterForm
                            variant="card"
                            title="Bültenimize Abone Olun"
                            description="Dijital pazarlama ipuçları ve güncellemeler için e-posta listemize katılın."
                        />
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-foreground font-bold mb-6">İletişim</h4>
                        <ul className="space-y-4">
                            {companyInfo.address && (
                                <li className="flex items-start gap-3 text-muted-foreground text-sm">
                                    <MapPin className="w-5 h-5 text-primary shrink-0" />
                                    <span>{companyInfo.address}</span>
                                </li>
                            )}
                            {companyInfo.phone && (
                                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                                    <Phone className="w-5 h-5 text-primary shrink-0" />
                                    <span>{companyInfo.phone}</span>
                                </li>
                            )}
                            {companyInfo.email && (
                                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                                    <Mail className="w-5 h-5 text-primary shrink-0" />
                                    <span>{companyInfo.email}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-foreground text-xs">
                        © {currentYear} {companyInfo.company_name || 'Digma Dijital'}. Tüm hakları saklıdır.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-muted-foreground hover:text-foreground text-xs">Gizlilik Politikası</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground text-xs">Kullanım Şartları</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
