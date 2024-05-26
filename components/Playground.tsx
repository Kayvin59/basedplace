"use client"

import ColorPicker from "@/components/ColorPicker";
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { colors } from "@/lib/constant";
import { createClient } from "@/lib/supabase/client";
import { updateColor as updateColorDb } from '@/lib/supabase/index';
import { PixelsProps } from "@/types/index";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { abi } from "../app/abi";


const initialColor: string = "#FFFFFF";

export default function Playground({ pixels }: { pixels: PixelsProps[]}) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [squareColors, setSquareColors] = useState(pixels.map((pixel) => pixel.color))
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updatedPixels, setUpdatedPixels] = useState<PixelsProps[]>(pixels);
  const [isMinting, setIsMinting] = useState<'init' | 'pending' | 'complete' | 'error'>('init');
  const [balance, setBalance] = useState<bigint | undefined>('0' as unknown as bigint);
  const [dbError, setDbError] = useState<string | null>(null);
  
  const { address, isConnected } = useAccount()

  const { writeContractAsync, isPending } = useWriteContract()

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  const handleSquareClick = (index: number) => {
    setSelectedIndex(index);
    setOpenDrawer(true);
  };

  const handleConfirm = async () => {
    // Update the color in the UI
    const newColors = [...squareColors];
    newColors[selectedIndex] = selectedColor;
    
    // Update the color in the database
    const isUpdated = await updateColorDb(pixels[selectedIndex].id, selectedColor);

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

  const handleMint = async () => {
    if(address === undefined) {
        console.error("Please connect your wallet to mint.");
        return;
    }

    setIsMinting('pending')

    try {
        await writeContractAsync({
            address: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
            abi,
            functionName: 'mint',
        },
        {
            onSuccess: () => {
                console.log("Transaction Complete: ");
                setIsMinting('complete')
            },
            onError: (error) => {
                console.error("Error minting: ", error);
                setIsMinting('error')
            }
        })
    } catch (e) {
        console.error("Error minting BP token", e);
        setIsMinting('error')
    }
  };

  const result = useBalance({
    address: address,
    token: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
  })

  useEffect(() => {
    if (result.data) {
      setBalance(result.data.value);
    }
  }, [result.data]);

  useEffect(() => {
    setSquareColors(updatedPixels.map((pixel) => pixel.color));
  }, [updatedPixels]);

  return (
    <div className="px-6 py-12 flex items-center justify-between gap-6">
      <div className="flex-1 self-start">
        <p>To start playing you need some tokens</p>
        <p>You can mint 5 $BP tokens every 24H</p>
        <Button className="mt-4 mb-2" onClick={handleMint}>Mint</Button>
        {isMinting === 'init' && (
          <p>Click to start minting</p>
        )}
        {isMinting === 'pending' && (
          <p className="text-yellow-500">Minting in progress...</p>
        )}
        {isMinting === 'complete' && (
          <p className="text-green-500">Minting complete</p>
        )}
        {isMinting === 'error' && (
          <p className="text-red-500">Failed to mint tokens. Minting is allowed every 24H</p>
        )}
        {isMinting && (
          <p className="text-green">Minting complete</p>
        )}
      </div>
      {isConnected && (
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
      )}
      {!isConnected && (
        <div className="w-2/3 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white"></div>
      )}
      <div className="flex-1 self-start text-right">
        <p>Balance :</p>
        <p>{balance !== undefined ? formatUnits(balance, 18) : "Loading..."}</p>
      </div>
    </div>
  );
}
