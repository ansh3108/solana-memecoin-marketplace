import React, { useState } from "react";
import { useTokenList } from "../hooks/useTokenList";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { tokens, loading, error } = useTokenList();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p className="text-white text-center mt-8">Loading token list...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">🔥 Trending Tokens (Jupiter)</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="🔍 Search tokens by name or symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="w-full px-4 py-3 mb-6 rounded-lg border border-gray-600 bg-[#1a1a1a] text-white placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-violet-600"
      />

      {/* Token Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full table-auto bg-[#1a1a1a] rounded-xl overflow-hidden">
          <thead className="bg-[#222] text-gray-400">
            <tr>
              <th className="py-3 px-4 text-left">Logo</th>
              <th className="py-3 px-4 text-left">Token</th>
              <th className="py-3 px-4 text-left">Symbol</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tokens) && tokens.length > 0 ? (
              tokens
                .filter(
                  (token) =>
                    token.name?.toLowerCase().includes(searchTerm) ||
                    token.symbol.toLowerCase().includes(searchTerm)
                )
                .map((token) => (
                  <tr
                    key={token.address}
                    className="border-b border-[#333] hover:bg-[#2a2a2a] transition"
                  >
                    <td className="py-3 px-4">
                      {token.logoURI ? (
                        <img
                          src={token.logoURI}
                          alt={token.symbol}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-500">No Logo</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        to={`/token/${token.address}`}
                        className="hover:underline text-violet-400"
                      >
                        {token.name || "Unnamed Token"}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{token.symbol || "N/A"}</td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No tokens found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
