import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { TokenInfo } from "@solana/spl-token-registry";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";

import { useTokenList } from "../hooks/useTokenList";
import { useCoinGeckoChart } from "../hooks/useCoinGeckoChart";
import {
  addToWatchList,
  removeFromWatchList,
  isInWatchList,
} from "../utils/watchlist";
import { getSafeLogoURI } from "../utils/getSafeLogoURI";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

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
  const { publicKey } = useWallet();
  const [inWatchlist, setInWatchlist] = useState(false);

  const token = tokens.find((t) => t.address === mint) as ExtendedTokenInfo | undefined;
  const coingeckoId = token?.extensions?.coingeckoId ?? "";
  const { data: chartData, loading: chartLoading } = useCoinGeckoChart(coingeckoId);

  useEffect(() => {
    if (publicKey && token?.address) {
      setInWatchlist(isInWatchList(publicKey.toBase58(), token.address));
    }
  }, [publicKey, token?.address]);

  if (loading) return <p className="text-white">Loading token data...</p>;
  if (!token) return <p className="text-white">Token not found.</p>;

  const hasChart = chartData && chartData.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4 text-white">
      <div className="flex items-center space-x-4">
        {token.logoURI && (
          <img
            src={getSafeLogoURI(token.logoURI)}
            alt={token.symbol}
            width={64}
            height={64}
            className="rounded-full"
            onError={(e) => {
              e.currentTarget.src = "/assets/default-token.png"
            }} 
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">
            {token.name}{" "}
            <span className="text-gray-400">({token.symbol})</span>
          </h2>
          <p className="text-sm text-gray-400 font-mono break-all">
            Mint: {token.address}
          </p>

          {publicKey && (
            <button
              onClick={() => {
                const base58 = publicKey.toBase58();
                if (!inWatchlist) {
                  addToWatchList(base58, token.address);
                } else {
                  removeFromWatchList(base58, token.address);
                }
                setInWatchlist(!inWatchlist);
              }}
              className="mt-2 px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-800 text-white"
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          )}

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
                  href={`https://twitter.com/${token.extensions.twitter.replace("@", "")}`}
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
        <h3 className="text-xl font-semibold mb-2">Price Chart (7d)</h3>
        {chartLoading ? (
          <p>Loading chart...</p>
        ) : hasChart ? (
          <Line
            data={{
              labels: chartData.map((pt) => new Date(pt.time)),
              datasets: [
                {
                  label: `${token.symbol} Price`,
                  data: chartData.map((pt) => pt.price),
                  borderColor: "rgba(100, 108, 255, 1)",
                  backgroundColor: "rgba(100, 108, 255, 0.2)",
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `$${ctx.parsed.y.toFixed(6)}`
                  }
                }
              },
              scales: {
                x: {
                  type: "time",
                  time: { unit: "day" },
                  ticks: { color: "#ccc" }
                },
                y: {
                  ticks: { color: "#ccc" }
                }
              }
            }}
          />
        ) : (
          <p>No chart data available.</p>
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
