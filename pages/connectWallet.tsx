
import { useState } from "react";


export default function ConnectWallet() {
    const [wallet, setWallet] = useState(null);
    const [error, setError] = useState("");

    const connectNewWallet = async () => {
        try {
            const accounts: [any] = await window.ethereum.request({ method: 'eth_requestAccounts' })
            setWallet(accounts[0]);
        } catch (error: any) {
            if (error instanceof TypeError) {
                setError("Metamask Wallet not found. Please add the Metamask extension,");
                return;
            }
            setError(error.message);
        }


    }

    const card = (message: string) => {
        return (
            <div className="flex flex-row bg-gray-100 w-48 rounded m-6 items-center text-center">
                <p className="p-3 font-normal">{message}</p>
            </div>
        )
    }

    return (
        <div className="flex items-center flex-col" >
            {!!error && (
                <div className="bg-red-100 border border-red-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error} Refresh the page and try again.</span>
                </div>
            )}
            <h1 className="text-3xl font-bold">How it Works</h1>
            <div className="flex flex-row mb-8">
                {card("1. Connect your Metamask Wallet")}
                {card("2. Select how much coffee to buy")}
                {card("3. Confirm transaction in your Wallet")}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={connectNewWallet}
            >
                Connect Wallet
            </button>
            {!!wallet && window.location.reload()}
        </div>
    )
}