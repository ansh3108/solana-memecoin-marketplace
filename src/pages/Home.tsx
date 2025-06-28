import React from "react";
import { useTokenList } from "../hooks/useTokenList";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const { tokens, loading, error } = useTokenList();

  if (loading) return <p>Loading token list...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Trending Tokens (Jupiter)</h2>

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
            tokens.map((token) => (
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
