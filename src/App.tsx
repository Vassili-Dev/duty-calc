import React, { useState } from "react";
import { ReactComponent as Logo } from "./Plane.svg";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calculator from "./pages/Calculator";
import SettingsModal from "./components/SettingsModal";
import NavDrawer from "./components/NavDrawer";

import SettingsProvider from "./providers/SettingsProvider";
import MenuStateProvider from "./providers/MenuStateProvider";
import {
  AppBar,
  Box,
  IconButton,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Shifter from "./pages/Shifter";

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
            <MenuStateProvider>
              <AppBar>
                <Toolbar>
                  <NavDrawer />
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
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/alarm-tool" element={<Shifter />} />
                </Routes>
              </Box>
              <SettingsModal
                isOpen={settingsModalOpen}
                requestClose={() => setSettingsModalOpen(false)}
              />
            </MenuStateProvider>
          </SettingsProvider>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
