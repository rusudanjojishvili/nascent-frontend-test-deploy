import { styled, Tab } from "@mui/material";

export const CustomTab = styled(Tab)<{ activeside?: "buy" | "sell" }>(
  ({ theme, activeside }) => ({
    flex: 1, // stretch tabs equally
    fontWeight: 500,
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.background.default,
    border: `2px solid ${theme.palette.background.paper}`,
    "&.Mui-selected": {
      backgroundColor: theme.palette.background.paper,
      color:
        activeside === "sell"
          ? theme.palette.error.main
          : theme.palette.success.main,
    },
  })
);
