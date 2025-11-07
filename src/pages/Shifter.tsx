import { useState, useContext, useEffect } from "react";

import { DateTime } from "luxon";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import AddShiftForm from "../components/AddShiftForm";
import ShifterStateContext from "../contexts/shifter";
import ShifterStateProvider from "../providers/ShifterStateProvider";
import TimeShiftDisplay from "../components/TimeShiftDisplay";
import TitleContext from "../contexts/title";

const Shifter = () => {
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    setTitle("Alarm Tool");
  }, [setTitle]);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ShifterStateProvider>
        <Inner />
      </ShifterStateProvider>
    </LocalizationProvider>
  );
};
const Inner = () => {
  const { shifts, addShift, removeShift } = useContext(ShifterStateContext);
  const [time, setTime] = useState<DateTime | null>(null);
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <MobileTimePicker
          label="Time"
          value={time}
          ampmInClock={false}
          ampm={false}
          onChange={setTime}
        />
        {shifts && (
          <TimeShiftDisplay
            timeShifts={shifts.sort((a, b) =>
              a.duration > b.duration ? 1 : -1
            )}
            time={time!}
            removeShift={removeShift}
          />
        )}

        <Divider />
        <AddShiftForm onAddShift={addShift} />
      </Stack>
    </Container>
  );
};

export default Shifter;
