import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CheckCircle2, Target } from 'lucide-react';

interface ServiceDetailContentProps {
    children: string;
}

/**
 * Premium wrapper component for ServiceDetail markdown content.
 * Provides a glass-card container with enhanced typography for dark mode.
 */
export const ServiceDetailContent = ({ children }: ServiceDetailContentProps) => {
    return (
        <div className="relative w-full max-w-5xl mx-auto">
            {/* Glass Card Container */}
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden">

                {/* Content Area */}
                <article className="relative z-10 px-6 sm:px-10 py-12 sm:py-16">
                    <div className="prose prose-invert max-w-none
                        prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-white/90 prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-base md:prose-p:text-lg prose-p:leading-8 prose-p:text-white/70 prose-p:mb-6
                        prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                        prose-strong:text-white prose-strong:font-semibold
                        prose-li:text-white/70
                        prose-hr:border-white/10 prose-hr:my-10
                        prose-blockquote:border-l-accent-blue prose-blockquote:bg-white/5 prose-blockquote:text-white/80 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                h2: ({ node, children, ...props }) => (
                                    <div className="group">
                                        <div className="flex items-center gap-3 mb-6 mt-16 first:mt-0">
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                            <span className="text-accent-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                                                Bölüm
                                            </span>
                                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 text-center" {...props}>
                                            {children}
                                        </h2>
                                    </div>
                                ),
                                h3: ({ node, children, ...props }) => (
                                    <h3 className="flex items-center gap-3 text-xl md:text-2xl font-semibold text-white mt-10 mb-4" {...props}>
                                        <span className="w-1.5 h-6 bg-accent-blue rounded-full" />
                                        {children}
                                    </h3>
                                ),
                                ul: ({ node, children, ...props }) => (
                                    <ul className="space-y-4 my-8" {...props}>
                                        {children}
                                    </ul>
                                ),
                                li: ({ node, children, ...props }) => {
                                    // Handle checkmark lists specifically if needed, otherwise default styling with custom marker
                                    return (
                                        <li className="flex items-start gap-3 text-white/70 text-lg leading-relaxed pl-0" {...props}>
                                            <CheckCircle2 className="w-6 h-6 text-accent-blue shrink-0 mt-1" />
                                            <span className="flex-1">{children}</span>
                                        </li>
                                    );
                                },
                                blockquote: ({ node, children, ...props }) => (
                                    <blockquote className="border-l-4 border-accent-blue bg-gradient-to-r from-accent-blue/10 to-transparent py-6 px-8 rounded-r-xl my-8" {...props}>
                                        <p className="text-xl italic text-white/90 font-medium m-0 flex gap-4">
                                            <span className="text-6xl text-accent-blue/20 -mt-4 font-serif">“</span>
                                            <span className="flex-1">{children}</span>
                                        </p>
                                    </blockquote>
                                ),
                                // Custom handling for "Hedef:" paragraphs if they exist in markdown
                                p: ({ node, children, ...props }) => {
                                    const childArray = Array.isArray(children) ? children : [children];

                                    // Simple check if the paragraph starts with "Hedef:" or "Goal:"
                                    // Note: traversing children to find the string content
                                    let fullText = '';
                                    childArray.forEach(c => {
                                        if (typeof c === 'string') fullText += c;
                                    });

                                    if (fullText.startsWith('Hedef:') || fullText.startsWith('Önemli:')) {
                                        const type = fullText.startsWith('Hedef:') ? 'Hedef' : 'Önemli';
                                        const content = fullText.replace(/^(Hedef:|Önemli:)/, '').trim();


                                        return (
                                            <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-6 my-8">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
                                                        <Target className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-accent-blue uppercase tracking-wider mb-1">
                                                            {type}
                                                        </div>
                                                        <p className="text-white/80 text-lg m-0">
                                                            {content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return <p {...props}>{children}</p>;
                                }
                            }}
                        >
                            {children}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
};
