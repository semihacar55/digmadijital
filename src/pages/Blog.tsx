
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FadeIn } from '../components/animations/FadeIn';
import { PremiumBackground } from '../components/ui/PremiumBackground';
import { PageHero } from '../components/ui/PageHero';
import { ArticleCard } from '../components/ui/blog-post-card';
import SEO from '../components/seo/SEO';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs.tsx';

interface Post {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content?: string;
    cover_image: string;
    category: string;
    published_at: string;
    author_id: string; // In a real app we'd fetch author profile
}

const Blog = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (data) setPosts(data);
            setLoading(false);
        };
        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (selectedCategory === 'all') return posts;
        return posts.filter(post => {
            const category = post.category.toLowerCase();
            if (selectedCategory === 'sosyal-medya') {
                return category.includes('sosyal medya') || category.includes('sosyal-media');
            }
            return category.includes(selectedCategory.toLowerCase());
        });
    }, [posts, selectedCategory]);

    const calculateReadingTime = (text: string) => {
        if (!text) return 0;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute) * 60; // seconds
    };

    return (
        <PremiumBackground>

            <SEO
                title="Blog | Digma Digital Agency"
                description="Dijital pazarlama, web tasarım ve teknoloji dünyasından güncel haberler ve ipuçları."
            />

            <PageHero
                title="Blog & İçgörüler"
                subtitle="Dijital dünyadaki trendler, stratejiler ve başarı hikayeleri."
                breadcrumb={[{ label: 'Digma' }, { label: 'Blog' }]}
            />

            <div className="pb-20 px-4">
                <div className="container mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20 text-text-muted glass-card rounded-2xl max-w-md mx-auto">
                            Henüz yazı bulunmuyor.
                        </div>
                    ) : (
                        <>
                            {/* Category Tabs */}
                            <div className="mb-12 flex justify-center">
                                <Tabs defaultValue="all" className="w-full max-w-4xl">
                                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 lg:w-auto lg:inline-grid">
                                        <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>
                                            Tümü ({posts.length})
                                        </TabsTrigger>
                                        <TabsTrigger value="seo" onClick={() => setSelectedCategory('seo')}>
                                            SEO ({posts.filter(p => p.category.toLowerCase() === 'seo').length})
                                        </TabsTrigger>
                                        <TabsTrigger value="pazarlama" onClick={() => setSelectedCategory('pazarlama')}>
                                            Pazarlama ({posts.filter(p => p.category.toLowerCase().includes('pazarlama')).length})
                                        </TabsTrigger>
                                        <TabsTrigger value="sosyal-medya" onClick={() => setSelectedCategory('sosyal-medya')}>
                                            Sosyal Medya ({posts.filter(p => p.category.toLowerCase().includes('sosyal')).length})
                                        </TabsTrigger>
                                        <TabsTrigger value="teknoloji" onClick={() => setSelectedCategory('teknoloji')}>
                                            Teknoloji ({posts.filter(p => p.category.toLowerCase().includes('teknoloji')).length})
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>

                            {/* Blog Posts Grid */}
                            {filteredPosts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                                    {filteredPosts.map((post, index) => (
                                        <FadeIn key={post.id} delay={index * 0.1} fullWidth className="h-full">
                                            <Link to={`/blog/${post.slug}`} className="block h-full">
                                                <ArticleCard
                                                    headline={post.title}
                                                    excerpt={post.summary || post.content?.substring(0, 160) + '...' || ''}
                                                    cover={post.cover_image}
                                                    tag={post.category}
                                                    publishedAt={new Date(post.published_at)}
                                                    writer="Digma Ekibi"
                                                    readingTime={calculateReadingTime(post.content || post.summary || '')}
                                                    clampLines={3}
                                                />
                                            </Link>
                                        </FadeIn>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-text-muted text-lg">Bu kategoride henüz yazı bulunmuyor.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </PremiumBackground>
    );
};

export default Blog;
