
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Ahmet Yılmaz",
        role: "Pazarlama Müdürü, TechCo",
        text: "Digma ile çalışmaya başladıktan sonra reklam maliyetlerimizde %40 düşüş, dönüşümlerimizde ise 2 kat artış yakaladık. Raporlamaları çok şeffaf."
    },
    {
        name: "Ayşe Demir",
        role: "Kurucu, ModaButik",
        text: "Kreatif ekibin vizyonu markamızı bambaşka bir seviyeye taşıdı. Sosyal medya etkileşimlerimiz hiç bu kadar yüksek olmamıştı."
    },
    {
        name: "Mehmet Öz",
        role: "CEO, StartUp X",
        text: "SEO çalışmalarının etkisini 3. aydan itibaren net bir şekilde gördük. Organik trafiğimiz ana gelir kalemimiz haline geldi."
    },
];

const Testimonials = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
                <Card key={i} className="bg-gradient-to-br from-secondary to-secondary/50">
                    <div className="flex gap-1 mb-4 text-accent-green">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-text-main/90 italic mb-6 leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                            {t.name.substring(0, 2)}
                        </div>
                        <div>
                            <h4 className="font-bold text-sm text-white">{t.name}</h4>
                            <p className="text-xs text-text-muted">{t.role}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export { Testimonials };
