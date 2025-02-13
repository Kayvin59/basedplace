import { Coins, PaintBucket, Trophy } from 'lucide-react';

import { Skeleton } from "@/components/ui/skeleton";
import { PlayerStatsProps } from "@/types/index";

export default function PlayerStats({ 
  formattedBalance, 
  isBalanceLoading, 
  userPoints, 
  isPointsLoading, 
  totalPixels 
}: PlayerStatsProps) {
  return (
    <div className="flex flex-1 self-center lg:self-start min-h-300">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Player Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Coins className="mr-2 text-yellow" />
            {isBalanceLoading ? (
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
            <PaintBucket className="mr-2 text-light_green" />
            <span>Total Plays: {totalPixels}</span>
          </div>
        </div>
      </div>
    </div>
  )
}