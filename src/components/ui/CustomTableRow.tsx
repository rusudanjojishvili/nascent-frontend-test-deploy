import { styled, TableRow } from "@mui/material";

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));

export default CustomTableRow;
