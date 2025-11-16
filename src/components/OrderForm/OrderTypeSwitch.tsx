import { Grid } from "@mui/material";
import React from "react";
import { CustomTextButton } from "../ui/CustomTextButton";
import { OrderFormState } from "../../types";

interface PropsType {
  type: "LIMIT" | "MARKET";
  updateOrder: <K extends keyof OrderFormState>(
    field: K,
    value: OrderFormState[K]
  ) => void;
}
const OrderTypeSwitch = ({ type, updateOrder }: PropsType) => {
  return (
    <Grid container>
      <CustomTextButton
        active={type === "LIMIT"}
        variant="text"
        onClick={() => updateOrder("type", "LIMIT")}
      >
        Limit
      </CustomTextButton>
      <CustomTextButton
        active={type === "MARKET"}
        variant="text"
        onClick={() => updateOrder("type", "MARKET")}
      >
        Market
      </CustomTextButton>
    </Grid>
  );
};

export default OrderTypeSwitch;
