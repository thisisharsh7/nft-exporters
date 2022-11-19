
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import WalletContextProvider from "../components/WalletContextProvider";
import { toast } from "react-toastify";
import "../styles/globals.css";

export type SolanaNetworkType = "mainnet-beta" | "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  const [solanaNetwork, setSolanaNetwork] =
    useState<SolanaNetworkType>("devnet");

  useEffect(() => {
    toast.info(`App is using Solana ${solanaNetwork}`, {
      toastId: "solana-network",
      position: "top-center",
    });
  }, [solanaNetwork]);

  return (
    <div className="app">
      <WalletContextProvider solanaNetwork={solanaNetwork}>
        <Notification />

        <Header />

        <Component solanaNetwork={solanaNetwork} {...pageProps} />

        <Footer />
      </WalletContextProvider>
    </div>
  );
}

export default MyApp;
