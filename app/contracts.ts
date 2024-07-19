import { baseTestnet } from "@/app/chains";
import { getContract } from "thirdweb";
import { client } from "./client";

// BP_TOKEN_ADDRESS
export const BP_TOKEN_ADDRESS = getContract({
    client: client,
    address: "0xA6ce6718e11b7d8ED5175784493d552606Fa47c2",
    chain: baseTestnet,
    /* abi: BPAbi */
})

export const BP_AIRDROP_ADDRESS = getContract({
    client: client,
    address: "0xaa817847F842d1E030376CeC229371f08a4196c1",
    chain: baseTestnet,
})