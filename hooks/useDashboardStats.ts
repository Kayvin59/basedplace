"use client"

import { useQuery } from "@tanstack/react-query";

import { BASE_SEPOLIA_API } from "@/app/constants";
import { BP_TOKEN_ADDRESS } from "@/app/contracts";
import { ApiResponse, Transaction, UserStats } from "@/types/index";


function processTransactions(transactions: Transaction[]): UserStats[] {
  const userStatsMap = new Map<string, number>();

  transactions.forEach((tx) => {
    if (tx.method === "transferFrom" && tx.to.hash.toLowerCase() === BP_TOKEN_ADDRESS.address.toLowerCase()) {
      const userAddress = tx.from.hash.toLowerCase();
      userStatsMap.set(userAddress, (userStatsMap.get(userAddress) || 0) + 1);
    }
  });

  return Array.from(userStatsMap, ([address, points]) => ({ address, points }))
    .sort((a, b) => b.points - a.points);
}

export function useDashboardStats() {
  const fetchDashboardStats = async () => {
    const response = await fetch(
      `${BASE_SEPOLIA_API}/tokens/${BP_TOKEN_ADDRESS.address}/transfers`
    );
    const data: ApiResponse = await response.json();

    if (!data.items) {
      throw new Error("Failed to fetch dashboard stats");
    }

    const userStats = processTransactions(data.items);
    const totalPoints = userStats.reduce((sum, user) => sum + user.points, 0);

    return {
      userStats,
      totalPoints,
    };
  };

  const { data: dashboardStats, isLoading, error, refetch } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  return { dashboardStats, isLoading, error, refetch };
}