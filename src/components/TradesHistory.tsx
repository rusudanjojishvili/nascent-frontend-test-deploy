import { useAppContext } from "../context/AppContext";
import { Grid, Paper, Typography } from "@mui/material";
import TradesTable from "./TradesTable";
import { tradeColumns } from "../utils/table";
import WidgetHeader from "./WidgetsHeader";

const TradesHistory = () => {
  const { state } = useAppContext();
  return (
    <Grid container direction="column" sx={{ overflow: "auto" }}>
      <Paper elevation={0} sx={{ borderRadius: "4px" }}>
        <WidgetHeader title="Trades History" />
        {state.trades?.length ? (
          <TradesTable
            columns={tradeColumns}
            data={state.trades}
            height={300}
          />
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 300,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={(theme) => ({
                color: theme.palette.grey[50],
              })}
            >
              No trades to show
            </Typography>
          </Grid>
        )}
      </Paper>
    </Grid>
  );
};

export default TradesHistory;
