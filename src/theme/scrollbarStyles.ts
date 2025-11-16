import { Theme } from "@mui/material";

export const scrollbarStyles = (theme: Theme) => ({
  /* WebKit Browsers (Chrome, Edge, Safari) */
  "*::-webkit-scrollbar": {
    width: 8,
    height: 8,
  },
  "*::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[900],
    borderRadius: 4,
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[700], 
    borderRadius: 4,
    border: "2px solid " + theme.palette.grey[900], 
  },
  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[600],
  },

  /* Firefox */
  "*": {
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.grey[700]} ${theme.palette.grey[900]}`,
  },
});
