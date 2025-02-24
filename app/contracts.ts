// import { getContract } from '@wagmi/core'
import { baseSepolia } from 'wagmi/chains';

import { basedPlaceAbi } from '@/abi/BasedPlaceABI';

export const BP_TOKEN_ADDRESS = {
    address: '0xf2D7BcBae02f57D6D6c2b9f9254F65324563c994' as `0x${string}`,
    abi: basedPlaceAbi,
    chainId: baseSepolia.id,
} as const;

// export const getBPTokenContract = () => getContract(BP_TOKEN_ADDRESS)