import { ethers } from "ethers";


export const getSmartContract = async (contractAddress: string, contractABI: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    return contract;
};

export const buyCoffee = async (contract: any, name: string, message: string) => {
    const transaction = await contract.buyCoffee(
        message ? message : "No message",
        name ? name : "Anonymous",
        ethers.utils.parseEther("0.001"),
        { gasLimit: 300000 }
    );
    await transaction.wait();
    return transaction;
}

export const getCoffeeCount = async (contract: any) => {
    const count = await contract.getTotalCoffee();
    return count;
};

export const getAllCoffee = async (contract: any) => {
    const allCoffees = await contract.getAllCoffee();

    return allCoffees.map((coffee: any) => {
        return {
            address: coffee.giver,
            timestamp: new Date(coffee.timestamp * 1000),
            message: coffee.message,
            name: coffee.name,
        };
    });
};