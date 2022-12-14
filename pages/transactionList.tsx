export default function TransactionList({ allCoffee = [] }: any) {

    return (
        <div className="m-10">
            <h1 className="text-l font-medium mb-2">Last Transactions </h1>
            <div className="flex flex-col">
                {allCoffee.length > 0 && allCoffee.map((coffee: any) => (
                    <div className="flex flex-row justify-between md:max-w-3xl p-4 shadow-md rounded-lg mb-4 bg-sky-50 hover:bg-sky-100 transition delay-75">
                        <div className="flex flex-col mr-6">
                            <p className="font-medium">Name: <span className="font-normal">{coffee.name}</span></p>
                            <p className="font-medium hidden md:block">Address: <span className="font-normal">{coffee.address}</span></p>
                            <p className="font-medium">Message: <span className="font-normal">{coffee.message}</span></p>
                        </div>
                        <p>{coffee.timestamp.toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}