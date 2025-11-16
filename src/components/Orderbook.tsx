import Bids from "./Bids";
import Asks from "./Asks";
import { Grid, Paper } from "@mui/material";
import MidMarketPrice from "./MidMarketPrice";
import { SelectedOrder } from "../types";
import { useAppContext } from "../context/AppContext";
import WidgetHeader from "./WidgetsHeader";

const OrderBook = () => {
  const { state, dispatch } = useAppContext();
  const asks = state.orderBook?.asks || [];
  const bids = state.orderBook?.bids || [];
  const setSelectedOrder = (selectedOrder: SelectedOrder) => {
    dispatch({ type: "SET_SELECTED_ORDER", payload: selectedOrder });
  };
  return (
    <Grid container direction="column">
      <Paper elevation={0} sx={{ borderRadius: "4px" }}>
        <WidgetHeader title="Order Book" />
        <Asks setSelectedOrder={setSelectedOrder} asks={asks} />
        <MidMarketPrice />
        <Bids setSelectedOrder={setSelectedOrder} bids={bids} />
      </Paper>
    </Grid>
  );
};

export default OrderBook;
