import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from "@mui/material";
import CustomTableCell from "./ui/CustomTableCell";
import CustomTableRow from "./ui/CustomTableRow";
import { Trade } from "../types";
import { TradesColumn } from "../types/table";

interface TradesTableProps {
  columns: TradesColumn[];
  data: Trade[];
  height?: number;
  hover?: boolean;
}

const TradesTable: React.FC<TradesTableProps> = ({
  columns,
  data,
  height = 600,
  hover = true,
}) => {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ height, borderRadius: "4px", overflowY: "auto" }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <CustomTableRow>
            {columns.map((col) => (
              <CustomTableCell key={col.key} align={col.align || "left"}>
                {col.label}
              </CustomTableCell>
            ))}
          </CustomTableRow>
        </TableHead>

        <TableBody>
          {data
            .slice()
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((row) => (
              <CustomTableRow
                key={row.id}
                hover={hover}
              >
                {columns.map((col) => (
                  <CustomTableCell
                    key={col.key}
                    align={col.align || "left"}
                    sx={(theme) => ({
                      color:
                        col.key === "side" || col.key === "price"
                          ? row.side === "BUY"
                            ? theme.palette.success.main
                            : theme.palette.error.main
                          : "inherit",
                      fontWeight: col.key === "side" ? "bold" : "normal",
                    })}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : // fallback rendering
                      col.key === "price" && row.type === "MARKET" && !row.price
                      ? "Market"
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

export default TradesTable;
