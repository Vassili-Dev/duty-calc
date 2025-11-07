import React, { useState } from "react";

import { DateTime } from "luxon";
import { LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton } from "@mui/material";
import AddShiftForm from "../components/AddShiftForm";
import ShifterStateContext from "../contexts/shifter";
import ShifterStateProvider from "../providers/ShifterStateProvider";

const Shifter = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ShifterStateProvider>
        <Inner />
      </ShifterStateProvider>
    </LocalizationProvider>
  );
};
const Inner = () => {
  const { shifts, addShift, removeShift } =
    React.useContext(ShifterStateContext);
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
        {shifts &&
          shifts
            .sort((a, b) => (a.duration > b.duration ? 1 : -1))
            .map((shift) => (
              <Stack
                key={shift.id}
                direction="row"
                spacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <span>
                  {time ? time?.plus(shift.duration).toFormat("HH:mm") : null}
                </span>
                <div>
                  <span>
                    {shift.name}&nbsp;[
                    {shift.duration.toFormat("hh:mm", {
                      signMode: "negativeLargestOnly",
                    })}
                    ]
                  </span>
                  <IconButton onClick={() => removeShift(shift.id)}>
                    <CloseIcon color="error" />
                  </IconButton>
                </div>
              </Stack>
            ))}
        <Divider />
        <AddShiftForm onAddShift={addShift} />
      </Stack>
    </Container>
  );
};

export default Shifter;
