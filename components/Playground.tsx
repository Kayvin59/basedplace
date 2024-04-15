"use client"

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

/* const colors = [
  "crimson",
  "orange",
  "amber",
  "yellow",
  "green",
  "light_green",
  "deep_aqua",
  "sky_blue",
  "indigo",
  "cerulean",
  "egg_blue",
  "purple",
  "electric_purple",
  "magenta",
  "lavender",
  "hot_pink",
  "pink",
  "brown",
  "saddle_brown",
  "black",
  "silver",
  "light_gray",
  "white",
]; */

export default function Playground() {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`w-5 h-5 m-1 cursor-pointer bg-${color}`}
            style={{ 
              backgroundColor: color,
            }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      <div
      className={`mt-5 bg-ri w-24 h-24 border border-black bg-${selectedColor}`}
        style={{
          backgroundColor: selectedColor,
        }}
      ></div>
      
    </div>
  );
}
