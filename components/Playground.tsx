"use client"

import {
  useCallback,
  useEffect,
  useState,
  useTransition
} from "react"

import { prepareContractCall, sendTransaction, toWei } from 'thirdweb'
import { useActiveAccount, useWalletBalance } from "thirdweb/react"

import { baseTestnet } from "@/app/chains"
import { client } from "@/app/client"
import { BP_TOKEN_ADDRESS } from "@/app/contracts"
import ColorPicker from "@/components/ColorPicker"
import Mint from "@/components/Mint"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
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
  const { data: balanceData } = useWalletBalance({
    chain: baseTestnet,
    address: account?.address,
    client: client,
    tokenAddress: '0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B',
  })

  const handleColorClick = (color: string) => {
    setSelectedColor(color)
  }

  const handleConfirm = async () => {
    if (!account || !selectedColor) {
      console.error("Please connect your wallet and select a color.")
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
    } catch (error) {
      console.error("Error in transaction process: ", error)
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
                  <Drawer key={pixel.id}>
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
            <div className="flex-1 self-center md:self-start text-right">
              <span>Balance: {balanceData?.displayValue ?? '0'} $BP</span>
            </div>
          </>
        ) : (
          <div className="w-60 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white" />
        )}
      </div>
    </>
  )
}