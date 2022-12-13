import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from '../utils/CoffeeContract.json';
import TransactionList from "./transactionList";


export default function BuyCoffee() {
    const [contract, setContract] = useState<any>(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [amount, setAumount] = useState("0");
    const [coffePurchased, setCoffeePurchased] = useState(false);
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const [allCoffee, setAllCoffee] = useState([]);


    const contractAddress = "0xd84cDB11cb109e0b313590666f10EcbaE0fE5e55";
    const contractABI = abi.abi;
    const transferAmounts = [["0.0001 ETH (£1)", "0.0001"], ["0.002 ETH (£2)", "0.002"], ["0.005 ETH (£5)", "0.005"]]

    const getSmartContract = async (contractAddress: string, contractABI: any) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        setContract(contract);
        getAllCoffee(contract);
    };

    const buyCoffee = async (contract: any, name: string, message: string) => {
        setTransactionInProgress(true);
        const transaction = await contract.transfer(
            ethers.utils.parseEther(amount),
            message ? message : "No message",
            name ? name : "Anonymous",
            {
                gasLimit: 300000,
                value: ethers.utils.parseEther(amount)
            }
        );
        await transaction.wait();

        setCoffeePurchased(true);
        setTransactionInProgress(false);
        getAllCoffee(contract);
    }

    const getAllCoffee = async (contract: any) => {
        let allCoffee = await contract.getAllCoffee();

        allCoffee = allCoffee.map((coffee: any) => {
            return {
                address: coffee.giver,
                timestamp: new Date(coffee.timestamp * 1000),
                message: coffee.message,
                name: coffee.name,
            };
        });

        setAllCoffee(allCoffee.reverse().slice(0, 4));
    };

    useEffect(() => {
        getSmartContract(contractAddress, contractABI);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center flex-col p-6 md:p-12 shadow-md rounded-lg w-80 md:w-96" >
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

                <h2 className="text-xl font-bold">Amount to pay</h2>
                <div className="flex justify-between mb-2">
                    {
                        transferAmounts.map(([val, amountToPay]) => (
                            <button
                                className="hover:bg-blue-200 text-grey py-2 px-4 rounded text-xs"
                                onClick={() => setAumount(amountToPay)}
                                key={val}
                            >
                                {val}
                            </button>
                        ))
                    }
                </div>
                <p className="mb-2">Selected amount <span className="font-bold">{amount} ETH</span></p>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                    onClick={() => buyCoffee(contract, name, message)}
                    disabled={!!coffePurchased || transactionInProgress || amount == "0"}
                >
                    {transactionInProgress ? "Buying coffee..." : "Buy Coffee"}
                </button>
            </div >
            <TransactionList allCoffee={allCoffee} />
        </div>
    )

}