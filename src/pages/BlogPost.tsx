
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { PremiumBackground } from '../components/ui/PremiumBackground';
import { FadeIn } from '../components/animations/FadeIn';
import { Helmet } from 'react-helmet-async';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';
import { generateArticleSchema } from '../utils/seo-helpers';

interface Post {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    cover_image: string;
    category: string;
    published_at: string;
    updated_at: string;
    author_id: string;
    seo_title: string;
    seo_desc: string;
    focus_keyword: string;
    canonical_url: string;
    is_indexable: boolean;
    tags: string[];
}

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (data) {
                setPost(data);
                // Increment view count (fire and forget)
                supabase.rpc('increment_page_view', { page_id: data.id });
            }
            setLoading(false);
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="min-h-screen pt-32 text-center text-white">Yükleniyor...</div>;
    if (!post) return <div className="min-h-screen pt-32 text-center text-white">Yazı bulunamadı.</div>;

    return (
        <PremiumBackground>
            <SEO
                title={`${post.seo_title || post.title} | Digma`}
                description={post.seo_desc || post.summary}
                canonical={post.canonical_url || window.location.href}
                ogType="article"
                ogImage={post.cover_image}
                schema={generateArticleSchema({
                    title: post.seo_title || post.title,
                    summary: post.seo_desc || post.summary,
                    cover_image: post.cover_image,
                    published_at: post.published_at,
                    slug: post.slug,
                    author: "Digma Digital Agency"
                })}
            />

            {!post.is_indexable && (
                <Helmet>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
            )}

            <article className="pt-32 pb-20 px-4">
                <div className="container mx-auto">
                    {/* Hero Header */}
                    <div className="relative mb-16 max-w-4xl mx-auto">
                        <Link to="/blog" className="inline-flex items-center text-sm text-text-muted hover:text-white mb-8 transition-colors group">
                            <ArrowLeft size={16} className="mr-2 transform group-hover:-translate-x-1 transition-transform" /> Blog'a Dön
                        </Link>

                        <FadeIn>
                            <div className="flex items-center gap-4 text-sm font-medium text-text-muted mb-6">
                                {post.category && (
                                    <span className="bg-accent-blue/10 border border-accent-blue/20 text-accent-blue px-3 py-1 rounded-full backdrop-blur-md">
                                        {post.category}
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                                    <Calendar size={14} />
                                    {new Date(post.published_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="text-xl text-text-muted leading-relaxed border-l-4 border-accent-blue pl-6 italic bg-white/5 p-4 rounded-r-xl">
                                {post.summary}
                            </div>
                        </FadeIn>
                    </div>

                    {/* Cover Image */}
                    {post.cover_image && (
                        <FadeIn delay={0.2}>
                            <div className="w-full max-w-5xl mx-auto h-[400px] md:h-[600px] mb-16 overflow-hidden rounded-3xl border border-white/10 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                        </FadeIn>
                    )}

                    {/* Content */}
                    <div className="max-w-3xl mx-auto">
                        <div className="glass-card p-8 md:p-12 rounded-3xl">
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent-blue prose-img:rounded-xl prose-p:leading-relaxed prose-li:text-text-muted">
                                <Markdown remarkPlugins={[remarkGfm]}>
                                    {post.content}
                                </Markdown>
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="mt-16 pt-8 border-t border-white/10">
                                    <h3 className="text-sm font-medium text-text-muted mb-4">Etiketler</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-sm bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/10 transition-colors cursor-default">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </PremiumBackground>
    );
};

export default BlogPost;
