"use client";

import { useQuery } from "@tanstack/react-query";
import { prepareEvent } from "thirdweb";
import { useActiveAccount, useContractEvents } from "thirdweb/react";

import { BP_TOKEN_ADDRESS } from "@/app/contracts";

const BP_TOKEN_ADDRESS_WITH_PREFIX = BP_TOKEN_ADDRESS.address as `0x${string}`

export function useUserPoints() {
    const account = useActiveAccount()

    const transferEvent = prepareEvent({
      signature: "event Transfer(address indexed from, address indexed to, uint256 value)",
      filters: {
        from: account?.address,
        to: BP_TOKEN_ADDRESS_WITH_PREFIX,
      },
    });

    const contractEvents = useContractEvents({
      contract: BP_TOKEN_ADDRESS,
      events: [transferEvent],
    });
    console.log("contractEvents", contractEvents.data?.length)
  
    const { data: userPoints, isLoading: queryIsLoading, error: queryError, refetch } = useQuery({
      queryKey: ['userInteractions', account?.address],
      queryFn: () => contractEvents.data?.length ?? 0,
      enabled: !!account,
    })
    console.log("userPoints", userPoints)

    const isLoading = queryIsLoading || contractEvents.isLoading
    const error = queryError || contractEvents.error
  
    return { userPoints, isLoading, error, refetch }
}

