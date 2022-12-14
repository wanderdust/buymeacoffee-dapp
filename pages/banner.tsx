export default function Banner() {
    return (
        <div className="flex justify-center bg-yellow-400 w-full py-6 px-6 mb-6">
            <p>
                This app only works using Goerli Ethereum,
                a tesnet that is free to use. Don't try sending real Ethereum.
                To get free Goerli Ethereum, visit <a className="underline" href="https://www.alchemy.com/overviews/goerli-faucet" target="_blank">Goerli Faucet</a>.
            </p>
        </div>
    )
}