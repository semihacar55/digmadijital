import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Section } from '../components/ui/Section';

const Services = () => {
    return (
        <Section className="pt-32">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                        Hizmetlerimiz
                    </h1>
                    <p className="text-lg text-text-muted">
                        Markanızın dijital dünyada büyümesi için ihtiyaç duyduğunuz tüm çözümleri tek çatı altında sunuyoruz.
                    </p>
                </div>
                <ServicesGrid />
            </div>
        </Section>
    );
};
export default Services;
