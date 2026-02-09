import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const variants = {
            // Primary: Brand color background, white text (Standard)
            // Or if previous design was white button on dark bg, we can adapt.
            // Let's use semantic "primary" which maps to Brand color.
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-brand/20",

            // Secondary: Surface 2 (lighter/darker depending on mode)
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",

            // Outline: Bordered, transparent
            outline: "bg-transparent border border-border text-foreground hover:bg-surface hover:text-foreground",

            // Ghost: Transparent, hover effect
            ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-surface",

            // Accent: Specifically Brand Color (if Primary is different)
            accent: "bg-accent-blue text-white hover:bg-brand-2 shadow-lg shadow-brand/20",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button, cn };
