import { supabase } from '@/lib/supabase';

export interface Reference {
    id: string;
    brand_name: string;
    logo_url: string;
    type: 'logo' | 'testimonial';
    sector: string | null;
    status: 'active' | 'inactive';
    sort_order: number;
    website_url?: string | null;
    content?: string | null;
    person_name?: string | null;
    person_role?: string | null;
    person_company?: string | null;
    rating?: number | null;
}

export const getLogos = async (): Promise<Reference[]> => {
    const { data, error } = await supabase
        .from('references')
        .select('*')
        .eq('type', 'logo')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching logos:', error);
        return [];
    }

    return data || [];
};

export const getTestimonials = async (): Promise<Reference[]> => {
    const { data, error } = await supabase
        .from('references')
        .select('*')
        .eq('type', 'testimonial')
        .eq('status', 'active')
        .order('sort_order', { ascending: true });

    if (error) {
        console.error('Error fetching testimonials:', error);
        return [];
    }

    return data || [];
};
