import { baseTestnet } from "@/app/chains";
import { getContract } from "thirdweb";
import { client } from "./client";

// BP_TOKEN_ADDRESS
export const contract = getContract({
    client: client,
    address: "0x5ddaf93e4E7873B5A34a181d3191742B116aeF9B",
    chain: baseTestnet,
    /* abi: BPAbi */
})