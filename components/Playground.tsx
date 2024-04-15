"use client"

import ColorPicker from "@/components/ColorPicker";
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
  const [squareColors, setSquareColors] = useState(Array(25).fill(initialColor));

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (index: number) => {
    console.log(index);
    const newColors = [...squareColors];
    newColors[index] = selectedColor;
    console.log(newColors);
    setSquareColors(newColors);
  };

  return (
    <div>
      <ColorPicker colors={colors} onColorClick={handleColorClick} />
      <div className={`mt-5 bg-gray-200 w-20 h-20 border border-black}`}>
        <div className="grid grid-cols-5 grid-rows-5 gap-x-0 gap-y-0">
        {squareColors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => handleSquareClick(index)}
            ></div>
          ))}
        </div>
      </div>      
    </div>
  );
}
