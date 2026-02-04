
import { useState } from 'react';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { FadeIn } from '../components/animations/FadeIn';
import { submitForm } from '../services/form.service';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const res = await submitForm({
            form_type: 'contact',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        });

        if (res.success) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } else {
            setStatus('error');
            setErrorMsg(res.error || 'Bir hata oluştu.');
        }
    };

    return (
        <div className="pt-24 pb-20">
            <Section>
                <FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        {/* Left: Info */}
                        <div className="space-y-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                                    Bizimle İletişime Geçin
                                </h1>
                                <p className="text-lg text-text-muted">
                                    Projeleriniz için bir araya gelelim ve birlikte harika işler başaralım.
                                    Aşağıdaki formu doldurarak bize ulaşabilirsiniz.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">E-posta</h3>
                                        <p className="text-text-muted">info@digma.com.tr</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Telefon</h3>
                                        <p className="text-text-muted">+90 216 000 00 00</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent-blue shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Adres</h3>
                                        <p className="text-text-muted">Teknoloji Vadisi, İstanbul</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="bg-secondary/30 p-8 rounded-2xl border border-white/5">
                            {status === 'success' ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                                    <p className="text-text-muted mb-8">En kısa sürede size dönüş yapacağız.</p>
                                    <Button variant="outline" onClick={() => setStatus('idle')}>Yeni Mesaj Gönder</Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Ad Soyad</label>
                                        <Input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">E-posta</label>
                                        <Input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Telefon</label>
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+90 555 000 00 00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-text-muted">Mesajınız</label>
                                        <Textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Projenizden bahsedin..."
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        variant="accent"
                                        className="w-full h-12 text-lg"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? 'Gönderiliyor...' : 'Gönder'}
                                        {!status.startsWith('submit') && <Send className="ml-2" size={18} />}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </FadeIn>
            </Section>
        </div>
    );
};
export default Contact;
