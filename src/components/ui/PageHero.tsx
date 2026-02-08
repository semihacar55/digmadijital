import { type ReactNode } from 'react';
import { FadeIn } from '../animations/FadeIn';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeroProps {
    title: string;
    subtitle?: string;
    breadcrumb?: BreadcrumbItem[];
    variant?: 'slim' | 'default';
    children?: ReactNode;
    className?: string;
}

export const PageHero = ({
    title,
    subtitle,
    breadcrumb,
    children,
    className = ''
}: PageHeroProps) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Subtle Premium Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.05) 0%, transparent 50%)'
                }}
            />

            {/* Decorative Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-blue/10 blur-3xl rounded-full pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 pt-24 md:pt-32 pb-10 md:pb-12 px-4">
                <div className="container mx-auto">
                    <FadeIn>
                        <div className="text-center max-w-3xl mx-auto">
                            {/* Breadcrumb */}
                            {breadcrumb && breadcrumb.length > 0 && (
                                <div className="mb-6 flex justify-center">
                                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                                        <p className="text-sm text-text-muted/80">
                                            {breadcrumb.map((item, index) => (
                                                <span key={index}>
                                                    {index > 0 && (
                                                        <span className="text-accent-blue mx-2">/</span>
                                                    )}
                                                    <span className={index === breadcrumb.length - 1 ? 'text-white' : ''}>
                                                        {item.label}
                                                    </span>
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                                {title}
                            </h1>

                            {/* Subtitle */}
                            {subtitle && (
                                <p className="mt-3 text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                                    {subtitle}
                                </p>
                            )}

                            {/* Custom Children */}
                            {children && (
                                <div className="mt-6">
                                    {children}
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};
