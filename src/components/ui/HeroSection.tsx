import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import { Button } from "./Button"; // Use our custom Button with variants

interface CTA {
    label: string;
    href: string;
    variant?: 'accent' | 'outline' | 'secondary' | 'ghost';
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
            "relative w-full overflow-hidden bg-background text-foreground rounded-3xl min-h-[520px] md:min-h-[560px] lg:min-h-[520px] flex items-center",
            className
        )}>
            {/* --- BACKGROUNDS & DECORS --- */}

            {/* Desktop: Dark Premium Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#070a10] to-[#05070c] z-0" />

            {/* Subtle Noise */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

            {/* Glow Effects (Desktop/Tablet) */}
            <div className="hidden md:block absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* --- MOBILE IMAGE BACKGROUND (< md) --- */}
            {imageSrc && (
                <div className="absolute inset-0 z-0 md:hidden">
                    <img
                        src={imageSrc}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Mobile Overlay: Stronger gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
                </div>
            )}

            {/* --- CONTENT CONTAINER --- */}
            <div className="container mx-auto px-6 md:px-10 lg:px-14 py-16 md:py-20 lg:py-24 relative z-10 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">

                    {/* LEFT COLUMN: Text Content */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold tracking-tight leading-[0.95] text-white mb-6 text-balance max-w-[18ch]">
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
                                className="text-base md:text-lg text-white/70 max-w-[48ch] mb-8 md:mb-10 leading-relaxed"
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

                                    // Mobile Logic: 
                                    // 1st button -> Full width Primary Button
                                    // 2nd button -> Text Link (pseudo-button look removed on mobile)
                                    // Desktop Logic: Standard buttons side-by-side

                                    // Check if we are on mobile (CSS check logic relies on classes)
                                    // We use classes to handle visual differences

                                    if (cta.href.startsWith("http")) {
                                        return (
                                            <a
                                                key={idx}
                                                href={cta.href}
                                                target={cta.target}
                                                rel={cta.rel}
                                                className={cn(
                                                    "w-full md:w-auto transition-all",
                                                    !isFirst && "md:block mt-2 md:mt-0 text-sm underline text-white md:text-base md:no-underline md:text-inherit"
                                                    // Mobile: Second item looks like text link. Desktop: Standard button wrapper
                                                )}
                                            >
                                                {/* Render Button component usually, but for 2nd mobile item we might want just text if requested. 
                                                     However user asked for "Secondary 'Bize Ulaşın' text link (buton değil)" on mobile.
                                                 */}
                                                <div className={cn(!isFirst ? "hidden md:block" : "block")}>
                                                    <Button
                                                        variant={cta.variant as any || 'accent'}
                                                        size="lg"
                                                        className={cn("w-full md:min-w-[160px]", isOutline && "bg-white/5 border-white/10 backdrop-blur-sm")}
                                                    >
                                                        {cta.label}
                                                    </Button>
                                                </div>
                                                {/* Mobile Only Text Link for 2nd item */}
                                                {!isFirst && (
                                                    <span className="md:hidden text-white/80 hover:text-white font-medium">
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
                                                "w-full md:w-auto flex justify-center", // Flex center for the text link
                                            )}
                                        >
                                            {/* Primary (First) or Desktop View */}
                                            <div className={cn(
                                                "w-full md:w-auto",
                                                !isFirst ? "hidden md:block" : "block"
                                            )}>
                                                <Button
                                                    variant={cta.variant as any || 'accent'}
                                                    size="lg"
                                                    className={cn("w-full md:min-w-[160px]", isOutline && "bg-white/5 border-white/10 backdrop-blur-sm")}
                                                >
                                                    {cta.label}
                                                </Button>
                                            </div>

                                            {/* Secondary CTA as Link on Mobile */}
                                            {!isFirst && (
                                                <span className="md:hidden mt-2 text-white/80 hover:text-white font-medium text-sm border-b border-transparent hover:border-white transition-colors">
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
                            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-2xl max-w-lg lg:max-w-xl w-full aspect-[4/3] group">
                                {/* Inner Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

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
