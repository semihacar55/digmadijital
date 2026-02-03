
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Users } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Testimonials } from '../components/sections/Testimonials';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggeredText } from '../components/animations/StaggeredText';
import { GradientDots } from '../components/ui/gradient-dots';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Digma Dijital | Performans Pazarlama Ajansı</title>
                <meta name="description" content="Markanızı veri odaklı stratejilerle büyütüyoruz." />
            </Helmet>

            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-0 bg-primary z-0 pointer-events-none">
                    <GradientDots duration={25} className="opacity-30" backgroundColor="#121212" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-green/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn delay={0.1}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-green text-sm font-medium mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Yeni Nesil Dijital Büyüme Ajansı
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
                            <StaggeredText text="Markanızı" className="block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-blue-400 to-accent-green block">
                                <StaggeredText text="Ölçülebilir Büyütelim." />
                            </span>
                        </h1>

                        <FadeIn delay={0.4}>
                            <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
                                Performans pazarlama, veri analizi ve kreatif stratejilerle dijital dünyada işletmenize değer katıyoruz.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.6}>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Button variant="accent" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Ücretsiz Analiz Al
                                </Button>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Toplantı Planla
                                </Button>
                            </div>
                        </FadeIn>
                    </FadeIn>
                </div>
            </div>

            {/* Brand Strip (Social Proof) */}
            <div className="border-y border-white/5 bg-secondary/30 py-10 overflow-hidden">
                <div className="container mx-auto px-4">
                    <h3 className="text-center text-text-muted text-sm uppercase tracking-widest mb-8">
                        Global ve Yerel Markaların Güvenilir İş Ortağı
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos */}
                        {['BRAND 1', 'BRAND 2', 'BRAND 3', 'BRAND 4', 'BRAND 5'].map((brand, i) => (
                            <span key={i} className="text-xl font-bold font-display text-white">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <Section id="hizmetler">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Uçtan Uca Dijital Çözümler</h2>
                    <p className="text-text-muted text-lg">Markanızın ihtiyacı olan tüm dijital pazarlama süreçlerini tek elden, profesyonelce yönetiyoruz.</p>
                </div>
                <ServicesGrid />
            </Section>

            {/* Why Digma */}
            <Section className="bg-secondary/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Neden Digma?</h2>
                        <div className="space-y-8">
                            {[
                                { title: 'Şeffaf Raporlama', desc: 'Her kuruşun nereye gittiğini ve ne getirdiğini panelinizden canlı izleyin.' },
                                { title: 'Kârlılık Odaklılık', desc: 'Sadece tıklama değil, gerçek satış ve ROI (Yatırım Getirisi) odaklı çalışıyoruz.' },
                                { title: 'Test Kültürü', desc: 'A/B testleri ile sürekli optimize ediyor, en iyi performansı yakalayana kadar durmuyoruz.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0">
                                        <CheckCircle className="text-accent-blue" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-text-muted">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-3xl bg-gradient-to-tr from-accent-blue/20 to-accent-green/20 backdrop-blur-3xl border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
                            {/* Abstract Visual Placeholder */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <Card className="bg-primary/80 border-0 shadow-2xl skew-y-6 translate-y-8"><div className="h-32"></div></Card>
                                <Card className="bg-primary/80 border-0 shadow-2xl -skew-y-6"><div className="h-32"></div></Card>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Process Steps */}
            <Section>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">4 Adımda Büyüme Yolculuğu</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { step: '01', title: 'Analiz', desc: 'Mevcut durumunuzu ve rakiplerinizi inceliyoruz.' },
                        { step: '02', title: 'Strateji', desc: 'Size özel büyüme yol haritası çıkarıyoruz.' },
                        { step: '03', title: 'Uygulama', desc: 'Profesyonel ekibimizle planı hayata geçiriyoruz.' },
                        { step: '04', title: 'Optimizasyon', desc: 'Verilerle sürekli iyileştirme yapıyoruz.' },
                    ].map((item, i) => (
                        <div key={i} className="relative p-6 border-l border-white/10 hover:border-accent-blue transition-colors">
                            <span className="text-6xl font-display font-bold text-white/5 absolute top-4 left-4 -z-10">{item.step}</span>
                            <h3 className="text-2xl font-bold mb-3 mt-8">{item.title}</h3>
                            <p className="text-text-muted">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Case Studies Preview */}
            <Section className="bg-secondary/20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Başarı Hikayeleri</h2>
                        <p className="text-text-muted">Rakamlarla kanıtlanmış sonuçlar.</p>
                    </div>
                    <Button variant="outline" className="hidden md:inline-flex">Tümünü Gör</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-[4/3] bg-white/5 rounded-2xl mb-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-accent-blue/10 group-hover:bg-accent-blue/20 transition-colors" />
                                {/* Image placeholder would go here */}
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">E-ticaret Markası %150 ROAS Artışı</h3>
                            <p className="text-text-muted text-sm">Google Ads Stratejisi</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline">Tümünü Gör</Button>
                </div>
            </Section>

            {/* Testimonials */}
            <Section>
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Müşterilerimiz Ne Diyor?</h2>
                <Testimonials />
            </Section>

            {/* Team Preview */}
            <Section className="bg-secondary/20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Uzman Ekibimiz</h2>
                    <p className="text-text-muted">Dijital hedeflerinizi gerçekleştiren beyin takımı.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group text-center">
                            <div className="aspect-square rounded-full bg-white/5 mb-4 mx-auto overflow-hidden border border-white/10 group-hover:border-accent-blue transition-colors relative">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
                                {/* Photo placeholder */}
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                    <Users size={32} />
                                </div>
                            </div>
                            <h4 className="font-bold text-white text-lg">İsim Soyisim</h4>
                            <p className="text-accent-blue text-sm">Uzmanlık Alanı</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Blog Preview */}
            <Section>
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Dijital Rehber</h2>
                    <LinkContainer to="/blog" className="text-accent-blue hover:text-white transition-colors text-sm font-medium">Tüm Yazılar &rarr;</LinkContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group">
                            <div className="h-48 bg-secondary rounded-xl mb-4" />
                            <span className="text-accent-blue text-xs font-bold uppercase tracking-wider">Rehber</span>
                            <h3 className="text-lg font-bold mt-2 mb-3 leading-snug group-hover:text-accent-blue transition-colors">
                                2026 Dijital Pazarlama Trendleri: Yapay Zeka Devrimi
                            </h3>
                            <p className="text-text-muted text-sm line-clamp-2">
                                Gelecek yıl pazarlama stratejilerinizi belirlerken dikkat etmeniz gerekenler...
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Final CTA / Contact Form */}
            <Section id="analysis-form" className="py-0">
                <div className="bg-gradient-to-br from-accent-blue/20 to-accent-green/10 rounded-3xl p-8 md:p-16 text-center border border-white/10 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Büyümeye Hazır Mısınız?</h2>
                        <p className="text-xl text-text-muted mb-10">
                            Markanızın potansiyelini keşfetmek için ücretsiz analiz formunu doldurun, size özel stratejiyi paylaşalım.
                        </p>

                        {/* Analysis Form */}
                        <form className="space-y-4 text-left bg-primary/50 backdrop-blur-md p-8 rounded-2xl border border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-text-muted">Ad Soyad</label>
                                    <input type="text" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors" placeholder="Adınız" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-text-muted">E-posta</label>
                                    <input type="email" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors" placeholder="ornek@sirket.com" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-text-muted">Telefon</label>
                                    <input type="tel" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors" placeholder="555..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-text-muted">Web Sitesi</label>
                                    <input type="url" className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors" placeholder="sirket.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-text-muted">Aylık Reklam Bütçesi</label>
                                <select className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors">
                                    <option>Belirtmek İstemiyorum</option>
                                    <option>10.000₺ - 50.000₺</option>
                                    <option>50.000₺ - 100.000₺</option>
                                    <option>100.000₺+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-text-muted">Notunuz</label>
                                <textarea className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:border-accent-blue focus:outline-none transition-colors h-24" placeholder="Hedeflerinizden kısaca bahsedin..."></textarea>
                            </div>
                            <Button variant="accent" size="lg" className="w-full">Analizi Gönder</Button>
                        </form>
                    </div>
                </div>
            </Section>
        </>
    );
};

// Helper for Link to avoid circular dependencies if needed, or just use Link from router
import { Link as LinkContainer } from 'react-router-dom';

export default Home;
