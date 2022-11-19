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
  const [show1, setShow1] = useState('');
  const [show2, setShow2] = useState('hide');


  const checkBalance = async () => {

    if (publicKey != null) {
      console.log('harsh');
      try {
        const walletBalance = await connection.getBalance(publicKey, 'confirmed');
        const walletBalanceSOL = (walletBalance / LAMPORTS_PER_SOL).toFixed(2);
        setAmount(Number(walletBalanceSOL));
        console.log(walletBalanceSOL);
      } catch (e) {
        alert('error');
      }
    }
    else {
      console.log('⚠️ Wallet not connected')
    }
  }

  const onClick = useCallback(async (e) => {
    e.preventDefault();
    if (publicKey != null) {
      try {
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey('9XJxvFnSfG8BxHaeKRv617QhaNsnU28Rg2Fifr8ycrD7'), // replace the publickey with desred secondary wallet 
            lamports: 1000000000, // transfering 1 SOL
          })
        );

        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
        console.log(`Transaction confirmed: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
      } catch (e) {
        alert('error');
      }
    } else {
      console.log('⚠️ Wallet not connected');
    }
  }, [publicKey, sendTransaction, connection]);


  useEffect(() => {
    if (!publicKey) {
      setShow1('hide');
      setShow2('');
    } else {
      setShow1('');
      setShow2('hide');
    }

  }, [publicKey])

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

      <div className={`main ${show2}`}>
        <Image src={homeImage} alt="" />
        <div >
          <h1>Transactions Made Easy !</h1>
        </div>
      </div>
      <div className={`${show1} main`}>



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
