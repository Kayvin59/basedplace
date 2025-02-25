import { useQuery } from "@tanstack/react-query";
import { useAccount } from 'wagmi';

import { BASE_SEPOLIA_API } from "@/app/constants";
import { BP_TOKEN_ADDRESS } from "@/app/contracts";
import { ApiResponse, Transaction } from "@/types/index";


function countUserPixelInteractions(transactions: Transaction[], accountAddress: string = ''): number {
    return transactions.filter(
      (tx) => 
        tx.method === "transferFrom" && 
        tx.from.hash.toLowerCase() === accountAddress.toLowerCase() &&
        tx.to.hash.toLowerCase() === BP_TOKEN_ADDRESS.address.toLowerCase()
    ).length;
}
  
function countTotalPixelInteractions(transactions: Transaction[]): number {
    return transactions.filter(
        (tx) => 
        tx.method === "transferFrom" &&
        tx.to.hash.toLowerCase() === BP_TOKEN_ADDRESS.address.toLowerCase()
    ).length;
}

export function useUserStats() {
  const account = useAccount()
  const { address } = useAccount();

  const fetchUserStats = async () => {
    if (!account) return null

    const userResponse = await fetch(
      `${BASE_SEPOLIA_API}/addresses/${address}/transactions?filter=to:${BP_TOKEN_ADDRESS}`
    )
    const userData: ApiResponse = await userResponse.json()

    const totalResponse = await fetch(
        `${BASE_SEPOLIA_API}/tokens/${BP_TOKEN_ADDRESS.address}/transfers`
      );
    const totalData: ApiResponse = await totalResponse.json();

    if (!userData.items || !totalData.items) {
      throw new Error("Failed to fetch User stats")
    }

    const userPixelCount = countUserPixelInteractions(userData.items, address)
    const totalPixelsColored = countTotalPixelInteractions(totalData.items)

    return {
      userPixelCount,
      totalPixelsColored,
    }
  }

  const { data: userStats, isLoading, error, refetch } = useQuery({
    queryKey: ["userStats", account?.address],
    queryFn: fetchUserStats,
    enabled: !!account,
  })

  return { userStats, isLoading, error, refetch }
}