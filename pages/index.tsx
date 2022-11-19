import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import type { SolanaNetworkType } from "./_app";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import transfer from './transfer_money.svg';
import Image from 'next/image';

interface HomePageProps {
  solanaNetwork: SolanaNetworkType;
}


const Home: NextPage<HomePageProps> = ({ solanaNetwork }: HomePageProps) => {
  // const { connection } = useConnection();
  // const wallet = useWallet();


  // const [refreshData, setRefreshData] = useState(1);

  // const getMovieReviews = async () => {
  //   try {
  //     if (!wallet.publicKey) {
  //       return;
  //     }
  //   }


  //     const programAddress = process.env.NEXT_PUBLIC_MOVIE_REVIEW_PROGRAM_ID;

  //     if (!programAddress) {
  //       return;
  //     }

  //     // const programId = new PublicKey(programAddress);

  //     const movieReviewsAccounts = await connection.getProgramAccounts(
  //       programId
  //     );





  return (
    <div className="page">
      <Head>
        <title>Multi Send | Send Payment on Solana</title>
        <meta
          name="description"
          content="Multi send is an web application which will help an user to send more than one payment at a time with solana. Built By nft exporters."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="main flex md:flex-row justify-center flex-col">

        <Image src={transfer} alt="" />
        <div className="md:w-1/2 w-full">
          <h1 className="text-4xl font-extrabold text-center drop-shadow-lg ">Transactions Made Easy !</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
