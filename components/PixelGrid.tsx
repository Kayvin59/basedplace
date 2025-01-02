import { useState } from 'react'

import ColorPicker from "@/components/ColorPicker"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { colors } from "@/lib/constant"
import { PixelsProps } from "@/types/index"

interface PixelGridProps {
  pixels: PixelsProps[];
  onConfirm: (index: number, color: string) => Promise<void>;
}

export default function PixelGrid({ pixels, onConfirm }: PixelGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [openDrawers, setOpenDrawers] = useState<Record<number, boolean>>({})

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
  }

  const handleConfirm = async () => {
    if (selectedIndex !== null && selectedColor) {
      await onConfirm(selectedIndex, selectedColor)
      setOpenDrawers(prev => ({ ...prev, [selectedIndex]: false }))
      setSelectedColor(null)
    }
  }

  const openDrawerForPixel = (index: number) => {
    setSelectedIndex(index)
    setOpenDrawers(prev => ({ ...prev, [index]: true }))
  }

  return (
    <div className="w-40 h-40">
      <div className="grid grid-cols-10 grid-rows-10 gap-x-0 gap-y-0 border border-foreground">
        {pixels.map((pixel, index) => (
          <Drawer
            key={`${pixel.id}-${index}`}
            open={openDrawers[index]}
            onOpenChange={(open) => setOpenDrawers(prev => ({ ...prev, [index]: open }))}
          >
            <DrawerTrigger asChild>
              <div
                className="w-4 h-4 cursor-pointer hover:border border-foreground transition-colors duration-200"
                style={{ backgroundColor: pixel.color }}
                onClick={() => openDrawerForPixel(index)}
              />
            </DrawerTrigger>
            <DrawerContent>
              <ColorPicker
                colors={colors}
                onColorClick={handleColorClick}
                onConfirm={handleConfirm}
                selectedColor={selectedColor}
              />
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  )
}