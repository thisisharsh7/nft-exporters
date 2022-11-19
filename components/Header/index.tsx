import Link from "next/link";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";
import logo from './logo.png';
import Image from "next/image";

export default function Header() {
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connecting) {
      toast.dismiss("wallet-disconnected");
    }

    if (wallet.connected) {
      toast.info("Wallet connected!", { toastId: "wallet-connected" });
    }

    if (wallet.disconnecting) {
      toast.dismiss("wallet-connected");
      toast.info("Wallet disconnected!", { toastId: "wallet-disconnected" });
    }
  }, [wallet]);

  return (
    <header className="header">
      <Link href="/" passHref>
        <Image src={logo} alt="" width={150}/>
      </Link>
      <WalletMultiButton className="walletBtn" />
    </header>
  );
}
