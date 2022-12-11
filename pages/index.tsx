import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ConnectWallet from "./connectWallet";
import { getConnectedWallet, isWalletConnected } from "./utils/metamask";
import BuyCoffee from "./buyCoffee";


export default function Home() {
    // State variables
    const [currentAccount, setCurrentAccount] = useState("");

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
        <div className="flex justify-center">

            {currentAccount ? (
                <BuyCoffee />
            ) : (
                <ConnectWallet />
            )
            }
        </div>
    )

}