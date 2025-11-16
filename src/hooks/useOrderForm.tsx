import { useState } from "react";
import { OrderFormState } from "../types";

export function useOrderForm(initial: OrderFormState) {
  const [order, setOrder] = useState(initial);

  const updateOrder = <K extends keyof OrderFormState>(
    field: K,
    value: OrderFormState[K]
  ) => {
    if (field === "price" || field === "quantity") {
      const strValue = value.toString();
      if (!/^\d*\.?\d*$/.test(strValue)) return;
      setOrder((prev) => ({ ...prev, [field]: strValue as any }));
      return;
    }
    setOrder((prev) => ({ ...prev, [field]: value }));
  };

  return { order, setOrder, updateOrder };
}
