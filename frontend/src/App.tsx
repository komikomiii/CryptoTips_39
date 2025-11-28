import { useState } from 'react';
import { WalletButton } from './components/WalletButton';
import { TipForm } from './components/TipForm';
import { useWallet } from './hooks/useWallet';

function App() {
  const { isConnected } = useWallet();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Demo recipient address - replace with actual user's address
  const demoRecipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  const handleTipSuccess = (txHash: string) => {
    setSuccessMessage(`Tip sent successfully! Transaction: ${txHash}`);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">💎</span>
            <h1 className="text-2xl font-bold text-white">Crypto Tips</h1>
          </div>
          <WalletButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Support Your Favorite Creators
            </h2>
            <p className="text-xl text-white/80">
              Send crypto tips directly to creators you love, powered by Web3
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Tip Form or Connect Prompt */}
          {isConnected ? (
            <div>
              <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-white text-sm mb-1">Tipping to:</p>
                <p className="text-white font-mono text-xs break-all">{demoRecipient}</p>
              </div>
              <TipForm
                recipientAddress={demoRecipient}
                onSuccess={handleTipSuccess}
              />
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-2xl">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Connect Your Wallet
              </h3>
              <p className="text-gray-600 mb-6">
                Connect your MetaMask wallet to start sending tips
              </p>
            </div>
          )}

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">Instant</h3>
              <p className="text-white/70 text-sm">
                Tips are sent directly on the blockchain
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-white font-bold mb-2">Secure</h3>
              <p className="text-white/70 text-sm">
                Powered by Ethereum blockchain technology
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-white font-bold mb-2">Global</h3>
              <p className="text-white/70 text-sm">
                Send and receive from anywhere in the world
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-6">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          Built with React + TypeScript + ethers.js | Web3 Course Project
        </div>
      </footer>
    </div>
  );
}

export default App;
