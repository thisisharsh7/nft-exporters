export default function Footer() {
  return (
    <footer className="footer text-[#1B1A17] flex-row flex-wrap gap-2 text-center">
      <div>Developed with ❤️ By  {" "}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B20600]"
        >

          nft_exporters

        </a>
        {" "}
        |
      </div>
      <a href="http://solana.com" target="_blank" rel="noopener noreferrer" className="solana-logo">
        {/* eslint-disable-next-line */}
        <img
          src="/solana-crypto.png"
          alt="solana.com"
        />
      </a>

    </footer>
  );
}
