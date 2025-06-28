import { useEffect, useState } from "react";
import axios from "axios";

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  coingeckoId?: string;
}

export const useTokenList = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const fetchTokens = async () => {
  try {
    const response = await axios.get("https://token.jup.ag/all");

    const allTokens = response.data as TokenInfo[];

    console.log("✅ All tokens raw:", allTokens.slice(0, 5));

    const filtered = allTokens
      .filter((token) => token?.symbol && token?.name)
      .slice(0, 100); // limit to 100

    setTokens(filtered);
  } catch (err: any) {
    console.error("❌ Token list fetch failed:", err);
    setError(err.message || "Token list fetch failed");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchTokens();
  }, []);

  return { tokens, loading, error };
};
