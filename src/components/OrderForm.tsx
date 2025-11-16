import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { CustomButton } from "./ui/CustomButton";
import { useAppContext } from "../context/AppContext";
import { calcLimitNotional, formatSide } from "../utils/order";
import { useMarketCalculator } from "../hooks/useMarketCalculator";
import { useOrderPlacement } from "../hooks/useOrderPlacement";
import { useOrderForm } from "../hooks/useOrderForm";
import OrderSideTabs from "./OrderForm/OrderSideTabs";
import OrderTypeSwitch from "./OrderForm/OrderTypeSwitch";
import OrderFields from "./OrderForm/OrderFields";

const OrderForm = () => {
  const { state } = useAppContext();
  const { order, setOrder, updateOrder } = useOrderForm({
    side: 0,
    type: "LIMIT",
    quantity: 0.000001,
    price: "",
  });
  const asset = state.currentAsset;
  const side = useMemo(() => formatSide(order.side), [order.side]);
  const price = useMemo(() => Number(order.price), [order.price]);
  const quantity = useMemo(() => Number(order.quantity), [order.quantity]);
  const { sendPlaceOrder } = useOrderPlacement();

  const activeBook =
    side === "BUY" ? state.orderBook?.asks ?? [] : state.orderBook?.bids ?? [];

  const marketNotional = useMarketCalculator(side, quantity, activeBook);

  const notional = useMemo(() => {
    return order.type === "LIMIT"
      ? calcLimitNotional(price, quantity)
      : marketNotional?.notional ?? 0;
  }, [order.type, price, quantity, marketNotional]);

  const isBtnDisabled = Object.entries(order).some(([key, value]) => {
    if (value === "" || value === null || value === undefined) return true;

    if (key !== "side" && value <= 0) return true;

    return false;
  });

  // Effect for type changes (LIMIT <-> MARKET)
  useEffect(() => {
    if (state.selectedOrder) return;

    setOrder((prev) => {
      if (order.type === "MARKET") {
        // switching to MARKET → fill with marketNotional price
        return { ...prev, price: marketNotional?.price ?? "" };
      }

      if (order.type === "LIMIT") {
        // switching to LIMIT → empty price
        return { ...prev, price: "" };
      }

      return prev;
    });
  }, [order.type]);

  // Effect for updating MARKET price when marketNotional changes
  useEffect(() => {
    if (state.selectedOrder) return;
    if (order.type !== "MARKET") return;

    setOrder((prev) => ({
      ...prev,
      price: marketNotional?.price ?? "",
    }));
  }, [marketNotional?.price]);

  useEffect(() => {
    // let a trader make a trade directly from the order book
    if (state.selectedOrder) {
      const { price, side } = state.selectedOrder;
      const customSide = side === "BUY" ? 0 : 1;
      // update everything except quantity - because the trader sends the desired quantity
      setOrder((prev) => ({
        ...prev,
        side: customSide,
        price,
        type: "LIMIT",
      }));
      sendPlaceOrder({
        side,
        quantity,
        price,
        type: "LIMIT",
        asset,
        notional: calcLimitNotional(price, quantity),
      });
    }
  }, [state.selectedOrder]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    updateOrder("side", newValue as 0 | 1);
  };

  const handleSendOrder = () => {
    const baseOrder = {
      ...order,
      side: side as "BUY" | "SELL",
      asset,
      notional,
      quantity,
    };

    const orderToSend =
      order.type === "MARKET"
        ? { ...baseOrder, price: undefined }
        : { ...baseOrder, price }; // keep price only for LIMIT

    sendPlaceOrder(orderToSend);
  };

  return (
    <Paper elevation={0} sx={{ width: "100%" }}>
      <OrderSideTabs value={order.side} onChange={handleTabChange} />
      <Grid
        container
        direction={"column"}
        sx={{ padding: "20px", paddingBottom: 0 }}
        spacing={2}
      >
        <OrderTypeSwitch type={order.type} updateOrder={updateOrder} />
        <OrderFields
          order={order}
          updateOrder={updateOrder}
          notional={notional}
          asset={asset}
        />
      </Grid>
      <Box sx={{ padding: "12px" }}>
        <Typography
          sx={(theme) => ({
            color: theme.palette.error.main,
            height: "30px",
          })}
        >
          {state.errorMessage}
        </Typography>
        <Tooltip
          title={
            isBtnDisabled
              ? "invalid values: enter valid values to execute"
              : "Double Click to execute"
          }
          arrow
        >
          <div>
            <CustomButton
              side={side}
              onDoubleClick={handleSendOrder}
              disabled={isBtnDisabled}
            >
              {order.side === 0 ? "Buy " : "Sell "} {asset}
            </CustomButton>
          </div>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default OrderForm;
