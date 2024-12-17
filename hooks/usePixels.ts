import { useCallback, useState } from 'react'

import { useToast } from '@/hooks/use-toast'
import { createClient } from "@/lib/supabase/client"
import { PixelsProps, UpdatePixelColorFunction } from "@/types/index"

export function usePixels(initialPixels: PixelsProps[]) {
  const [pixels, setPixels] = useState<PixelsProps[]>(initialPixels)

  const { toast } = useToast()

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
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update pixel color",
        variant: "destructive",
      })
    }
  }, [pixels, toast])

  return { pixels, updatePixelColor }
}