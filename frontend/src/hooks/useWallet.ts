import { useState, useEffect } from 'react';
import { web3Service } from '../utils/web3';
import type { WalletState } from '../types';

// Sepolia 测试网链 ID
const SEPOLIA_CHAIN_ID = 11155111;
const SEPOLIA_CHAIN_HEX = '0xaa36a7';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 页面加载时自动检查连接状态
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  // 检查钱包是否已连接
  const checkIfWalletIsConnected = async () => {
    try {
      const address = await web3Service.checkConnection();

      if (address) {
        const chainId = await web3Service.getChainId();
        setWalletState({
          address,
          isConnected: true,
          chainId,
        });
      }
    } catch (err) {
      console.error('检查连接失败:', err);
    }
  };

  // 切换到 Sepolia 测试网
  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_HEX }],
      });
      return true;
    } catch (switchError: any) {
      // 如果链不存在，添加它
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: SEPOLIA_CHAIN_HEX,
                chainName: 'Sepolia 测试网',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
          return true;
        } catch (addError) {
          throw new Error('无法添加 Sepolia 测试网');
        }
      } else if (switchError.code === 4001) {
        // 用户拒绝切换
        throw new Error('请切换到 Sepolia 测试网才能使用');
      } else {
        throw switchError;
      }
    }
  };

  // 连接钱包
  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('请安装 MetaMask 钱包扩展');
      }

      const address = await web3Service.connectWallet();
      const chainId = await web3Service.getChainId();

      // 检查是否在 Sepolia 测试网
      if (chainId !== SEPOLIA_CHAIN_ID) {
        const shouldSwitch = confirm(
          '⚠️ 网络错误\n\n当前网络不是 Sepolia 测试网。\n\n这是一个测试应用，只能在 Sepolia 测试网上使用。\n\n点击"确定"自动切换到 Sepolia 测试网。'
        );

        if (shouldSwitch) {
          await switchToSepolia();
          // 等待网络切换完成，重新获取链 ID
          await new Promise(resolve => setTimeout(resolve, 1000));
          const newChainId = await web3Service.getChainId();

          setWalletState({
            address,
            isConnected: true,
            chainId: newChainId,
          });
        } else {
          throw new Error('请切换到 Sepolia 测试网');
        }
      } else {
        setWalletState({
          address,
          isConnected: true,
          chainId,
        });
      }
    } catch (err: any) {
      let message = '连接钱包失败';

      if (err.code === 4001) {
        message = '您拒绝了连接请求';
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
      console.error('连接钱包失败:', err);
    } finally {
      setLoading(false);
    }
  };

  // 断开连接
  const disconnectWallet = () => {
    web3Service.disconnect();
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
    setError(null);
  };

  // 监听账户和网络变化
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // 用户断开了所有账户
        disconnectWallet();
      } else {
        // 用户切换了账户
        setWalletState(prev => ({
          ...prev,
          address: accounts[0],
        }));
      }
    };

    const handleChainChanged = async (chainIdHex: string) => {
      // 网络切换时重新加载页面（推荐做法）
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    // 清理事件监听
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    loading,
    error,
  };
};
