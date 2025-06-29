import { useMemo } from "react";
import type { FC } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { clusterApiUrl } from "@solana/web3.js";


import Home from "./pages/Home";
import TokenPage from "./pages/TokenPage"
import "@solana/wallet-adapter-react-ui/styles.css"

const App: FC = () => {
  const endpoint = clusterApiUrl("devnet")
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

  return(
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <Router>
            <div style={{ padding: "1rem"}}>
              <WalletMultiButton />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/token/:mint" element={<TokenPage />}></Route>
              </Routes>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;