export interface User {
  id: string;
  username: string;
  walletAddress: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Tip {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  message?: string;
  txHash: string;
  createdAt: Date;
  fromUser?: User;
  toUser?: User;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
}
