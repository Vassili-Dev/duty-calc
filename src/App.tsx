import React, { useCallback, useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Calculator from "./pages/Calculator";
import SettingsModal from "./components/SettingsModal";
import SettingsProvider from "./providers/SettingsProvider";
import MenuStateProvider from "./providers/MenuStateProvider";
import { Box } from "@mui/material";

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Shifter from "./pages/Shifter";

import "./App.css";
import TitleProvider from "./providers/TitleProvider";
import AppHeader from "./components/AppHeader";

const theme = createTheme({
  palette: {
    primary: {
      main: "#70d4ff",
    },
    secondary: {
      main: "#ff00c7",
    },
    text: { primary: "#333333", secondary: "#555555", disabled: "#999999" },
  },
});

function App() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const openSettingsModal = useCallback(() => {
    setSettingsModalOpen(true);
  }, []);
  const closeSettingsModal = useCallback(() => {
    setSettingsModalOpen(false);
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <TitleProvider>
          <div className="App">
            <SettingsProvider>
              <MenuStateProvider>
                <AppHeader openSettingsModal={openSettingsModal} />
                <Box component={"main"} sx={{ pt: 15 }}>
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="/alarm-tool" element={<Shifter />} />
                  </Routes>
                </Box>
                <SettingsModal
                  isOpen={settingsModalOpen}
                  requestClose={closeSettingsModal}
                />
              </MenuStateProvider>
            </SettingsProvider>
          </div>
        </TitleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
