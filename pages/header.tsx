export default function Header() {

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-end mb-6">
                <h1 className="font-bold text-4xl">Buy Me a Cofee!</h1>
                <img src="/coffee-cup.png" alt="coffee" className="w-10 h-10" />
            </div>
            <div>
                <p className="text-xl text-center px-6">
                    This app interacts with a <a href="https://github.com/wanderdust/buymeacoffee-smart-contract">Smart Contract</a> deployed to the (Goerli) Ethereum blockchain to take coffee donations.
                </p>
            </div>
        </div>
    )
}