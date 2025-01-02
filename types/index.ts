export interface PixelsProps {
    id: number;
    created_at: string;
    color: string;
}

export interface UserProfile {
    id: number;
    created_at: string;
    address: string;
    pixels_minted: number;
    ve_token: number;
    votes: number;
}

export interface allowListProps {
    address: string;
    maxClaimable: string;
}

export type UpdatePixelColorFunction = (index: number, color: string) => Promise<void>;

export interface PlayerStatsProps {
    formattedBalance: string | undefined;
    isBalanceLoading: boolean;
    userPoints: number | undefined;
    isPointsLoading: boolean;
    totalPixels: number;
}

export interface Transaction {
    method: string
    from: {
      hash: string
    };
    to: {
      hash: string
    };
}