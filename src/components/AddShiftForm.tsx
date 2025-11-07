import React, { useCallback, useMemo, useState } from "react";

import { DateTime, Duration } from "luxon";
import { Timezone } from "countries-and-timezones";
import Button from "@mui/material/Button";
import { MobileTimePicker } from "@mui/x-date-pickers";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

export interface TimezoneOption extends Timezone {
  label: string;
}

interface Props {
  onAddShift: (name: string, duration: Duration) => void;
}

const validator = ({
  shiftName,
  shiftDuration,
}: {
  shiftName: string;
  shiftDuration: Duration | null;
}) => {
  if (!shiftName || shiftName.trim() === "") {
    return false;
  }
  if (!shiftDuration || shiftDuration.as("milliseconds") === 0) {
    return false;
  }
  return true;
};
const AddShiftForm = ({ onAddShift }: Props) => {
  const [shiftName, setShiftName] = useState("");
  const [durationSign, setDurationSign] = useState<1 | -1>(1);
  const [shiftDuration, setShiftDuration] = useState<Duration | null>(null);

  const isValid = useMemo(() => {
    return validator({ shiftName, shiftDuration });
  }, [shiftName, shiftDuration]);

  const addShift = useCallback(() => {
    onAddShift(
      shiftName,
      durationSign === 1 ? shiftDuration! : shiftDuration!.negate()
    );
    setShiftName("");
    setShiftDuration(null);
  }, [shiftName, shiftDuration, durationSign, onAddShift]);

  return (
    <form onSubmit={addShift} id="add-shift-form">
      <Stack spacing={1}>
        <Stack spacing={2} direction="row">
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={() => setDurationSign((durationSign * -1) as 1 | -1)}
            >
              {durationSign === 1 ? <AddIcon /> : <MinusIcon />}
            </IconButton>
            <MobileTimePicker
              label="Offset Duration"
              ampmInClock={false}
              ampm={false}
              value={
                shiftDuration
                  ? DateTime.now().set({
                      hour: shiftDuration.hours,
                      minute: shiftDuration.minutes,
                    })
                  : null
              }
              onChange={(newValue) => {
                if (newValue) {
                  setShiftDuration(
                    Duration.fromObject({
                      hours: newValue.get("hour"),
                      minutes: newValue.get("minute"),
                    })
                  );
                }
              }}
            />
          </Stack>
          <TextField
            label="Offset Name"
            fullWidth
            margin="dense"
            id="shift-name-input"
            value={shiftName}
            onChange={(e) => setShiftName(e.target.value)}
          />
        </Stack>
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid}
          onClick={addShift}
        >
          Add Offset
        </Button>
      </Stack>
    </form>
  );
};

export default AddShiftForm;
