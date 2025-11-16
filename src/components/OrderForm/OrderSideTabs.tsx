import { Box, Tabs } from "@mui/material";
import React from "react";
import { CustomTab } from "../ui/CustomTab";

interface PropsType {
  value: 0 | 1;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
const OrderSideTabs = ({ value, onChange }: PropsType) => {
  return (
    <Box>
      <Tabs
        value={value}
        onChange={onChange}
        variant="fullWidth"
        sx={(theme) => ({
          borderRadius: "4px",
          "& .MuiTabs-indicator": {
            backgroundColor:
              value === 0
                ? theme.palette.success.main
                : theme.palette.error.main,
          },
        })}
        aria-label="order side"
      >
        <CustomTab label="BUY" activeside="buy" />
        <CustomTab label="SELL" activeside="sell" />
      </Tabs>
    </Box>
  );
};

export default OrderSideTabs;
