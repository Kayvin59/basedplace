"use server"

import { createSupabaseServer } from '@/lib/supabase/server';
import { UserProfile } from '@/types';

export async function getPixels() {
    const supabase = await createSupabaseServer();
    const { data: pixels, error } = await supabase.from('square_pixels').select().order('id', { ascending: true });
  
    if (error) {
        console.error("Error fetching data from database", error);
    }
    return pixels;
}

export async function fetchUserProfile(address: string): Promise<UserProfile | null> {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from('users_profile')
      .select('*')
      .eq('address', address)
      .maybeSingle()
  
    if (error) {
      console.error('Failed to fetch user profile:', error)
      return null
    }
  
    // Create a new profile if it doesn't exist
    if (!data) {
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