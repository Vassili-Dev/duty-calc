import { useState, useContext, useEffect } from "react";

import { DateTime } from "luxon";
import { LocalizationProvider, StaticTimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import AddShiftForm from "../components/AddShiftForm";
import ShifterStateContext from "../contexts/shifter";
import ShifterStateProvider from "../providers/ShifterStateProvider";
import TimeShiftDisplay from "../components/TimeShiftDisplay";
import TitleContext from "../contexts/title";
import { TimePickerSx } from "../theme";

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
        <StaticTimePicker
          sx={TimePickerSx}
          value={time}
          ampmInClock={false}
          ampm={false}
          slotProps={{
            actionBar: { actions: ["clear"], disableSpacing: true },
          }}
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

        <AddShiftForm onAddShift={addShift} />
      </Stack>
    </Container>
  );
};

export default Shifter;
