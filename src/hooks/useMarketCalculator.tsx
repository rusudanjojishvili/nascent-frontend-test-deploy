import { useMemo } from "react";
import { Order } from "../types";

export type MarketResult = {
  price: number; // VWAP(Volume-Weighted Avarage Price)
  notional: number; // total USD
};

export function useMarketCalculator(
  side: "BUY" | "SELL",
  quantity: number,
  orderBook: Order[]
): MarketResult | null {
  return useMemo(() => {
    if (quantity <= 0 || !orderBook || orderBook.length === 0) return null;

    // Sort book depending on side
     const sortedBook = [...orderBook].sort((a, b) =>
      side === "BUY" ? a.price - b.price : b.price - a.price
    );
    let remaining = quantity;
    let totalCost = 0;

    for (const level of sortedBook) {
      if (remaining <= 0) break;

      const tradeQty = Math.min(level.quantity, remaining);
      totalCost += tradeQty * level.price;
      remaining -= tradeQty;
    }

    if (remaining > 0) {
      // Not enough liquidity
      return null;
    }

    const vwap = totalCost / quantity;

    return {
      price: Number(vwap.toFixed(4)),
      notional: Number(totalCost.toFixed(4)),
    };
  }, [side, quantity, orderBook]);
}
