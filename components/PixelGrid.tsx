import { useEffect, useRef, useState } from 'react'

import ColorPicker from "@/components/ColorPicker"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { colors } from "@/lib/constant"
import { PixelGridProps } from "@/types/index"

// Configuration constants
const GRID_SIZE = 10
const PIXEL_SIZE = 30 // 10x10 grid = 400x400 canvas

export default function PixelGrid({ pixels, onConfirm }: PixelGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw the grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw pixels
    pixels.forEach((pixel, index) => {
      const x = (index % GRID_SIZE) * PIXEL_SIZE
      const y = Math.floor(index / GRID_SIZE) * PIXEL_SIZE
      ctx.fillStyle = pixel.color
      ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE)
    })

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb'
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * PIXEL_SIZE, 0)
      ctx.lineTo(i * PIXEL_SIZE, canvas.height)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, i * PIXEL_SIZE)
      ctx.lineTo(canvas.width, i * PIXEL_SIZE)
      ctx.stroke()
    }
  }, [pixels])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const col = Math.floor(x / PIXEL_SIZE)
    const row = Math.floor(y / PIXEL_SIZE)
    const index = row * GRID_SIZE + col
    
    setSelectedIndex(index)
  }

  const handleConfirm = async () => {
    if (selectedIndex !== -1 && selectedColor) {
      await onConfirm(selectedIndex, selectedColor)
      setSelectedIndex(-1)
      setSelectedColor(null)
    }
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * PIXEL_SIZE}
        height={GRID_SIZE * PIXEL_SIZE}
        onClick={handleCanvasClick}
        className="border border-foreground rounded-lg cursor-pointer bg-white"
      />

      <Drawer
        open={selectedIndex !== -1}
        onOpenChange={(open) => !open && setSelectedIndex(-1)}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm p-4">
            <ColorPicker
              colors={colors}
              selectedColor={selectedColor}
              onColorClick={setSelectedColor}
              onConfirm={handleConfirm}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}