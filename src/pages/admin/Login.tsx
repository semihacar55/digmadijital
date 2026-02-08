
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Lock, Mail } from 'lucide-react';
import { FadeIn } from '../../components/animations/FadeIn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-green/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <FadeIn>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Digma<span className="text-accent-blue">Admin</span></h1>
                        <p className="text-text-muted">Yönetim paneline giriş yapın.</p>
                    </div>

                    <div className="bg-secondary/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleLogin} className="space-y-4">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">E-posta</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-accent-blue focus:outline-none transition-colors"
                                        placeholder="admin@digma.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-muted">Şifre</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-accent-blue focus:outline-none transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                variant="accent"
                                className="w-full mt-4"
                                disabled={loading}
                            >
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </Button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default Login;
