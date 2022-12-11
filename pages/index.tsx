import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import "react-toastify/dist/ReactToastify.css";
import { isWalletConnected, getConnectedWallet, connectNewWallet } from "./utils/metamask";
import { getSmartContract, buyCoffee, getCoffeeCount, getAllCoffee } from "./utils/buyCoffee";
import ConnectWallet from "./connectWallet";
import BuyCoffee from "./buyCoffee";


import Head from "next/head";
import abi from '../utils/CoffeePortal.json';

export default function Home() {
    // Smart Contract address
    const contractAddress = "0x8349482D0E6527ad294068Af095262Fd1498df9e";
    const contractABI = abi.abi;

    // State variables
    const [currentAccount, setCurrentAccount] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [allCoffee, setAllCoffee] = useState([]);


    useEffect(() => {
        /**
         * NOTE: external async functions need to be wrapped inside a function because
         * useEffect is funny with async functions.
         * https://devtrium.com/posts/async-functions-useeffect#write-the-asynchronous-function-inside-the-useeffect
         */
        // Check if wallet is connected. 
        const setWallet = async () => {
            if (await isWalletConnected()) {
                const walletAddress = await getConnectedWallet();
                setCurrentAccount(walletAddress);
            } else {
                console.log("Wallet not connected");
            }
        };

        setWallet();
    }, []);


    return (
        <div className="flex justify-center">

            {currentAccount ? (
                "Wallet connected"
            ) : (
                <ConnectWallet />
            )
            }
        </div>
    )

}