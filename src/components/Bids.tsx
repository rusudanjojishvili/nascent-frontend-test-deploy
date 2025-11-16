import { Order, SelectedOrder } from "../types";
import { columns } from "../utils/table";
import DataTable from "./DataTable";
import { Grid } from "@mui/material";

interface AsksPropsType {
  setSelectedOrder: (selectedOrder: SelectedOrder) => void;
  bids: Order[];
}
const Bids = ({ setSelectedOrder, bids }: AsksPropsType) => {
  const data = bids
    .map((bid, i) => ({
      price: bid.price,
      quantity: bid.quantity,
      total: Number(bid.price) * Number(bid.quantity),
    }))
    .slice(0, 20);

  return (
    <Grid>
      <DataTable
        columns={columns}
        data={data}
        cellType="bids"
        hover={true}
        onRowClick={setSelectedOrder}
      />
    </Grid>
  );
};

export default Bids;
