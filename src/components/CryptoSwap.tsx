import { Asset } from "../types";
import { useAppContext } from "../context/AppContext";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CustomInput } from "./ui/CustomInput";
import { cryptoList } from "../utils/cryptoList";

const CryptoSwap = () => {
  const { state, dispatch } = useAppContext();

  const handleChange = (e: SelectChangeEvent) => {
    const selectedAsset = e.target.value as Asset;
    dispatch({ type: "SET_ASSET", payload: selectedAsset });
  };

  return (
    <Grid container>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={state.currentAsset}
          onChange={handleChange}
          input={<CustomInput />}
          renderValue={(selected) => {
            const item = cryptoList.find((c) => c.symbol === selected);
            if (!item) return selected;

            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src={item.icon}
                  alt={item.symbol}
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%" }}
                />
                {item.symbol}
              </Box>
            );
          }}
        >
          {cryptoList.map((coin) => (
            <MenuItem key={coin.symbol} value={coin.symbol}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src={coin.icon}
                  alt={coin.symbol}
                  width={20}
                  height={20}
                  style={{ borderRadius: "50%" }}
                />
                {coin.symbol}
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CryptoSwap;
