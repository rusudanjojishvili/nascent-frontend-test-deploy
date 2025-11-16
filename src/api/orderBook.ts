import axios from 'axios';
import { Asset, RawOrderBook, ParsedOrderBook, OrderRequest, Trade } from '../types';
import { parseOrderBook } from '../utils/table';

const API_URL = process.env.REACT_APP_API_URL || "";
// Fetch orderbook and parse prices/quantities to numbers
export const fetchOrderBook = async (asset: Asset): Promise<ParsedOrderBook> => {
    const response = await axios.get<RawOrderBook>(`${API_URL}/orderbook/${asset}`);
    return parseOrderBook(response.data);
};

// Place an order (buy/sell)
export const placeOrder = async (
    order: OrderRequest
): Promise<Trade> => {
    const response = await axios.post(`${API_URL}//trade`, order);
    return response.data;
};
