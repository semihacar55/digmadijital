
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
        console.log('SUBMIT_START', data);
        const { functions } = supabase;

        // Invoke server-side Edge Function
        const { data: result, error } = await functions.invoke('submit-form', {
            body: data
        });

        if (error) {
            console.error('SUBMIT_FAIL (Network/Function):', error);
            throw error;
        }

        if (!result.success) {
            console.error('SUBMIT_FAIL (Logic):', result.error);
            return { success: false, error: result.error || 'Server error' };
        }

        console.log('SUBMIT_OK', result);
        return {
            success: true,
            detail: result.detail // Pass detail (email_status, etc) to UI
        };

    } catch (error) {
        console.error('SUBMIT_CRITICAL_FAIL:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
};
