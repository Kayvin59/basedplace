import { createClient } from "@/lib/supabase/client"
import { UserProfile } from "@/types/index"

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