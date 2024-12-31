import { useCallback, useState } from 'react'

import { createClient } from "@/lib/supabase/client"
import { PixelsProps, UpdatePixelColorFunction } from "@/types/index"

export function usePixels(initialPixels: PixelsProps[]) {
  const [pixels, setPixels] = useState<PixelsProps[]>(initialPixels)

  const updatePixelColor: UpdatePixelColorFunction = useCallback(async (index: number, color: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('square_pixels')
        .update({ color })
        .eq('id', pixels[index].id)

      if (error) {
        throw new Error(`Failed to update color in database: ${error.message}`)
      }

      setPixels(prevPixels => 
        prevPixels.map((pixel, i) => 
          i === index ? { ...pixel, color } : pixel
        )
      )
      console.log("Color updated successfully")
    } catch (error) {
      console.error("Error updating pixel color: ", error)
    }
  }, [pixels])

  return { pixels, updatePixelColor }
}