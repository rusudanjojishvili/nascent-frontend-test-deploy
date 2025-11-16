import { styled, Button } from "@mui/material";

interface CustomTextButtonProps {
  active?: boolean;
}

export const CustomTextButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active", 
})<CustomTextButtonProps>(({ theme, active }) => ({
  textTransform: "none",
  fontWeight: 500,
  fontSize: 14,
  padding: "0px 10px",
  boxShadow: "none",
  backgroundColor: "transparent",
  color: active ? theme.palette.text.primary : theme.palette.grey[50],
  "&:hover": {
    backgroundColor: "transparent",
  },
}));
