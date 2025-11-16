import { InputBase, styled } from "@mui/material";

export const CustomInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[50]}`,
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    color: theme.palette.primary.main,
    "&:focus": {
      borderRadius: 4,
      borderColor: theme.palette.divider,
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
