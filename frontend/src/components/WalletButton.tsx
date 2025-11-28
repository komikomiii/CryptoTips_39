import { useWallet } from '../hooks/useWallet';

export const WalletButton = () => {
  const { address, isConnected, connectWallet, disconnectWallet, loading } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <button
        onClick={disconnectWallet}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        {formatAddress(address)}
      </button>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50"
    >
      {loading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
};
