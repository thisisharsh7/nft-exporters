export default function Footer() {
  return (
    <footer className="footer text-[#1B1A17] flex-row flex-wrap gap-2 text-center">
      <p>Developed with ❤️ By  {" "}
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
      </p>
      <a href="http://solana.com" target="_blank" rel="noopener noreferrer">
        {/* eslint-disable-next-line */}
        <img
          src="/solana-crypto.png"
          alt="solana.com"
          className="w-5 hover:scale-125 transition-all duration-200 ease-in-out"
        />
      </a>
     
    </footer>
  );
}
