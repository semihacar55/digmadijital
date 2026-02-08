import { supabase } from '@/lib/supabase';

export interface HomepageSection {
    id: string;
    section_key: string;
    title: string;
    description: string | null;
    highlight: string | null;
    cta_label: string | null;
    cta_href: string | null;
    is_enabled: boolean;
    order_index: number;
    settings: Record<string, any>;
    image1_url?: string;
    image1_alt?: string;
    image2_url?: string;
    image2_alt?: string;
}

export const getHomepageSections = async (): Promise<HomepageSection[]> => {
    const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .eq('is_enabled', true)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching homepage sections:', error);
        return [];
    }

    return data || [];
};
