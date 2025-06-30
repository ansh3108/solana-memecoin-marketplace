import React from "react";
import { useParams } from "react-router-dom";
import { useTokenList } from "../hooks/useTokenList";
import { TokenInfo } from "@solana/spl-token-registry";

type ExtendedTokenInfo = TokenInfo & {
  extensions?: {
    coingeckoId?: string;
    website?: string;
    twitter?: string;
  };
};

const TokenPage: React.FC = () => {
  const { mint } = useParams();
  const { tokens, loading } = useTokenList();

  if (loading) return <p className="text-white">Loading token data...</p>;

  const token = tokens.find((t) => t.address === mint) as ExtendedTokenInfo;

  if (!token) return <p className="text-white">Token not found</p>;

  const hasChart = ["BONK", "WIF", "WEN", "SAMO", "DOGE", "PEPE"].includes(
    token.symbol.toUpperCase()
  );

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <div className="flex items-center space-x-4">
        {token.logoURI && (
          <img
            src={token.logoURI}
            alt={token.symbol}
            width={64}
            height={64}
            className="rounded-full"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">
            {token.name}{" "}
            <span className="text-gray-400">({token.symbol})</span>
          </h2>
          <p className="text-sm text-gray-400">
            Mint: <span className="font-mono">{token.address}</span>
          </p>

          {token.extensions && (
            <div className="mt-2 space-x-4 text-sm">
              {token.extensions.website && (
                <a
                  href={token.extensions.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  Website
                </a>
              )}
              {token.extensions.twitter && (
                <a
                  href={`https://twitter.com/${token.extensions.twitter.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Twitter
                </a>
              )}
              {token.extensions.coingeckoId && (
                <a
                  href={`https://www.coingecko.com/en/coins/${token.extensions.coingeckoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  CoinGecko
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Price Chart</h3>
        {hasChart ? (
          <iframe
            title="Chart"
            src={`https://www.tradingview.com/widgetembed/?symbol=BINANCE:${token.symbol}USDT&interval=15&theme=dark`}
            width="100%"
            height="400"
            frameBorder="0"
            allowTransparency={true}
          />
        ) : (
          <div className="border border-gray-600 p-6 text-center text-gray-400">
            No chart available for this token.
          </div>
        )}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Swap this token</h3>
        <iframe
          src={`https://jup.ag/swap/SOL-${token.symbol}`}
          width="100%"
          height="500"
          frameBorder="0"
          style={{ borderRadius: "12px" }}
          allow="clipboard-write; web-share"
        ></iframe>
      </div>
    </div>
  );
};

export default TokenPage;
