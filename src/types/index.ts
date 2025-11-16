export type Asset = 'BTC' | 'ETH';

export interface RawOrderBook {
    lastUpdateId: number;
    bids: [string, string][];
    asks: [string, string][];
}

// Optional: parsed order for easier use in the UI
export interface Order {
    price: number;
    quantity: number;
}

export interface ParsedOrderBook {
    bids: Order[];
    asks: Order[];
}

// post /trade request 
export interface OrderRequest {
    asset: Asset;
    side: 'BUY' | 'SELL';
    price?: number; // must be sent only when type is "LIMIT"
    quantity: number;
    type: 'LIMIT' | 'MARKET';
    notional: number
}

// post /trade - server error response
export interface OrderError {
    error: string;
}

export interface Trade extends OrderRequest {
    id: string;
    timestamp: number;
}

export interface OrderFormState {
    type: 'LIMIT' | 'MARKET';
    side: 0 | 1;
    price: number | string;
    quantity: number | string;
}
export interface SelectedOrder
    extends Pick<OrderRequest, "side"> {
    price: number;
}
