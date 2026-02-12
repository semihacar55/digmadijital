import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "./Button"; // Use our custom Button with variants

interface CTA {
    label: string;
    href: string;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'accent';
    target?: string;
    rel?: string;
}

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    ctas?: CTA[];
    imageSrc?: string;
    className?: string;
}

export function HeroSection({
    title,
    subtitle,
    ctas,
    imageSrc,
    className
}: HeroSectionProps) {
    return (
        <section className={cn(
            "relative w-full overflow-hidden bg-background text-foreground rounded-3xl min-h-[520px] md:min-h-[560px] lg:min-h-[520px] flex items-center transition-colors duration-300",
            className
        )}>
            {/* --- BACKGROUNDS & DECORS --- */}

            {/* Desktop: Dynamic Gradient based on theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30 z-0" />

            {/* Subtle Noise */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

            {/* Glow Effects (Desktop/Tablet) */}
            <div className="hidden md:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* --- MOBILE IMAGE BACKGROUND (< md) --- */}
            {imageSrc && (
                <div className="absolute inset-0 z-0 md:hidden">
                    <img
                        src={imageSrc}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Mobile Overlay: Stronger gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/95" />
                </div>
            )}

            {/* --- CONTENT CONTAINER --- */}
            <div className="container mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20 lg:py-24 relative z-10 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">

                    {/* LEFT COLUMN: Text Content */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight leading-[0.95] text-foreground mb-6 text-balance max-w-[18ch]">
                            {title
                                .split(" ")
                                .map((word, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.1,
                                            ease: "easeOut",
                                        }}
                                        className="inline-block mr-[0.25em] last:mr-0"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                        </h1>

                        {/* Subtitle */}
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-base md:text-lg text-muted-foreground max-w-[48ch] mb-8 md:mb-10 leading-relaxed"
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        {/* CTAs */}
                        {ctas && ctas.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto"
                            >
                                {ctas.map((cta, idx) => {
                                    const isFirst = idx === 0;
                                    const isOutline = cta.variant === 'outline';

                                    if (cta.href.startsWith("http")) {
                                        return (
                                            <a
                                                key={idx}
                                                href={cta.href}
                                                target={cta.target}
                                                rel={cta.rel}
                                                className={cn(
                                                    "w-full md:w-auto transition-all",
                                                    !isFirst && "md:block mt-2 md:mt-0 text-sm underline text-foreground md:text-base md:no-underline md:text-inherit"
                                                )}
                                            >
                                                <div className={cn(!isFirst ? "hidden md:block" : "block")}>
                                                    <Button
                                                        variant={cta.variant as any || 'default'}
                                                        size="lg"
                                                        className={cn("w-full md:min-w-[160px]", isOutline && "bg-surface/50 border-border backdrop-blur-sm hover:bg-surface")}
                                                    >
                                                        {cta.label}
                                                    </Button>
                                                </div>
                                                {!isFirst && (
                                                    <span className="md:hidden text-muted-foreground hover:text-foreground font-medium">
                                                        {cta.label}
                                                    </span>
                                                )}
                                            </a>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={idx}
                                            to={cta.href}
                                            className={cn(
                                                "w-full md:w-auto flex justify-center",
                                            )}
                                        >
                                            <div className={cn(
                                                "w-full md:w-auto",
                                                !isFirst ? "hidden md:block" : "block"
                                            )}>
                                                <Button
                                                    variant={cta.variant as any || 'default'}
                                                    size="lg"
                                                    className={cn("w-full md:min-w-[160px]", isOutline && "bg-surface/50 border-border backdrop-blur-sm hover:bg-surface")}
                                                >
                                                    {cta.label}
                                                </Button>
                                            </div>

                                            {!isFirst && (
                                                <span className="md:hidden mt-2 text-muted-foreground hover:text-foreground font-medium text-sm border-b border-transparent hover:border-foreground transition-colors">
                                                    {cta.label}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Desktop Image Card */}
                    {imageSrc && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                            className="hidden md:flex justify-end relative z-10"
                        >
                            <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur overflow-hidden shadow-2xl max-w-lg lg:max-w-xl w-full aspect-[4/3] group">
                                {/* Inner Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    );
}
