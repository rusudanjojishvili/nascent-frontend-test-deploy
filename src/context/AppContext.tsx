import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { fetchOrderBook } from "../api/orderBook";
import { placeOrder as apiPlaceOrder } from "../api/orderBook";
import {
  ParsedOrderBook,
  Asset,
  OrderRequest,
  Trade,
  SelectedOrder,
} from "../types";

interface AppState {
  currentAsset: Asset;
  orderBook: ParsedOrderBook | null;
  trades: Trade[];
  selectedOrder: SelectedOrder | null;
  errorMessage: string;
}

type Action =
  | { type: "SET_ASSET"; payload: Asset }
  | { type: "SET_ORDERBOOK"; payload: ParsedOrderBook }
  | { type: "ADD_TRADE"; payload: Trade }
  | { type: "SET_SELECTED_ORDER"; payload: SelectedOrder | null }
  | { type: "SET_ORDER_ERROR"; payload: string };

const initialState: AppState = {
  currentAsset: "BTC",
  orderBook: null,
  trades: [],
  selectedOrder: null,
  errorMessage: "",
};

interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  placeOrder: (order: OrderRequest) => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_ASSET":
      return { ...state, currentAsset: action.payload };
    case "SET_ORDERBOOK":
      return { ...state, orderBook: action.payload };
    case "ADD_TRADE":
      return { ...state, trades: [action.payload, ...state.trades] };
    case "SET_SELECTED_ORDER":
      return { ...state, selectedOrder: action.payload };
    case "SET_ORDER_ERROR":
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Fetch orderbook on mount and when currentAsset changes
  useEffect(() => {
    const loadOrderBook = async () => {
      try {
        const data = await fetchOrderBook(state.currentAsset);
        dispatch({ type: "SET_ORDERBOOK", payload: data });
      } catch (err) {
        console.error("Failed to fetch orderbook", err);
      }
    };

    loadOrderBook();
  }, [state.currentAsset]);

  // placeOrder function exposed via context
  const placeOrder = async (order: OrderRequest) => {
    try {
      const trade: Trade = await apiPlaceOrder(order);
      dispatch({ type: "ADD_TRADE", payload: trade });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch, placeOrder }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for consuming context
export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
