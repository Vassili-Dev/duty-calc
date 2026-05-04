import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#70d4ff",
    },
    secondary: {
      main: "#F8BBD0",
    },
    background: {
      paper: "#fafcfb",
    },
    text: { primary: "#333333", secondary: "#555555", disabled: "#999999" },
  },
});

export const TimePickerSx = {
  "& .MuiClockPointer-thumb": {
    bgcolor: "secondary.main",
    borderColor: "secondary.main",
  },
  "& .MuiClockPointer-root": { bgcolor: "secondary.main" },
  "& .MuiClockNumber-root.Mui-selected": {
    bgcolor: "secondary.main",
  },
  "& .MuiClock-pin": { bgcolor: "secondary.main" },
};

export default theme;
