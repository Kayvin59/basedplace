"use client"

import ColorPicker from "@/components/ColorPicker";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { colors } from "@/lib/constant";
import { createClient } from "@/lib/supabase/client";
// import { updateColor as updateColorDb } from '@/lib/supabase/index';
import { baseTestnet } from "@/app/chains";
import { client } from "@/app/client";
import Mint from "@/components/Mint";
import { PixelsProps } from "@/types/index";
import { useEffect, useState } from "react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";


const initialColor: string = "#FFFFFF";

export default function Playground({ pixels }: { pixels: PixelsProps[]}) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [squareColors, setSquareColors] = useState(pixels.map((pixel) => pixel.color))
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updatedPixels, setUpdatedPixels] = useState<PixelsProps[]>(pixels);
  const [balance, setBalance] = useState<string>('0');
  const [dbError, setDbError] = useState<string | null>(null);

  const account = useActiveAccount()
  const { data, isLoading, isError } = useWalletBalance({
    chain: baseTestnet,
    address: account?.address,
    client: client,
    tokenAddress: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
  })

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (index: number) => {
    setSelectedIndex(index);
    setOpenDrawer(true);
  };

  async function updateColor(pixelsId: number, newColor: string) {
    const supabase = createClient();
    const { error } = await supabase.from('square_pixels').update({ color: newColor }).eq('id', pixelsId);
    if (error) {
      console.error(`Failed to update color in database, error message: ${error.message}`);
      return false;
    } else {
      console.log("Color updated successfully");
      return true;
    }
  }

  const handleConfirm = async () => {
    // Update the color in the UI
    const newColors = [...squareColors];
    newColors[selectedIndex] = selectedColor;
    
    // Update the color in the database
    const isUpdated = await updateColor(pixels[selectedIndex].id, selectedColor);

    if (isUpdated) {
      setSquareColors(newColors);

      // Update the color in the state
      const updatedPixelIndex = updatedPixels.findIndex((pixel) => pixel.id === pixels[selectedIndex].id);
      if (updatedPixelIndex !== -1) {
        const newUpdatedPixels = [...updatedPixels];
        newUpdatedPixels[updatedPixelIndex].color = selectedColor;
        setUpdatedPixels(newUpdatedPixels);
      }

      // realtime update
      const client = createClient();
      const realtimeRoom = client.channel('realtime');
  
      realtimeRoom.subscribe((status) => {
        // Wait for successful connection
        if (status !== 'SUBSCRIBED') {
          return null
        }
  
        // Send a message once the client is subscribed
        realtimeRoom.send({
          type: 'broadcast',
          event: 'test',
          payload: { message: 'hello, world' },
        })
      })
  
      setOpenDrawer(false);
      setDbError("")
    } else {
      setDbError("Failed to update color in database. Please try again.")
    }


  };

  useEffect(() => {
    if (data) {
      setBalance(data.displayValue);
    }
  }, [data]);

  useEffect(() => {
    setSquareColors(updatedPixels.map((pixel) => pixel.color));
  }, [updatedPixels]);

  return (
    <>
      <h2 className='p-6 text-2xl font-secondary border-b'>Playground</h2>
      <div className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {account && (
          <>
            <Mint />
            <div className="w-40 h-40">
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
                        <>
                          <ColorPicker colors={colors} onColorClick={handleColorClick} onConfirm={handleConfirm} dberrorMsg={dbError}/>
                          <p className="text-red-600 mt-2"></p>
                        </>
                      )}
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </div>        
            <div className="flex-1 self-center md:self-start text-right">
                <span>Balance : {balance} $BP</span>
            </div>
          </>
        )}
        {!account && (
          <div className="w-60 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white"></div>
        )}
      </div>
    </>
  );
}
