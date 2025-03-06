import { createSupabaseClient } from '@/lib/supabase/client';
import { UserProfile } from '@/types';


export async function updateColor(pixelsId: number, newColor: string) {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from('square_pixels').update({ color: newColor }).eq('id', pixelsId);
  
  if (error) {
    console.error(`Failed to update color in database, error message: ${error.message}`);
    return false;
  }

  console.log("updateColor: Color updated successfully");
  return true;
}

export async function fetchUserProfile(address: string): Promise<UserProfile | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from('users_profile')
    .select('*')
    .eq('address', address)
    .maybeSingle()

  if (error) {
    console.error('Failed to fetch user profile:', error)
    return null
  }

  if (!data) {
    // Create a new profile if it doesn't exist
    const { data: newProfile, error: createError } = await supabase
      .from('users_profile')
      .insert({ address })
      .select()
      .single()

    if (createError) {
      console.error('Failed to create user profile:', createError)
      return null
    }
    console.log('Created new user profile:', newProfile)
    return newProfile
  }
  console.log('Fetched user profile:', data)
  return data
}
