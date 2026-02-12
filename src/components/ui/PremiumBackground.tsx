import type { ReactNode } from 'react';


interface PremiumBackgroundProps {
    children: ReactNode;
    className?: string;
}

export const PremiumBackground = ({ children, className = '' }: PremiumBackgroundProps) => {
    return (
        <div className={`relative min-h-screen w-full overflow-hidden bg-transparent ${className} pb-20 md:pb-0`}>
            {/* 1. Base Gradient - REMOVED to allow GlobalBackground to show */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 z-0" /> */}

            {/* 2. Animated Glow Orbs (Subtle, floating ambience) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-60 md:opacity-40">
                {/* Top Left Orb - Magenta/Brand */}
                <div className="absolute -top-[20%] -left-[20%] w-[120vw] h-[120vw] md:-top-[10%] md:-left-[10%] md:w-[50vw] md:h-[50vw] rounded-full bg-accent-magenta/15 md:bg-accent-magenta/10 blur-[80px] md:blur-[100px] animate-float-slow" />

                {/* Bottom Right Orb - Gold */}
                <div className="absolute -bottom-[20%] -right-[20%] w-[120vw] h-[120vw] md:-bottom-[10%] md:-right-[10%] md:w-[60vw] md:h-[60vw] rounded-full bg-accent-gold/20 md:bg-accent-gold/10 blur-[100px] md:blur-[120px] animate-float-medium" />

                {/* Center subtle glow - Emerald */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] rounded-full bg-accent-emerald/10 md:bg-accent-emerald/5 blur-[120px] md:blur-[150px]" />
            </div>

            {/* 3. Noise Texture (Premium grain) - Kept as additional texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-10"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* 4. Vignette (Depth focus) */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none z-20" />

            {/* 5. Minimal Grid Pattern (Optional subtle detail) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none z-0" />

            {/* Content Wrapper */}
            <div className="relative z-30">
                {children}
            </div>
        </div>
    );
};
