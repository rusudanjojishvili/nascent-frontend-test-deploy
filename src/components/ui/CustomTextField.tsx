import { styled, TextField } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    padding: "0px 14px",
    fontSize: 12,
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[100],
    },
  },
  "& .MuiInputBase-input": {
    padding: "4px 12px",
    textAlign: "right",
  },
  "& .MuiInputAdornment-root": {
    color: theme.palette.grey[50],
    fontSize: 12,
    "& p": {
      fontSize: 12,
      color: theme.palette.grey[50],
    },
  },
}));
