
import { supabase } from '@/lib/supabase';

export interface FormSubmissionData {
    form_type: 'contact' | 'offer' | 'analysis' | string;
    name: string;
    email?: string;
    phone?: string;
    message?: string;
    metadata?: Record<string, unknown>;
}

export const submitForm = async (data: FormSubmissionData) => {
    try {
        // Simple honeypot check (handled in UI usually, but good to have)
        // Rate limiting is best done on Edge Functions, but for now client insert is enabled

        const { error } = await supabase
            .from('form_submissions')
            .insert([{
                ...data,
                status: 'new',
                created_at: new Date().toISOString()
            }]);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Form submission error:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
};
