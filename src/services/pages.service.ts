import { supabase } from '../lib/supabase';

export interface Page {
    id: string;
    page_key: 'about' | 'contact';
    title: string;
    slug: string;
    hero_title: string | null;
    hero_subtitle: string | null;
    content_markdown: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    contact_address: string | null;
    contact_map_url: string | null;
    contact_form_enabled: boolean;
    contact_form_to_email: string | null;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string | null;
    og_image_url: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Get page by key (about or contact)
 */
export const getPageByKey = async (key: 'about' | 'contact'): Promise<Page | null> => {
    try {
        const { data, error } = await supabase
            .from('pages')
            .select('*')
            .eq('page_key', key)
            .single();

        if (error) {
            console.error(`Error fetching ${key} page:`, error);
            return null;
        }

        return data;
    } catch (err) {
        console.error(`Critical error fetching ${key} page:`, err);
        return null;
    }
};

/**
 * Update page by key
 */
export const updatePage = async (
    key: 'about' | 'contact',
    updates: Partial<Omit<Page, 'id' | 'page_key' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; data?: Page; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('pages')
            .update(updates)
            .eq('page_key', key)
            .select()
            .single();

        if (error) {
            console.error(`Error updating ${key} page:`, error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error(`Critical error updating ${key} page:`, err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        };
    }
};

/**
 * Get default page content (fallback)
 */
export const getDefaultPageContent = (key: 'about' | 'contact'): Partial<Page> => {
    if (key === 'about') {
        return {
            page_key: 'about',
            title: 'Hakkımızda',
            hero_title: 'Hakkımızda',
            hero_subtitle: 'Dijital dünyada markanızı büyütüyoruz',
            content_markdown: 'Ajans hikayesi burada olacak.',
            seo_title: 'Hakkımızda | Digma Dijital',
            seo_description: 'Digma Dijital hakkında bilgi edinin',
        };
    } else {
        return {
            page_key: 'contact',
            title: 'İletişim',
            hero_title: 'İletişim',
            hero_subtitle: 'Bizimle iletişime geçin',
            content_markdown: 'Projeleriniz için bizimle iletişime geçebilirsiniz.',
            contact_email: 'merhaba@digma.com',
            contact_phone: '+90 (212) 555 00 00',
            contact_address: 'Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul',
            contact_form_enabled: true,
            contact_form_to_email: 'merhaba@digma.com',
            seo_title: 'İletişim | Digma Dijital',
            seo_description: 'Digma Dijital ile iletişime geçin',
        };
    }
};
