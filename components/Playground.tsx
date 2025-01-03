"use client"

import { useEffect } from "react"

import { useActiveAccount } from "thirdweb/react"

import Mint from "@/components/Mint"
import PixelGrid from "@/components/PixelGrid"
import PlayerStats from "@/components/PlayerStats"
import { useBalance } from "@/hooks/useBalance"
import { usePixels } from "@/hooks/usePixels"
import { usePixelTransaction } from "@/hooks/usePixelTransaction"
import { useUserStats } from "@/hooks/useUserStats"
import { createClient } from "@/lib/supabase/client"
import { PixelsProps } from "@/types/index"

export default function Playground({ initialPixels }: { initialPixels: PixelsProps[] }) {
  const account = useActiveAccount()
  const { formattedBalance, isLoading: isBalanceLoading } = useBalance()
  const { pixels, updatePixelColor } = usePixels(initialPixels)
  const { userStats, isLoading: isStatsLoading, error: statsError, refetch: refetchStats } = useUserStats()
  const handleConfirm = usePixelTransaction(updatePixelColor, refetchStats)


  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel('square_pixels_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'square_pixels' },
        (payload: { new: PixelsProps }) => {
          updatePixelColor(payload.new.id, payload.new.color)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [updatePixelColor])

  return (
    <>
      <h2 className="p-6 text-2xl font-secondary border-b">Playground</h2>
      <div className="px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {account ? (
          <>
            <Mint />
            <PixelGrid pixels={pixels} onConfirm={handleConfirm} />
            <PlayerStats 
              formattedBalance={formattedBalance}
              isBalanceLoading={isBalanceLoading}
              userPoints={userStats?.userPixelCount ?? 0}
              totalPixels={userStats?.totalPixelsColored ?? 0}
              isPointsLoading={isStatsLoading}
            />
          </>
        ) : (
          <div className="w-60 h-60 my-12 mx-auto border border-foreground hover:cursor-not-allowed bg-white" />
        )}
      </div>
    </>
  )
}