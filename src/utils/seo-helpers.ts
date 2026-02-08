export const generateOrganizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Digma Dijital',
    url: 'https://digma.com.tr', // Replace with actual domain
    logo: 'https://digma.com.tr/logo.png', // Replace with actual logo
    sameAs: [
        'https://www.linkedin.com/company/digma-dijital',
        'https://www.instagram.com/digmadijital',
        // Add other social links
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+90-555-555-5555', // Replace
        contactType: 'customer service',
        areaServed: 'TR',
        availableLanguage: 'Turkish'
    }
});

export const generateArticleSchema = (post: {
    title: string;
    summary: string;
    cover_image?: string;
    published_at: string;
    slug: string;
    author?: string;
}) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.cover_image,
    datePublished: post.published_at,
    author: {
        '@type': 'Organization', // Or Person if we have author data
        name: post.author || 'Digma Dijital'
    },
    publisher: {
        '@type': 'Organization',
        name: 'Digma Dijital',
        logo: {
            '@type': 'ImageObject',
            url: 'https://digma.com.tr/logo.png'
        }
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://digma.com.tr/blog/${post.slug}`
    }
});
