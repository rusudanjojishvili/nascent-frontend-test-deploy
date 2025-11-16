import "./App.css";
import {
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  useTheme,
} from "@mui/material";
import { darkTheme } from "./theme";
import { AppProvider } from "./context/AppContext";
import WidgetsContainer from "./components/WidgetsContainer";
import { scrollbarStyles } from "./theme/scrollbarStyles";

function App() {
  const theme = useTheme();

  return (
    <AppProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyles styles={scrollbarStyles(theme)} />
        <div className="App" style={{ padding: 20 }}>
          <WidgetsContainer />
        </div>
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
