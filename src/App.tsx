import React, { useState } from "react";
import { ReactComponent as Logo } from "./Plane.svg";

import CssBaseline from "@mui/material/CssBaseline";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calculator from "./components/Calculator";
import SettingsModal from "./components/SettingsModal";

import SettingsProvider from "./providers/SettingsProvider";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Modal,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0fc3ff",
    },
    secondary: {
      main: "#ff00c7",
    },
  },
});

function App() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="App">
          <SettingsProvider>
            <AppBar>
              <Toolbar>
                <SvgIcon
                  component={Logo}
                  inheritViewBox
                  color="secondary"
                  sx={{
                    fontSize: "3rem",
                    flexGrow: { xs: 1, sm: 0 },
                    marginLeft: { xs: "2rem", sm: "0" },
                  }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  Duty Time Calculator
                </Typography>
                <IconButton onClick={() => setSettingsModalOpen(true)}>
                  <SettingsIcon color="secondary" />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box component={"main"} sx={{ pt: 15 }}>
              <Calculator />
            </Box>
            <SettingsModal
              isOpen={settingsModalOpen}
              requestClose={() => setSettingsModalOpen(false)}
            />
          </SettingsProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
