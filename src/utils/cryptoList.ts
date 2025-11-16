export interface CryptoItem {
  symbol: string;
  name: string;
  icon: string;
}

export const cryptoList: CryptoItem[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    icon: "/icons/btc.svg",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "/icons/eth.svg",
  }
];
