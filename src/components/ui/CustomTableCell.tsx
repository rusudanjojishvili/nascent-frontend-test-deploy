import { styled, TableCell, tableCellClasses } from "@mui/material";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "12px",
  padding: "2px 16px",
  borderBottom: "none",
  // backgroundColor: theme.palette.background.paper,
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.background.paper,
  },
  "&.price-bid": {
    color: theme.palette.success.main, // default green, can add dynamic class for red
  },
  "&.price-ask": {
    color: theme.palette.error.main, // default green, can add dynamic class for red
  },
  "&.total-cell": {
    fontWeight: 700,
  },
}));

export default CustomTableCell;
