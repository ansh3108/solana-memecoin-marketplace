import { useEffect, useState } from "react";
import axios from "axios";

interface PricePoint {
    time: number;
    price: number;
}

export const useCoinGeckoChart = (coingeckoId: string | undefined => {
    const [data, setData] = useState<PricePoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        try {
            const res = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart`,
                {
                    params: {
                        vs_currency: "usd",
                        days: 7,
                        interval: "hourly"
                    },
                }
            );

            const prices = res.data.prices.map((point: ))
        }
    })
})