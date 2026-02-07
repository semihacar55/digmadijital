-- Add email tracking columns to form_submissions table
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS email_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS email_error TEXT;

-- Create index for email status
CREATE INDEX IF NOT EXISTS idx_form_submissions_email_status ON public.form_submissions(email_status);
