import { useAppContext } from "../context/AppContext";
import { OrderRequest, Trade } from "../types";
import { sendOrder } from "../utils/order";
import { AxiosError } from "axios";

export function useOrderPlacement() {
  const { dispatch } = useAppContext();

  const sendPlaceOrder = async (orderRequest: OrderRequest) => {
    try {
      const completedTrade = await sendOrder(orderRequest);

      if (completedTrade) {
        dispatch({ type: "ADD_TRADE", payload: completedTrade as Trade });
      }
    } catch (err: unknown) {
      let message = "Unknown error";

      // Handle Axios errors
      if (err instanceof AxiosError) {
        message = err.response?.data?.message || err.response?.data.error || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      }

      dispatch({ type: "SET_ORDER_ERROR", payload: message });

      setTimeout(() => {
        dispatch({ type: "SET_ORDER_ERROR", payload: "" });
      }, 4000);
    } finally {
      dispatch({ type: "SET_SELECTED_ORDER", payload: null });
    }
  };

  return { sendPlaceOrder };
}
