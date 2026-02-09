
import { supabase } from '@/lib/supabase';
import { getCompanyInfo } from './company.service';

export interface FormSubmissionData {
    form_type: 'contact' | 'newsletter' | 'offer' | 'analysis' | string;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    honeypot?: string; // Spam protection field
    metadata?: Record<string, unknown>;
}

export interface FormSubmissionResult {
    success: boolean;
    error?: string;
    detail?: {
        submission_id?: string;
        email_status?: 'sent' | 'failed' | 'not_configured';
        spam_detected?: boolean;
    };
}

/**
 * Validate honeypot field for spam protection
 */
const validateHoneypot = (honeypot?: string): boolean => {
    // If honeypot field is filled, it's likely a bot
    return !honeypot || honeypot.trim() === '';
};

/**
 * Submit form with spam protection and email notifications
 */
export const submitForm = async (data: FormSubmissionData): Promise<FormSubmissionResult> => {
    try {
        // 1. Honeypot spam check
        if (!validateHoneypot(data.honeypot)) {
            console.warn('SPAM_DETECTED: Honeypot filled');
            // Silently reject spam - don't reveal the honeypot mechanism
            return {
                success: true, // Fake success to fool bots
                detail: { spam_detected: true }
            };
        }

        // 2. Remove honeypot from submitted data
        const { honeypot, ...cleanData } = data;

        // 3. Get admin email for notifications
        const companyInfo = await getCompanyInfo();
        const adminEmail = companyInfo?.email || 'admin@digma.com';

        console.log('SUBMIT_START', { ...cleanData, adminEmail });

        // 4. Try to invoke Edge Function for form submission + email
        try {
            const { functions } = supabase;
            const { data: result, error } = await functions.invoke('submit-form', {
                body: {
                    ...cleanData,
                    admin_email: adminEmail
                }
            });

            if (error) {
                console.error('EDGE_FUNCTION_ERROR:', error);
                // Fall back to direct DB insert
                return await fallbackDatabaseInsert(cleanData);
            }

            if (!result.success) {
                console.error('SUBMIT_FAIL (Logic):', result.error);
                return {
                    success: false,
                    error: result.error || 'Form gönderilirken bir hata oluştu.'
                };
            }

            console.log('SUBMIT_OK', result);
            return {
                success: true,
                detail: {
                    submission_id: result.detail?.submission_id,
                    email_status: result.detail?.email_status || 'not_configured'
                }
            };

        } catch (functionError) {
            console.error('EDGE_FUNCTION_CRITICAL:', functionError);
            // Fall back to direct DB insert
            return await fallbackDatabaseInsert(cleanData);
        }

    } catch (error) {
        console.error('SUBMIT_CRITICAL_FAIL:', error);
        return {
            success: false,
            error: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.'
        };
    }
};

/**
 * Fallback: Direct database insert when Edge Function is unavailable
 */
const fallbackDatabaseInsert = async (data: Omit<FormSubmissionData, 'honeypot'>): Promise<FormSubmissionResult> => {
    try {
        const { data: submission, error } = await supabase
            .from('form_submissions')
            .insert({
                form_type: data.form_type,
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                metadata: data.metadata,
                status: 'new',
                created_at: new Date().toISOString()
            })
            .select('id')
            .single();

        if (error) {
            console.error('DB_INSERT_ERROR:', error);
            return {
                success: false,
                error: 'Form kaydedilemedi. Lütfen tekrar deneyin.'
            };
        }

        console.log('DB_INSERT_OK (no email)', submission);
        return {
            success: true,
            detail: {
                submission_id: submission.id,
                email_status: 'not_configured'
            }
        };

    } catch (error) {
        console.error('FALLBACK_CRITICAL:', error);
        return {
            success: false,
            error: 'Veritabanı hatası. Lütfen daha sonra tekrar deneyin.'
        };
    }
};
