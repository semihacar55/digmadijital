// ==========================================
// CTA Template System Types
// ==========================================

/**
 * CTA Button Template - defined in code, not by admin
 * Represents the structure and defaults for a CTA button
 */
export interface CTATemplate {
    key: string;                    // Unique identifier (e.g., 'get-offer', 'contact')
    defaultLabel: string;           // Default button text
    defaultHref: string;            // Default link
    defaultVariant: 'accent' | 'outline' | 'secondary' | 'ghost';
    defaultTarget: 'same_tab' | 'new_tab';
    order: number;                  // Display order
}

/**
 * CTA Override - stored in database
 * Contains only the fields that override template defaults
 */
export interface CTAOverride {
    label?: string;                 // Override defaultLabel
    href?: string;                  // Override defaultHref
    variant?: 'accent' | 'outline' | 'secondary' | 'ghost';
    target?: 'same_tab' | 'new_tab';
    isEnabled?: boolean;            // Default: true if not specified
}

// ==========================================
// Service Types
// ==========================================

export interface ProcessStep {
    title: string;
    desc: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface Benefit {
    title: string;
    desc?: string;
}

export interface Service {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    icon: string;
    status: 'draft' | 'published';
    seo_title: string;
    seo_desc: string;
    image_url?: string;
    process: ProcessStep[];
    faq: FAQItem[];
    benefits: Benefit[];
    cta_overrides?: Record<string, CTAOverride>;  // Key = template.key
    created_at?: string;
    updated_at?: string;
}
