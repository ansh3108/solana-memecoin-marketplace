import { useEffect, useState } from "react";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";

export type ExtendedTokenInfo = TokenInfo & {
  extensions?: {
    coingeckoId?: string;
    website?: string;
    twitter?: string;
  };
};

export const useTokenList = () => {
  const [tokens, setTokens] = useState<ExtendedTokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokenListContainer = await new TokenListProvider().resolve();
        const allTokens = tokenListContainer.getList();

        const solanaTokens = allTokens.filter(
          (token) => token.chainId === 101
        ) as ExtendedTokenInfo[];

        setTokens(solanaTokens);
      } catch (err: any) {
        console.error("❌ Token list fetch failed:", err);
        setError(err.message || "Token fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading, error };
};
