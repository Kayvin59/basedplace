"use client"

import ColorPicker from "@/components/ColorPicker";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";

const colors = [
  "#be0039",
  "#ff4500",
  "#ffa800",
  "#ffd635",
  "#00a368",
  "#7eed56",
  "#00756f",
  "#009eaa",
  "#2450a4",
  "#3690ea",
  "#51e9f4",
  "#493ac1",
  "#6a5cff",
  "#811e9f",
  "#b44ac0",
  "#ff3881",
  "#ff99aa",
  "#6d482f",
  "#9c6926",
  "#000000",
  "#898d90",
  "#d4d7d9",
  "#ffffff",
];

const initialColor = "#FFFFFF";

export default function Playground() {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [squareColors, setSquareColors] = useState(Array(100).fill(initialColor));
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (index: number) => {
    setSelectedIndex(index);
    setOpenDrawer(true);
  };
  
  const handleConfirm = () => {
    const newColors = [...squareColors];
    newColors[selectedIndex] = selectedColor;
    setSquareColors(newColors);
    setOpenDrawer(false);
  };

  return (
    <div>
      <div className={`mt-5 mx-auto bg-gray-200 w-40 h-40`}>
        <div className="grid grid-cols-10 grid-rows-10 gap-x-0 gap-y-0">
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
    </div>
  );
}
