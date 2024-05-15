import { createClient } from '@/lib/supabase/server';

export async function getPixels() {
    const supabase = createClient();
    const { data: pixels, error } = await supabase.from('square_pixels').select().order('id', { ascending: true });

    if (error) {
        console.error("Error fetching data from database", error);
    }
    return pixels;
}
