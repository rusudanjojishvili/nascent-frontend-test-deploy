import { Order, SelectedOrder } from "../types";
import { columns } from "../utils/table";
import DataTable from "./DataTable";
import { Grid } from "@mui/material";

interface AsksPropsType {
  setSelectedOrder: (selectedOrder: SelectedOrder) => void;
  asks: Order[];
}
const Asks = ({ setSelectedOrder, asks }: AsksPropsType) => {
  const data = asks
    .slice()
    .slice(0, 20)
    .reverse() // reverse the order for the ui only
    .map((ask, i) => ({
      price: ask.price,
      quantity: ask.quantity,
      total: Number(ask.price) * Number(ask.quantity),
    }));

  return (
    <Grid>
      <DataTable
        columns={columns}
        data={data}
        cellType="asks"
        hover={true}
        onRowClick={setSelectedOrder}
      />
    </Grid>
  );
};

export default Asks;
