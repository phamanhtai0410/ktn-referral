export interface IWalletInfo {
  address: string
  chainId: number
  network: object
  balance: string //eth balance
}

export interface IMessageInfo {
  message: string
  address: string
  nonce: number
}

// --- event ---
export interface IConnectInfo {
  chainId: string
}

export interface IProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

export interface IProviderMessage {
  type: string
  data: unknown
}

export enum Web3Error {
  WalletNotConnected = 'Wallet not connected',
}

export enum Web3EventType {
  Provider_Connect = 'connect',
  Provider_Disconnect = 'disconnect',
  Provider_AccountsChanged = 'accountsChanged',
  Provider_ChainChanged = 'chainChanged',
  Provider_Message = 'message',
  //----custom event
  Connecting = 'connecting',
}

export interface IWeb3Event {
  type: Web3EventType
  data?: IProviderRpcError | IConnectInfo | string | IProviderMessage | string[]
}

export type Web3Callback = (e: IWeb3Event) => void

export enum ConnectState {
  Connecting,
  Connected,
  Disconnected,
}



export interface IWatchAssetParameters {
  type: string; // The asset's interface, e.g. 'ERC20'
  options: {
    address: string; // The hexadecimal Ethereum address of the token contract
    symbol?: string; // A ticker symbol or shorthand, up to 5 alphanumerical characters
    decimals?: number; // The number of asset decimals
    image?: string; // A string url of the token logo
  };
}
export interface IAddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}