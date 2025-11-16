import { Grid } from "@mui/material";
import OrderBook from "./Orderbook";
import CryptoSwap from "./CryptoSwap";
import OrderForm from "./OrderForm";
import TradesHistory from "./TradesHistory";

const WidgetsContainer = () => {
  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
        <CryptoSwap />
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Grid size={{ xs: 12, sm: 5, md: 4 }}>
          <OrderBook />
        </Grid>
        <Grid size={{ xs: 12, sm: 7, md: 8 }}>
          <Grid container direction={"column"} spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <OrderForm />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <TradesHistory />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WidgetsContainer;
