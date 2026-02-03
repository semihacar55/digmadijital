
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Provide specific error message if missing, but don't crash the app
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing! Please create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// Use fallbacks to prevent crash during development/setup
// This allows the app to render, although Supabase calls will fail
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
