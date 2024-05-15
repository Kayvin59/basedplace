"use client"

import ColorPicker from "@/components/ColorPicker";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { colors } from "@/lib/constant";
import { createClient } from "@/lib/supabase/client";
import { PixelsProps } from "@/types/index";
import { useEffect, useState } from "react";


const initialColor: string = "#FFFFFF";

export default function Playground({ pixels }: { pixels: PixelsProps[]}) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [squareColors, setSquareColors] = useState(pixels.map((pixel) => pixel.color))
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updatedPixels, setUpdatedPixels] = useState<PixelsProps[]>(pixels); 

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (index: number) => {
    setSelectedIndex(index);
    setOpenDrawer(true);
  };

  async function updateColor() {
    const supabase = createClient();
    const { error } = await supabase.from('square_pixels').update({ color: selectedColor }).eq('id', pixels[selectedIndex].id);
    if (error) {
      throw new Error(`Failed to update color in database, error message: ${error.message}`);
    } else {
      console.log("Color updated successfully");
      return true;
    }
  }
  
  const handleConfirm = async () => {
    // Update the color in the UI
    const newColors = [...squareColors];
    newColors[selectedIndex] = selectedColor;
    setSquareColors(newColors);

    // Update the color in the database
    await updateColor();

    // Update the color in the state
    const updatedPixelIndex = updatedPixels.findIndex((pixel) => pixel.id === pixels[selectedIndex].id);
    if (updatedPixelIndex !== -1) {
      const newUpdatedPixels = [...updatedPixels];
      newUpdatedPixels[updatedPixelIndex].color = selectedColor;
      setUpdatedPixels(newUpdatedPixels);
    }

    setOpenDrawer(false);
  };

  useEffect(() => {
    setSquareColors(updatedPixels.map((pixel) => pixel.color));
  }, [updatedPixels]);

  return (
    <div className="my-12 mx-auto w-40 h-40">
      <div className="grid grid-cols-10 grid-rows-10 gap-x-0 gap-y-0 border border-foreground">
        {squareColors.map((color, index) => (
          <Drawer key={index} open={openDrawer && selectedIndex === index} onOpenChange={setOpenDrawer}>
            <DrawerTrigger>
              <div
                className="w-4 h-4 cursor-pointer hover:border border-foreground"
                style={{ backgroundColor: color }}
                onClick={() => handleSquareClick(index)}
              ></div>
            </DrawerTrigger>
            <DrawerContent>
              {openDrawer && selectedIndex === index && (
                <ColorPicker colors={colors} onColorClick={handleColorClick} onConfirm={handleConfirm}/>
              )}
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  );
}

{/* <div className="w-2/3 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white"></div> */}
