import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    twitterCard?: 'summary' | 'summary_large_image';
    schema?: Record<string, any>;
}

const SEO = ({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    schema
}: SEOProps) => {
    const siteUrl = window.location.origin; // In a real app, from env var
    const fullCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : window.location.href;
    const fullOgImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`) : `${siteUrl}/og-default.jpg`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" content={fullOgImage} />
            <meta property="og:site_name" content="Digma Dijital" />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullOgImage} />

            {/* JSON-LD Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
