// GlobalBackground component - Fixed radial glows

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
            {/* Layer 1: Premium Charcoal Base (Deep Dark) */}
            <div className="absolute inset-0 bg-background" />

            {/* Layer 2: Premium Radial Glows (Amber/Violet/Teal) */}
            {/* Top-Right: Violet Glow */}
            <div
                className="absolute top-0 right-0 w-[80%]"
                style={{
                    height: '80%',
                    background: 'radial-gradient(circle at 70% 20%, hsla(var(--glow-violet), 0.12), transparent 60%)',
                    transform: 'translateZ(0)',
                }}
            />

            {/* Top-Left: Amber Glow */}
            <div
                className="absolute top-0 left-0 w-[60%]"
                style={{
                    height: '60%',
                    background: 'radial-gradient(circle at 20% 20%, hsla(var(--glow-amber), 0.08), transparent 50%)',
                    transform: 'translateZ(0)',
                }}
            />

            {/* Bottom-Center: Teal Glow */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%]"
                style={{
                    height: '60%',
                    background: 'radial-gradient(circle at 50% 100%, hsla(var(--glow-teal), 0.10), transparent 60%)',
                    transform: 'translateZ(0)',
                }}
            />

            {/* Mobile/Center subtle fill */}
            <div className="absolute inset-0 opacity-20 md:hidden bg-gradient-to-b from-transparent via-accent-purple/5 to-transparent" />

            {/* Layer 3: Noise Overlay for Premium Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default GlobalBackground;
