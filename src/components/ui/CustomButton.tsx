import { styled, Button } from "@mui/material";

export const CustomButton = styled(Button)<{ side?: "BUY" | "SELL" }>(
  ({ theme, side }) => ({
    textTransform: "none",
    borderRadius: 6,
    fontWeight: 600,
    fontSize: 14,
    padding: "10px 20px",
    boxShadow: "none",
    width: "100%",
    // Buy or Sell adaptive colors
    backgroundColor:
      side === "SELL" ? theme.palette.error.main : theme.palette.success.main,

    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor:
        side === "SELL" ? theme.palette.error.dark : theme.palette.success.dark,
      boxShadow: "none",
    },

    "&.Mui-disabled": {
      opacity: 0.7,
      color: side === 'SELL'? theme.palette.primary.main : theme.palette.grey[600]
    },

    "&:active": {
      boxShadow: "none",
      transform: "scale(0.98)",
    },
  })
);
