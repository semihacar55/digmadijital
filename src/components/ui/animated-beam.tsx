import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBeamProps {
    className?: string;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    delay?: number;
    duration?: number;
    color?: string;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
    className,
    fromX,
    fromY,
    toX,
    toY,
    delay = 0,
    duration = 2,
    color = '#3B82F6',
}) => {
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = `${length}`;
            pathRef.current.style.strokeDashoffset = `${length}`;

            setTimeout(() => {
                if (pathRef.current) {
                    pathRef.current.style.transition = `stroke-dashoffset ${duration}s ease-in-out`;
                    pathRef.current.style.strokeDashoffset = '0';
                }
            }, delay * 1000);
        }
    }, [delay, duration]);

    // Calculate control points for smooth curve
    const controlX1 = fromX + (toX - fromX) * 0.3;
    const controlY1 = fromY;
    const controlX2 = fromX + (toX - fromX) * 0.7;
    const controlY2 = toY;

    return (
        <svg
            className={cn('absolute inset-0 pointer-events-none', className)}
            style={{ overflow: 'visible' }}
        >
            <defs>
                <linearGradient id={`beam-gradient-${fromX}-${fromY}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={color} stopOpacity="0" />
                    <stop offset="50%" stopColor={color} stopOpacity="1" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <path
                ref={pathRef}
                d={`M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`}
                stroke={`url(#beam-gradient-${fromX}-${fromY})`}
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
            />
        </svg>
    );
};

interface BeamContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const BeamContainer: React.FC<BeamContainerProps> = ({ children, className }) => {
    return (
        <div className={cn('relative', className)}>
            {children}
        </div>
    );
};
