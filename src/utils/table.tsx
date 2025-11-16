import { ParsedOrderBook, RawOrderBook } from "../types";
import { Column, TradesColumn } from "../types/table";

export const columns: Column[] = [
  {
    label: "Price",
    key: "price",
    align: "left",
    render: (val: number) => val.toFixed(2),
  },
  {
    label: "Quantity",
    key: "quantity",
    align: "right",
    render: (val: number) => val.toFixed(6),
  },
  {
    label: "Total",
    key: "total",
    align: "right",
    render: (val: number) => val.toFixed(4),
  },
];

export const parseOrderBook = (raw: RawOrderBook): ParsedOrderBook => ({
  bids: raw.bids.map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  })),
  asks: raw.asks.map(([price, qty]) => ({
    price: parseFloat(price),
    quantity: parseFloat(qty),
  })),
});

export const tradeColumns: TradesColumn[] = [
  { key: "asset", label: "Asset" },
  { key: "side", label: "Side" },
  { key: "type", label: "Type" },
  { key: "quantity", label: "Quantity", align: "right" },
  {
    key: "price",
    label: "Price",
    align: "right",
    render: (value, row) =>
      row.type === "MARKET" && !value
        ? "Market"
        : Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          }),
  },
  {
    key: "notional",
    label: "Notional",
    align: "right",
    render: (value) =>
      Number(value).toFixed(6)
  },
  {
    key: "timestamp",
    label: "Time",
    render: (value) => new Date(value).toLocaleString(),
  },
];
