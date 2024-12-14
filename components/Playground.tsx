"use client"

import {
  useCallback,
  useEffect,
  useState,
  useTransition
} from "react"

import { Coins, PaintBucket, Trophy } from 'lucide-react'
import { prepareContractCall, sendTransaction, toWei } from 'thirdweb'
import { useActiveAccount } from "thirdweb/react"

import { BP_TOKEN_ADDRESS } from "@/app/contracts"
import ColorPicker from "@/components/ColorPicker"
import Mint from "@/components/Mint"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useBalance } from "@/hooks/useBalance"
import { useUserPoints } from "@/hooks/useUserPoints"
import { colors } from "@/lib/constant"
import { createClient } from "@/lib/supabase/client"
import { PixelsProps } from "@/types/index"


const BP_TOKEN_ADDRESS_WITH_PREFIX = BP_TOKEN_ADDRESS.address as `0x${string}`

export default function Playground({ pixels: initialPixels }: { pixels: PixelsProps[] }) {
  const [pixels, setPixels] = useState<PixelsProps[]>(initialPixels)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isPending, startTransition] = useTransition()
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const account = useActiveAccount()
  const { formattedBalance, isLoading } = useBalance()
  const { userPoints, isLoading: isPointsLoading, error: pointsError, refetch: refetchPoints } = useUserPoints()
  const { toast } = useToast()

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
  }

  const handleConfirm = async () => {
    if (!account || !selectedColor) {
      console.error("Please connect your wallet and select a color.")
      toast({
        title: "Error",
        description: "Please connect your wallet and select a color.",
        variant: "destructive",
      })
      return
    }

    try {
      const amount = toWei("1")
      
      // Approve
      const approveTx = prepareContractCall({
        method: "function approve(address spender, uint256 amount) returns (bool)",
        params: [account.address, amount],
        contract: BP_TOKEN_ADDRESS,
      })

      console.log("Approving transaction...")
      const approveResult = await sendTransaction({ transaction: approveTx, account })
      
      if (!approveResult) {
        throw new Error("Approval transaction failed")
      }

      console.log("Approval successful, proceeding with transfer...")

      // Transfer
      const transferTx = prepareContractCall({
        contract: BP_TOKEN_ADDRESS,
        method: "function transferFrom(address from, address to, uint256 amount) returns (bool)",
        params: [account.address, BP_TOKEN_ADDRESS_WITH_PREFIX, amount],
      })

      console.log("Initiating transfer...")
      const transferResult = await sendTransaction({ transaction: transferTx, account })

      if (!transferResult) {
        throw new Error("Transfer transaction failed")
      }

      console.log("Transfer successful, updating pixel color...")
      await updatePixelColor(selectedIndex, selectedColor)
      setSelectedColor(null)
      toast({
        title: "Success",
        description: "Pixel color updated successfully!",
      })
      refetchPoints()
    } catch (error) {
      console.error("Error in transaction process: ", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const updatePixelColor = async (index: number, color: string) => {
    startTransition(async () => {
      try {
        const supabase = createClient()
        const { error } = await supabase
          .from('square_pixels')
          .update({ color })
          .eq('id', pixels[index].id)

        if (error) {
          throw new Error(`Failed to update color in database: ${error.message}`)
        }

        setPixels(prevPixels => 
          prevPixels.map((pixel, i) => 
            i === index ? { ...pixel, color } : pixel
          )
        )
        console.log("Color updated successfully")
      } catch (error) {
        console.error("Error updating pixel color: ", error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to update pixel color",
          variant: "destructive",
        })
      }
    })
  }

  const handleRealtimeUpdate = useCallback((payload: { new: PixelsProps }) => {
    setPixels(prevPixels => 
      prevPixels.map(pixel => 
        pixel.id === payload.new.id ? { ...pixel, ...payload.new } : pixel
      )
    )
  }, [])

  // Set up real-time listener
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel('square_pixels_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'square_pixels' },
        handleRealtimeUpdate
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [handleRealtimeUpdate])

  return (
    <>
      <h2 className="p-6 text-2xl font-secondary border-b">Playground</h2>
      <div className="px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {account ? (
          <>
            <Mint />
            <div className="w-40 h-40">
              <div className="grid grid-cols-10 grid-rows-10 gap-x-0 gap-y-0 border border-foreground">
                {pixels.map((pixel, index) => (
                  <Drawer key={`${pixel.id}-${index}`}>
                    <DrawerTrigger asChild>
                      <div
                        className="w-4 h-4 cursor-pointer hover:border border-foreground transition-colors duration-200"
                        style={{ backgroundColor: pixel.color }}
                        onClick={() => setSelectedIndex(index)}
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
            <div className="flex-1 self-center md:self-start">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Player Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Coins className="mr-2 text-yellow" />
                    {isLoading ? (
                        <Skeleton className="h-7 w-20" />
                    ) : (
                        <span>{formattedBalance ?? '0'} $BP</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="mr-2 text-blue-500" />
                    <span>Points: 
                      {isPointsLoading ? (
                        <Skeleton className="h-4 w-5 ml-1" />
                      ) : (
                        <span className="ml-1">{userPoints}</span>
                        
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <PaintBucket className="mr-2 text-green" />
                    <span>Total Pixels: 100</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-60 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white" />
        )}
      </div>
    </>
  )
}