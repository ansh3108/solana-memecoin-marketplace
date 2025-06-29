import React, { useState } from "react";
import { useTokenList } from "../hooks/useTokenList";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { tokens, loading, error } = useTokenList();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Loading token list...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Trending Tokens (Jupiter)</h2>

      <input
        type="text"
        placeholder="Search tokens by name or symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="w-full px-4 py-2 mb-6 rounded-xl border border-gray-700 bg-[#0f0f0f] text-white placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <table style={{ width: "100%", textAlign: "left", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Token</th>
            <th>Symbol</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tokens) && tokens.length > 0 ? (
            tokens
              .filter((token) =>
                token.name?.toLowerCase().includes(searchTerm) ||
                token.symbol.toLowerCase().includes(searchTerm) 
              )
              .map((token) => (
              <tr key={token.address}>
                <td>
                  {token.logoURI ? (
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      width="24"
                      height="24"
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>
                <td>
                  <Link to={`/token/${token.address}`}>
                    {token.name || "Unnamed Token"}
                  </Link>
                </td>
                <td>{token.symbol || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No tokens found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
