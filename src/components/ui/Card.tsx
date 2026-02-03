import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from './Button'; // Re-use cn utility

interface CardProps extends HTMLMotionProps<"div"> {
    hoverEffect?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, hoverEffect = true, ...props }, ref) => {
        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
            const { currentTarget, clientX, clientY } = e;
            const { left, top } = currentTarget.getBoundingClientRect();
            const mouseX = clientX - left;
            const mouseY = clientY - top;
            currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
            currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
        };

        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : undefined}
                onMouseMove={handleMouseMove}
                className={cn(
                    "relative group bg-secondary/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 h-full overflow-hidden",
                    className
                )}
                {...props}
            >
                {/* Radial Gradient Highlight on Hover */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)`
                    }}
                />
                {/* Border Glow */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1), transparent 40%)`,
                        zIndex: 0
                    }}
                />

                <div className="relative z-10">
                    {children as React.ReactNode}
                </div>
            </motion.div>
        );
    }
);

Card.displayName = "Card";

export { Card };
