"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DrawerClose } from "@/components/ui/drawer"

interface ColorPickerProps {
  colors: string[]
  onColorClick: (color: string) => void
  onConfirm: () => void
  selectedColor: string | null
}

export default function ColorPicker({ colors, onColorClick, onConfirm, selectedColor }: ColorPickerProps) {
  const [localSelectedColor, setLocalSelectedColor] = useState<string | null>(selectedColor)

  useEffect(() => {
    setLocalSelectedColor(selectedColor)
  }, [selectedColor])

  const handleColorClick = (color: string) => {
    setLocalSelectedColor(color)
    onColorClick(color)
  }

  const handleConfirm = () => {
    if (localSelectedColor === null) {
      console.error("Please select a color")
      return
    }
    onConfirm()
  }
  
  return (
    <div className="flex flex-col items-center w-full max-w-sm my-8 mx-auto px-6">
      <h3 className="mb-6 font-bold">Pick your color</h3>
      <div className="flex flex-wrap mb-6 w-full">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 m-1 cursor-pointer rounded-full hover:scale-110 transition-transform ${
              localSelectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
            }`}
            style={{ 
              backgroundColor: color,
            }}
            onClick={() => handleColorClick(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      <div className="w-full mt-auto flex flex-col gap-2 px-4">
        <Button onClick={handleConfirm} disabled={!localSelectedColor}>Confirm</Button>
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      </div>
    </div>
  )
}