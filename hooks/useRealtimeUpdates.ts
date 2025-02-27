"use client"

import { useEffect } from 'react'

import { initializeRealtimeSubscription } from "@/lib/supabase/realtime"
import { PixelsProps } from "@/types/index"

export function useRealtimeUpdates(updatePixelColor: (id: number, color: string) => void) {
  useEffect(() => {
    const cleanup = initializeRealtimeSubscription((payload: PixelsProps) => {
      updatePixelColor(payload.id, payload.color)
    })

    return cleanup
  }, [updatePixelColor])
}