import { supabase } from '../lib/supabase';

export interface SocialLink {
    platform: string;
    url: string;
}

export interface CompanyInfo {
    id: string;
    company_name: string;
    phone: string | null;
    whatsapp: string | null;
    email: string | null;
    address: string | null;
    business_hours: string | null;
    logo_url: string | null;
    social_links: SocialLink[];
    created_at: string;
    updated_at: string;
}

/**
 * Get company information (singleton)
 */
export const getCompanyInfo = async (): Promise<CompanyInfo | null> => {
    try {
        const { data, error } = await supabase
            .from('company_info')
            .select('*')
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching company info:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Critical error fetching company info:', err);
        return null;
    }
};

/**
 * Update company information
 */
export const updateCompanyInfo = async (
    updates: Partial<Omit<CompanyInfo, 'id' | 'created_at' | 'updated_at'>>
): Promise<{ success: boolean; data?: CompanyInfo; error?: string }> => {
    try {
        // Get the existing row ID
        const { data: existing } = await supabase
            .from('company_info')
            .select('id')
            .limit(1)
            .single();

        if (!existing) {
            return { success: false, error: 'Company info not found' };
        }

        const { data, error } = await supabase
            .from('company_info')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', existing.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating company info:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Critical error updating company info:', err);
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Unknown error'
        };
    }
};

/**
 * Get default company information (fallback)
 */
export const getDefaultCompanyInfo = (): Partial<CompanyInfo> => {
    return {
        company_name: 'Digma Dijital',
        phone: '+90 (212) 555 00 00',
        whatsapp: '+90 555 123 45 67',
        email: 'merhaba@digma.com',
        address: 'Maslak Mah. Büyükdere Cad. No:123, Sarıyer / İstanbul',
        business_hours: 'Pazartesi - Cuma: 09:00 - 18:00',
        social_links: [
            { platform: 'instagram', url: 'https://instagram.com/digmadijital' },
            { platform: 'linkedin', url: 'https://linkedin.com/company/digma' },
            { platform: 'twitter', url: 'https://twitter.com/digmadijital' }
        ]
    };
};
