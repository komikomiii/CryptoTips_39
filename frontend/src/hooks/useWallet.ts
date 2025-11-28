import { useState, useEffect } from 'react';
import { web3Service } from '../utils/web3';
import type { WalletState } from '../types';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      const address = await web3Service.connectWallet();
      const chainId = await web3Service.getChainId();

      setWalletState({
        address,
        isConnected: true,
        chainId,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to connect wallet';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
          }));
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    loading,
    error,
  };
};
