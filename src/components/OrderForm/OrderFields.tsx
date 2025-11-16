import { CustomTextField } from "../ui/CustomTextField";
import { InputAdornment } from "@mui/material";
import { Asset, OrderFormState } from "../../types";

interface PropsType {
  order: OrderFormState;
  updateOrder: <K extends keyof OrderFormState>(
    field: K,
    value: OrderFormState[K]
  ) => void;
  notional: number;
  asset: Asset;
}
const OrderFields = ({ order, updateOrder, notional, asset }: PropsType) => {
  return (
    <>
      <CustomTextField
        value={order.price}
        onChange={(e) => updateOrder("price", e.target.value)}
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                {order.type === "LIMIT" ? "LIMIT PRICE" : "AVG PRICE(VWAP)"}
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          },
        }}
        disabled={order.type === "MARKET"}
      />
      <CustomTextField
        value={order.quantity}
        onChange={(e) => updateOrder("quantity", e.target.value)}
        autoComplete="off"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">QUANTITY</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">{asset}</InputAdornment>
            ),
          },
        }}
      />
      <CustomTextField
        value={notional > 0? notional.toFixed(12) : notional}
        disabled
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">TOTAL</InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          },
        }}
      />
    </>
  );
};

export default OrderFields;
