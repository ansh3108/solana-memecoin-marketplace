export const getWatchList = (walletAddress: string): string[] => {
    const raw = localStorage.getItem(`watchlist_${walletAddress}`);
    return raw ? JSON.parse(raw): [];
};

export const addToWatchList = (walletAddress: string, tokenAddress: string) => {
    const current = getWatchList(walletAddress);
    const updated = Array.from(new Set([...current, tokenAddress]));
    localStorage.setItem(`watchlist_${walletAddress}`, JSON.stringify(updated));
};

export const removeFromWatchList = (walletAddress: string, tokenAddress: string) => {
    const current = getWatchList(walletAddress).filter((addr) => addr !== tokenAddress);
    localStorage.setItem(`watchlist_${walletAddress}`, JSON.stringify(current));
};

export const isInWatchList = (walletAddress: string, tokenAddress: string): boolean => {
    return getWatchList(walletAddress).includes(tokenAddress);
}