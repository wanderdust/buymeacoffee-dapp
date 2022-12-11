import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from '../utils/CoffeePortal.json';


export default function BuyCoffee() {
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [coffePurchased, setCoffeePurchased] = useState(false);
    const [transactionInProgress, setTransactionInProgress] = useState(false);


    const contractAddress = "0x8349482D0E6527ad294068Af095262Fd1498df9e";
    const contractABI = abi.abi;

    const getSmartContract = async (contractAddress: string, contractABI: any) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        setContract(contract);
    };

    const buyCoffee = async (contract: any, name: string, message: string) => {
        setTransactionInProgress(true);
        const transaction = await contract.buyCoffee(
            message ? message : "No message",
            name ? name : "Anonymous",
            ethers.utils.parseEther("0.001"),
            { gasLimit: 300000 }
        );
        await transaction.wait();

        setTransactionInProgress(false);
        setCoffeePurchased(true);
    }

    useEffect(() => {
        getSmartContract(contractAddress, contractABI);
    }, []);

    return (
        <div className="flex flex-col p-12 shadow-md rounded-lg w-96" >
            {coffePurchased && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">Coffee purchased successfully!</span>
                </div>
            )}
            <h1 className="text-3xl font-bold mb-4">Buy Coffee</h1>
            <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-2"
            />
            <input
                type="text"
                placeholder="Enter your message"
                onChange={(e) => setMessage(e.target.value)}
                className="placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mb-6"
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                onClick={() => buyCoffee(contract, name, message)}
                disabled={!!coffePurchased || transactionInProgress}
            >
                {transactionInProgress ? "Buying coffee..." : "Buy Coffee"}
            </button>
        </div >
    )

}