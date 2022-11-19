import Link from "next/link";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { toast } from "react-toastify";

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
        <p className="text-[#1B1A17] text-3xl font-medium underline underline-offset-2 hover:text-[#1A3263] transition-all duration-150 ease-linear hidden sm:block">
          Multi Send
        </p>
      </Link>

      <Link href="/" passHref>
        <p className="text-primary-main text-3xl font-medium underline underline-offset-2 hover:text-[#1B1A17] transition-all duration-150 ease-linear sm:hidden">
          M-Send
        </p>
      </Link>

      <WalletMultiButton className="bg-[#E45826] hover:bg-[#ff891c] rounded-sm" />
    </header>
  );
}
