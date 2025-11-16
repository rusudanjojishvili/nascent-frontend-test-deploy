import { Trade } from './index'
export interface Column {
  label: string;
  key: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

export interface TradesColumn {
  key: keyof Trade;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: Trade) => React.ReactNode;
}
