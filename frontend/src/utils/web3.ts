import { BrowserProvider, formatEther, parseEther } from 'ethers';

export class Web3Service {
  private provider: BrowserProvider | null = null;

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    this.provider = new BrowserProvider(window.ethereum);
    const accounts = await this.provider.send('eth_requestAccounts', []);
    return accounts[0];
  }

  async getAddress(): Promise<string | null> {
    if (!this.provider) return null;
    const signer = await this.provider.getSigner();
    return await signer.getAddress();
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');
    const balance = await this.provider.getBalance(address);
    return formatEther(balance);
  }

  async sendTip(toAddress: string, amount: string): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized');

    const signer = await this.provider.getSigner();
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: parseEther(amount),
    });

    const receipt = await tx.wait();
    return receipt?.hash || '';
  }

  async getChainId(): Promise<number> {
    if (!this.provider) throw new Error('Provider not initialized');
    const network = await this.provider.getNetwork();
    return Number(network.chainId);
  }

  isConnected(): boolean {
    return this.provider !== null;
  }
}

export const web3Service = new Web3Service();

declare global {
  interface Window {
    ethereum?: any;
  }
}
