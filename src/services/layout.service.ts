import { supabase } from '../lib/supabase';

export interface LayoutSettings {
    id: number;
    header_logo_url: string | null;
    header_logo_alt: string;
    favicon_url: string | null;
    header_menu: HeaderMenuItem[];
    header_cta_label: string;
    header_cta_href: string;
    header_cta_enabled: boolean;
    footer_columns: FooterColumn[];
    footer_socials: SocialLink[];
    footer_contact: ContactInfo;
    footer_copyright: string;
    footer_enabled: boolean;
    created_at: string;
    updated_at: string;
}

export interface HeaderMenuItem {
    label: string;
    href: string;
    enabled: boolean;
    order: number;
    isExternal: boolean;
}

export interface FooterColumn {
    title: string;
    links: { label: string; href: string }[];
}

export interface SocialLink {
    platform: 'instagram' | 'linkedin' | 'twitter' | 'facebook' | 'youtube';
    url: string;
}

export interface ContactInfo {
    address?: string;
    phone?: string;
    email?: string;
}

/**
 * Get layout settings (Header & Footer)
 * Uses cache: no-store to ensure fresh data
 */
export const getLayoutSettings = async (): Promise<LayoutSettings | null> => {
    try {
        const { data, error } = await supabase
            .from('layout_settings')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('Error fetching layout settings:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Critical error fetching layout settings:', err);
        return null;
    }
};

/**
 * Update layout settings
 * Only accessible to authenticated users (admin)
 */
export const updateLayoutSettings = async (
    settings: Partial<Omit<LayoutSettings, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; data?: LayoutSettings; error?: string }> => {
    try {
        const { data, error } = await supabase
            .from('layout_settings')
            .update(settings)
            .eq('id', 1)
            .select()
            .single();

        if (error) {
            console.error('Error updating layout settings:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Critical error updating layout settings:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        };
    }
};

/**
 * Get default layout settings (fallback)
 */
export const getDefaultLayoutSettings = (): Partial<LayoutSettings> => ({
    header_logo_alt: 'Digma Logo',
    header_menu: [
        { label: 'Hizmetler', href: '/hizmetler', enabled: true, order: 1, isExternal: false },
        { label: 'Vaka Çalışmaları', href: '/vaka-calismalari', enabled: true, order: 2, isExternal: false },
        { label: 'Hakkımızda', href: '/hakkimizda', enabled: true, order: 3, isExternal: false },
        { label: 'Blog', href: '/blog', enabled: true, order: 4, isExternal: false },
        { label: 'İletişim', href: '/iletisim', enabled: true, order: 5, isExternal: false },
    ],
    header_cta_label: 'Ücretsiz Analiz Al',
    header_cta_href: '/#ucretsiz-analiz',
    header_cta_enabled: true,
    footer_columns: [
        {
            title: 'Hızlı Erişim',
            links: [
                { label: 'Hizmetlerimiz', href: '/hizmetler' },
                { label: 'Başarı Hikayeleri', href: '/vaka-calismalari' },
                { label: 'Hakkımızda', href: '/hakkimizda' },
                { label: 'Blog & Rehber', href: '/blog' },
            ],
        },
    ],
    footer_socials: [
        { platform: 'instagram', url: '#' },
        { platform: 'linkedin', url: '#' },
        { platform: 'twitter', url: '#' },
    ],
    footer_contact: {
        address: 'Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul',
        phone: '+90 (212) 555 00 00',
        email: 'merhaba@digma.com',
    },
    footer_copyright: 'Digma Dijital. Tüm hakları saklıdır.',
    footer_enabled: true,
});
