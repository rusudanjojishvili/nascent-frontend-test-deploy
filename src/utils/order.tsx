import { placeOrder } from "../api/orderBook";
import { Order, OrderRequest, Trade } from "../types";

export const sendOrder = async (orderState: OrderRequest): Promise<Trade> => {
  const { asset, side, type, quantity, price, notional } = orderState;

  const payload: OrderRequest = {
    asset,
    side,
    type: type.toUpperCase() as "LIMIT" | "MARKET",
    quantity,
    price,
    notional,
  };

  
  return await placeOrder(payload);
};
export const calcMarketNotional = (asks: Order[], amountToBuy: number) => {
  let remaining = amountToBuy;
  let totalCost = 0;

  for (const level of asks) {
    if (remaining <= 0) break;

    const fillQty = Math.min(remaining, level.quantity);
    totalCost += fillQty * level.price;
    remaining -= fillQty;
  }

  if (remaining > 0) {
    throw new Error("Not enough liquidity to fill market buy order");
  }

  return {
    notional: totalCost,
    VWAP: totalCost / amountToBuy, //volume weighted avarage price
  };
};

export const calcLimitNotional = (price: number, quantity: number) => {
  return Number(price * quantity);
};

export const formatSide = (side: 0 | 1) => (side === 0 ? "BUY" : "SELL");
