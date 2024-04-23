"use client"

import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  onColorClick: (color: string) => void;
  onConfirm: () => void;
}

export default function ColorPicker({ colors, onColorClick, onConfirm }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
    onColorClick(color)
    setShowError(false)
  }

  const handleConfirm = () => {
    if (selectedColor === null) {
      setShowError(true);
      return;
    }
    onConfirm()
    setSelectedColor(null)
  }
  
  return (
        <div className="flex flex-col items-center w-full max-w-sm my-8 mx-auto px-6">
          <h3 className="mb-6 font-bold">Pick your color</h3>
          <div className="flex flex-wrap mb-6 w-full">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-5 h-5 m-1 cursor-pointer rounded-full last:border hover:rounded-none border-foreground ${selectedColor === color ? 'border-2 border-green-500 rounded-none' : ''}`}
                style={{ 
                  backgroundColor: color,
                }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
          <div className="w-full mt-auto flex flex-col gap-2 px-4">
            {showError && <p className="text-red-500">Please select a color</p>}
            <Button onClick={handleConfirm}>Confirm</Button>
            <DrawerClose asChild>
                <Button variant="outline">Close</Button>
            </DrawerClose>
          </div>
        </div>
    );
}