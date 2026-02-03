import React from 'react';
import { cn } from './Button';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    container?: boolean;
    id?: string;
}

const Section = ({ className, children, container = true, id, ...props }: SectionProps) => {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-32 relative overflow-hidden", className)}
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
