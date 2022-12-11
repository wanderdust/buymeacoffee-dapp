
export default function ConnectWallet() {
    const connectNewWallet = async () => {
        const accounts: [any] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    }
    return (
        <div>
            <button>

            </button>
        </div>
    )
}