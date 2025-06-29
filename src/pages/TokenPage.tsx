import React from "react";
import { useParams } from "react-router-dom";
import { useTokenList } from "../hooks/useTokenList";

const TokenPage = () => {
    const { mint } = useParams();
    const { tokens, loading } = useTokenList();

    if (loading) return <p>loading token data....</p>

    const token = tokens.find((t) => t.address === mint);

    if (!token) return <p>Token not found</p>

    const hasChart = ["BONK", "WIF", "WEN", "SAMO", "DOGE", "PEPE"].includes(
        token.symbol.toUpperCase()
    );

    return (
        <div className="max-w-4xl mx-auto p-4 text-white">
            <div className="fles items-center space-x-4">
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
                    <h2 className="test-2xl font-bold">
                        {token.name} <span className="text-gray-400">({token.symbol})</span>
                    </h2>
                    <p className="text-sm text-gray-400">
                        Mint: <span className="font-mono">{token.address}</span>
                    </p>
                </div>
            </div>
            
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Price Chart</h3>
                {hasChart ?(
                    <iframe 
                        title="Chart"
                        src={`https://www.tradingview.com/widgetembed/?symbol=BINANCE:${token.symbol}USDT&interval=15&theme=dark`}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allowTransparency={true}
                    />
                ): (
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
    )
}

export default TokenPage;