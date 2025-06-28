import { useEffect, useState } from "react";
import axios from "axios";

export interface TrendingToken{
    id: string;
    symbol: string;
    name: string;
    price_usd: number;
    price_change_percentage_24h: number;
    liquidity: number;
    volume_usd_24h: number;
    pair_created_at: number;
}

export const useTrendingTokens = () => {
    const [tokens, setTokens] = useState<TrendingToken[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await axios.get(
                    "https://public-api.birdeye.so/public/market/trending"
                );
                setTokens(response.data.data);
            } catch (err) {
                setError("Failed to fetch trending tokens");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    })
    return {tokens, loading, error}
};
