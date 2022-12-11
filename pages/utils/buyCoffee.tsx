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