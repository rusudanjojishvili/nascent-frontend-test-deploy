import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import { Column } from "../types/table";
import CustomTableRow from "./ui/CustomTableRow";
import CustomTableCell from "./ui/CustomTableCell";
import { SelectedOrder } from "../types";

interface DataTableProps {
  columns: Column[];
  data: any[];
  maxHeight?: number;
  hover?: boolean;
  // call type for coloring (e.g., "bids" | "asks")
  cellType?: "bids" | "asks";
  onRowClick: (selectedOrder: SelectedOrder) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  maxHeight = 800,
  hover = true,
  cellType,
  onRowClick,
}) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ maxHeight, borderRadius: "4px" }}
    >
      <Table stickyHeader size="small">
        {cellType === "asks" ? (
          <TableHead>
            <CustomTableRow>
              {columns.map((col) => (
                <CustomTableCell key={col.key} align={col.align || "left"}>
                  {col.label}
                </CustomTableCell>
              ))}
            </CustomTableRow>
          </TableHead>
        ) : null}

        <TableBody>
          {data.map((row, rowIndex) => (
            <CustomTableRow
              key={rowIndex}
              title="Double click to execute"
              sx={{ cursor: "pointer" }}
              hover={hover}
              onDoubleClick={() =>
                onRowClick({
                  price: row.price,
                  side: cellType === "asks" ? "BUY" : "SELL",
                })
              }
            >
              {columns.map((col) => (
                <CustomTableCell
                  key={col.key}
                  align={col.align || "left"}
                  className={
                    col.key === "price"
                      ? cellType === "bids"
                        ? "price-bid"
                        : cellType === "asks"
                        ? "price-ask"
                        : ""
                      : ""
                  }
                >
                  {col.render
                    ? col.render(row[col.key], row, rowIndex)
                    : row[col.key]}
                </CustomTableCell>
              ))}
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
