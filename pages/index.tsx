import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ConnectWallet from "./connectWallet";
import BuyCoffee from "./buyCoffee";


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
        <div className="flex flex-col">
            <div className="flex justify-center bg-yellow-400 w-full py-6 px-6 mb-10 md:mb-24">
                <p>
                    This app only works using Goerli Ethereum,
                    a tesnet that is free to use. Don't try sending real Ethereum.
                </p>
            </div>

            {currentAccount ? (
                <BuyCoffee />
            ) : (
                <ConnectWallet />
            )
            }

        </div>

    )

}