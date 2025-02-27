import { createClient } from "@supabase/supabase-js"

import { PixelsProps } from "@/types"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function initializeRealtimeSubscription(onUpdate: (payload: PixelsProps) => void) {
    const channel = supabase.channel('square_pixels_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'square_pixels' },
        (payload) => {
          onUpdate(payload.new as PixelsProps)
        }
      )
      .subscribe()
  
    return () => {
      supabase.removeChannel(channel)
    }
}