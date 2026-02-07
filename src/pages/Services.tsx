import { ServicesGrid } from '../components/sections/ServicesGrid';
import { Section } from '../components/ui/Section';
import { PageHero } from '../components/ui/PageHero';

const Services = () => {
    return (
        <>
            <PageHero
                title="Hizmetlerimiz"
                subtitle="Markanızın dijital dünyada büyümesi için ihtiyaç duyduğunuz tüm çözümleri tek çatı altında sunuyoruz."
                breadcrumb={[{ label: 'Digma' }, { label: 'Hizmetler' }]}
            />
            <Section className="pb-20">
                <div className="container mx-auto px-4">
                    <ServicesGrid />
                </div>
            </Section>
        </>
    );
};
export default Services;
