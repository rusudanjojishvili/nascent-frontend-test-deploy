import { Grid, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
}
const WidgetHeader = ({ title }: HeaderProps) => {
  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="center"
      sx={(theme) => ({
        padding: "6px 12px",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Typography
        variant="subtitle2"
        sx={(theme) => ({
          color: theme.palette.grey[400],
        })}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default WidgetHeader;
