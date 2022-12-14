import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ConnectWallet from "./connectWallet";
import BuyCoffee from "./buyCoffee";
import Header from "./header";
import Banner from "./banner";


export default function Home() {
    // State variables
    const [currentAccount, setCurrentAccount] = useState("");

    const isWalletConnected = async () => {
        if (!window.ethereum) {
            return false;
        }
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0
    };

    const getConnectedWallet = async () => {
        const accounts: [any] = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts[0];
    };

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
    }, [isWalletConnected]);


    return (
        <div className="flex flex-col items-center">
            <Banner />
            <Header />

            {currentAccount ? (
                <BuyCoffee />
            ) : (
                <ConnectWallet />
            )
            }

        </div>

    )

}