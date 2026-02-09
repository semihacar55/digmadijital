import { useState, type FormEvent } from 'react';
import { submitForm } from '../../services/form.service';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { FormLoading, FormSuccess, FormInlineError } from './FormStates';
import { Mail } from 'lucide-react';

interface NewsletterFormProps {
    variant?: 'inline' | 'card';
    title?: string;
    description?: string;
}

export const NewsletterForm = ({
    variant = 'inline',
    title = 'Dijital Pazarlama Rehberi',
    description = 'Haftalık ipuçları ve stratejiler için abone olun.'
}: NewsletterFormProps) => {
    const [email, setEmail] = useState('');
    const [honeypot, setHoneypot] = useState(''); // Hidden spam protection
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setErrorMsg('Geçerli bir e-posta adresi girin.');
            setStatus('error');
            return;
        }

        setStatus('submitting');
        setErrorMsg('');

        const result = await submitForm({
            form_type: 'newsletter',
            email,
            honeypot,
            name: 'Newsletter Subscriber'
        });

        if (result.success) {
            setStatus('success');
            setEmail('');
        } else {
            setStatus('error');
            setErrorMsg(result.error || 'Kayıt başarısız. Lütfen tekrar deneyin.');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setEmail('');
        setErrorMsg('');
    };

    if (status === 'submitting') {
        return <FormLoading message="Kaydediliyor..." />;
    }

    if (status === 'success') {
        return (
            <FormSuccess
                title="Başarıyla Abone Oldunuz!"
                message="Haftalık bültenimiz için teşekkürler. İlk e-postamızı yakında alacaksınız."
                onReset={handleReset}
                resetLabel="Başka Bir E-posta Ekle"
            />
        );
    }

    const isCard = variant === 'card';

    return (
        <div className={isCard ? 'bg-secondary/30 p-6 rounded-xl border border-white/10' : ''}>
            {title && (
                <div className="mb-4">
                    <h3 className={`font-bold text-white mb-2 ${isCard ? 'text-xl' : 'text-lg'}`}>
                        {title}
                    </h3>
                    {description && (
                        <p className="text-text-muted text-sm">{description}</p>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field - hidden from users */}
                <div className="hidden" aria-hidden="true">
                    <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                    />
                </div>

                <div className={isCard ? 'space-y-4' : 'flex gap-2'}>
                    <div className={isCard ? '' : 'flex-1'}>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-posta adresiniz"
                            required
                            aria-label="E-posta adresi"
                            className={isCard ? 'w-full' : ''}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="accent"
                        className={isCard ? 'w-full' : ''}
                    >
                        <Mail size={18} className="mr-2" />
                        Abone Ol
                    </Button>
                </div>

                {status === 'error' && errorMsg && (
                    <FormInlineError message={errorMsg} />
                )}
            </form>
        </div>
    );
};
