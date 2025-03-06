"use client"

import { useCallback, useState } from 'react';

import { updateColor } from '@/lib/supabase';
import { PixelsProps, UpdatePixelColorFunction } from "@/types/index";

export function usePixels(initialPixels: PixelsProps[]) {
  const [pixels, setPixels] = useState<PixelsProps[]>(initialPixels)

  const updatePixelColor: UpdatePixelColorFunction = useCallback(async (index: number, color: string) => {
    try {
      const pixelId = pixels[index].id
      const success = await updateColor(pixelId, color)
      if (!success) {
        throw new Error("Failed to update color in database")
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