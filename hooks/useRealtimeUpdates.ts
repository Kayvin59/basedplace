"use client"

import { useEffect } from 'react'

import { createClient } from "@/lib/supabase/client"
import { PixelsProps } from "@/types/index"

export function useRealtimeUpdates(updatePixelColor: (id: number, color: string) => void) {
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel('square_pixels_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'square_pixels' },
        (payload: { new: PixelsProps }) => {
          updatePixelColor(payload.new.id, payload.new.color)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [updatePixelColor])
}