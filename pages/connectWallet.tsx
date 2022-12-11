
import { useState, useEffect } from "react";


export default function ConnectWallet() {
    const [wallet, setWallet] = useState(null);

    const connectNewWallet = async () => {
        const accounts: [any] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallet(accounts[0]);
    }

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={connectNewWallet}
            >
                Connect Wallet
            </button>
            {!!wallet && window.location.reload()}
        </div>
    )
}