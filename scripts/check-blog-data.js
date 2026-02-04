
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('Fetching posts...');
    const { data, error } = await supabase
        .from('posts')
        .select('title, slug, cover_image');

    if (error) {
        console.error('Error fetching posts:', error);
        return;
    }

    console.log('Posts found:', data.length);
    data.forEach(post => {
        console.log(`- Title: ${post.title}`);
        console.log(`  Slug: ${post.slug}`);
        console.log(`  Cover: ${post.cover_image ? post.cover_image : '[NULL/EMPTY]'}`);
        console.log('---');
    });
}

checkData();
