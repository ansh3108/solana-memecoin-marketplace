export const fetchPriceHistory = async (coingeckoId: string, days=7) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coingeckoId}/market_chart?vs_currency=usd&days=${days}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        return data.prices.map(([timestamp, price]: [number, number]) => ({
            time: new Date(timestamp).toLocaleDateString(),
            price,
        }));
    } catch (error) {
        console.error("Failed to fetch price history ", error);
        return[];
    }
}