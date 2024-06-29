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