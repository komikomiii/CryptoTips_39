import { BrowserProvider, formatEther, parseEther } from 'ethers';

export class Web3Service {
  private provider: BrowserProvider | null = null;

  // 初始化 provider（如果已连接）
  async initProvider(): Promise<void> {
    if (!window.ethereum) return;
    this.provider = new BrowserProvider(window.ethereum);
  }

  // 检查是否已经连接
  async checkConnection(): Promise<string | null> {
    if (!window.ethereum) return null;

    try {
      this.provider = new BrowserProvider(window.ethereum);
      const accounts = await this.provider.send('eth_accounts', []);
      return accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('检查连接失败:', error);
      return null;
    }
  }

  // 请求连接钱包
  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('请安装 MetaMask 钱包');
    }

    this.provider = new BrowserProvider(window.ethereum);
    const accounts = await this.provider.send('eth_requestAccounts', []);

    if (accounts.length === 0) {
      throw new Error('未找到账户');
    }

    return accounts[0];
  }

  async getAddress(): Promise<string | null> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) return null;
    }

    try {
      const signer = await this.provider.getSigner();
      return await signer.getAddress();
    } catch (error) {
      console.error('获取地址失败:', error);
      return null;
    }
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) throw new Error('Provider 未初始化');
    }

    const balance = await this.provider.getBalance(address);
    return formatEther(balance);
  }

  async sendTip(toAddress: string, amount: string): Promise<string> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) throw new Error('Provider 未初始化');
    }

    const signer = await this.provider.getSigner();
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: parseEther(amount),
    });

    const receipt = await tx.wait();
    if (!receipt) {
      throw new Error('交易失败');
    }

    return receipt.hash;
  }

  async getChainId(): Promise<number> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) throw new Error('Provider 未初始化');
    }

    const network = await this.provider.getNetwork();
    return Number(network.chainId);
  }

  isConnected(): boolean {
    return this.provider !== null;
  }

  disconnect(): void {
    this.provider = null;
  }
}

export const web3Service = new Web3Service();

declare global {
  interface Window {
    ethereum?: any;
  }
}
