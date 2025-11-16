import { useAppContext } from "../context/AppContext";
import { Order } from "../types";
import { Grid, Typography } from "@mui/material";

const MidMarketPrice = () => {
  const { state } = useAppContext();
  const bids: Order[] = state.orderBook?.bids || [];
  const asks: Order[] = state.orderBook?.asks || [];

  const bestBid = bids[0]?.price ?? 0;
  const bestAsk = asks[0]?.price ?? 0;
  const midMarketPrice = (bestAsk + bestBid) / 2;
  const spread = bestAsk - bestBid;
  const spreadDisplay = spread.toFixed(2);

  return (
    <Grid
      container
      justifyContent={"space-between"}
      sx={(theme) => ({
        padding: "5px 16px",
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Typography variant="subtitle1">{midMarketPrice}</Typography>
      <Typography variant="subtitle1">{spreadDisplay}</Typography>
    </Grid>
  );
};

export default MidMarketPrice;
