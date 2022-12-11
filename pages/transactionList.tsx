export default function TransactionList({ allCoffee }: any) {

    return (
        <div className="m-10">
            <h1 className="text-xl font-bold mb-10">Transaction List</h1>
            <div className="flex flex-col">
                {allCoffee.map((coffee: any) => (
                    <div className="flex flex-row justify-between p-4 shadow-md rounded-lg mb-4 bg-sky-50">
                        <div className="flex flex-col mr-6">
                            <p className="font-medium">Name: <span className="font-normal">{coffee.name}</span></p>
                            <p className="font-medium">Address: <span className="font-normal">{coffee.address}</span></p>
                            <p className="font-medium">Message: <span className="font-normal">{coffee.message}</span></p>
                        </div>
                        <p className="">{coffee.timestamp.toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}