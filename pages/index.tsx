import type { NextPage } from "next";
import { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import type { SolanaNetworkType } from "./_app";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import homeImage from './transfer_money.svg';
import Image from 'next/image';
import * as solanaWeb3 from "@solana/web3.js";
import { Keypair, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';


interface HomePageProps {
  solanaNetwork: SolanaNetworkType;
}



const Home: NextPage<HomePageProps> = ({ solanaNetwork }: HomePageProps) => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [checkAmount, setAmount] = useState(0);
  const [newAddress, setNewAddress] = useState('');
  const [newToken, setNewToken] = useState('');


  const [refreshData, setRefreshData] = useState(1);


  const checkBalance = async () => {
    if (publicKey != null) {
      const walletBalance = await connection.getBalance(publicKey, 'confirmed');
      const walletBalanceSOL = (walletBalance / LAMPORTS_PER_SOL).toFixed(2);
      setAmount(Number(walletBalanceSOL));
      console.log(walletBalanceSOL);
    }
    else {
      console.log('⚠️ Wallet not connected')
    }
  }

  const onClick = useCallback(async (e) => {
    e.preventDefault();
    console.log(newAddress);
    console.log(newToken);
    console.log(e);
    if (publicKey != null) {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('9h2Qd11CoMVtMftrGcvYN2ySaUSEisJGAQrv6hSWgc7T'), // replace the publickey with desred secondary wallet 
          lamports: 1000000000, // transfering 1 SOL
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');
      console.log(`Transaction confirmed: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } else {
      console.log('⚠️ Wallet not connected');
    }
  }, [publicKey, sendTransaction, connection]);


  useEffect(() => {
    if (!publicKey) {
      setRefreshData(1);
      return;
    } else {
      setRefreshData(0);

    }

  }, [checkBalance])

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

      <div className={(refreshData) ? 'main' : 'hide'}>
        <Image src={homeImage} alt="" />
        <div >
          <h1 >Transactions Made Easy !</h1>
        </div>
      </div>
      <div className={(refreshData) ? 'hide' : 'main'}>



        <form onSubmit={onClick}>
          <div>
            <input
              id="address"
              name="Address"
              type="text"
              placeholder="Address"
              className="inp"
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div>
            <input
              id="token"
              name="Token"
              type="text"
              placeholder="Token"
              className="inp"
              onChange={(e) => setNewToken(e.target.value)}
            />
          </div>
          <button type="submit" value="submit" id="btn">
            Send
          </button>
          <button className="btn-balance" onClick={checkBalance}>
          balance
        </button>
        </form>
       
      </div>


    </div>
  );
}


export default Home;
