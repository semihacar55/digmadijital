import React from 'react';
import { cn } from './Button';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
    id?: string;
    padding?: 'tight' | 'default' | 'spacious' | 'none';
    overflowHidden?: boolean;
}

const Section = ({
    className,
    children,
    container = true,
    id,
    padding = 'default',
    overflowHidden = false,
    ...props
}: SectionProps) => {
    const paddingClasses = {
        tight: "py-10 md:py-14",
        default: "py-14 md:py-20",
        spacious: "py-16 md:py-24",
        none: ""
    };

    return (
        <section
            id={id}
            className={cn(
                "relative",
                paddingClasses[padding],
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
