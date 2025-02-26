import { createClient } from '@/lib/supabase/server';
import { UserProfile } from '@/types';

export async function getPixels() {
  const supabase = createClient();
  const { data: pixels, error } = await supabase.from('square_pixels').select().order('id', { ascending: true });

  if (error) {
      console.error("Error fetching data from database", error);
  }
  return pixels;
}

export async function updateColor(pixelsId: number, newColor: string) {
  const supabase = createClient();
  const { error } = await supabase.from('square_pixels').update({ color: newColor }).eq('id', pixelsId);
  if (error) {
    console.error(`Failed to update color in database, error message: ${error.message}`);
    return false;
  } else {
    console.log("Color updated successfully");
    return true;
  }
}

export async function fetchUserProfile(address: string): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data, error } = await supabase
      .from('users_profile')
      .select('*')
      .eq('address', address)
      .maybeSingle()

  if (error) {
      console.error('Failed to fetch user profile:', error)
      return null
  }

  console.log('User profile fetched:', data)
  return data
}
