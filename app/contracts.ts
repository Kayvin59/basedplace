import { getContract } from "thirdweb";

import { baseTestnet } from "@/app/chains";

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
    address: "0xd8B3a3871838A18Ab47d7DbF75aD2118d56E6475",
    // BPAIRDROP1: 0xaa817847F842d1E030376CeC229371f08a4196c1
    // BPAIRDROP2: 0x296394d56F82Db509E460bcF03465D809E47d5e4
    // BPAIRDROP: 0xB39Dd21Bd42638Bcab421ebfF19afA17E49Ce8eC
    chain: baseTestnet,
})