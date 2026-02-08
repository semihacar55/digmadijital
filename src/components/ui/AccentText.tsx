import { type ReactNode } from 'react';

interface AccentTextProps {
    children: ReactNode;
    enabled?: boolean;
    className?: string;
}

/**
 * AccentText component for highlighting text with a single color.
 * Used only in homepage section headers.
 * No gradient, no italic - just a simple color change.
 */
export const AccentText = ({ children, enabled = true, className = '' }: AccentTextProps) => {
    if (!enabled) {
        return <>{children}</>;
    }

    return (
        <span className={`text-sky-400 font-semibold not-italic ${className}`}>
            {children}
        </span>
    );
};
