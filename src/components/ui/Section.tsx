import React from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
    id?: string;
    padding?: 'tight' | 'default' | 'spacious' | 'none';
    variant?: 'default' | 'surface'; // New variant prop
    overflowHidden?: boolean;
}

const Section = ({
    className,
    children,
    container = true,
    id,
    padding = 'default',
    variant = 'default',
    overflowHidden = false,
    ...props
}: SectionProps) => {
    const paddingClasses = {
        tight: "py-10 md:py-14",
        default: "py-14 md:py-20",
        spacious: "py-20 md:py-28", // Increased for premium feel
        none: ""
    };

    const variantClasses = {
        default: "bg-transparent", // Let global background show through
        surface: "bg-surface/55 border-y border-white/5 backdrop-blur-sm" // Band effect
    };

    return (
        <section
            id={id}
            className={cn(
                "relative",
                paddingClasses[padding],
                variantClasses[variant],
                overflowHidden && "overflow-hidden",
                className
            )}
            {...props}
        >
            {container ? (
                <div className="container mx-auto px-4 md:px-6">
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
};

export { Section };
