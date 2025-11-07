import React, { useContext, useEffect, useState } from "react";
// import moment from "moment";
import { DateTime } from "luxon";
import { Timezone, getAllTimezones } from "countries-and-timezones";
import Button from "@mui/material/Button";
import {
  MobileDateTimePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Switch } from "@mui/material";

import { validateForm } from "../utils/Calculate";
import ResultDialog from "../components/ResultDialog";
import TitleContext from "../contexts/title";

export interface TimezoneOption extends Timezone {
  label: string;
}

const Calculator = () => {
  const { setTitle } = useContext(TitleContext);
  const tzs = Object.values(getAllTimezones())
    .map((tz) => ({
      ...tz,
      label: `(UTC${DateTime.now().setZone(tz.name).toFormat("Z")}) ${tz.name}`,
    }))
    .sort((a, b) => (a.utcOffset > b.utcOffset ? 1 : -1));
  const currentTz = DateTime.now().zoneName || "";
  const matchingTimeZones = tzs.filter((tz) => tz.name === (currentTz || ""));

  const [startTime, setStartTime] = useState<DateTime | null>(null);
  const [startTimezone, setStartTimezone] = useState<TimezoneOption | null>(
    matchingTimeZones[0]
  );
  const [flightTime, setFlightTime] = useState<DateTime | null>(null);
  const [useAbnormal, setUseAbnormal] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setTitle("Duty Calculator");
  }, [setTitle]);

  const AbnormalSwitch = (
    <Switch
      checked={useAbnormal}
      onChange={(e) => {
        setUseAbnormal(e.target.checked);
      }}
    />
  );
  const formValues = {
    startTime,
    startTimezone,
    flightTime,
    useAbnormal,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <MobileDateTimePicker
            label="Start Time"
            value={startTime}
            ampmInClock={false}
            ampm={false}
            onChange={setStartTime}
          />
          <Autocomplete
            options={tzs}
            getOptionLabel={(option) => option.label}
            value={startTimezone}
            onChange={(_, newValue) => {
              setStartTimezone(newValue);
            }}
            isOptionEqualToValue={(opt, val) => opt.name === val.name}
            renderInput={(params) => (
              <TextField {...params} label="Start Timezone" />
            )}
          />

          <MobileTimePicker
            label="Flight Time"
            value={flightTime}
            onChange={setFlightTime}
            ampm={false}
            ampmInClock={false}
          />
          <FormControlLabel
            control={AbnormalSwitch}
            label="Unforseen Circumstances"
          />

          <Button
            disabled={!validateForm(formValues)}
            onClick={() => {
              setShowResult(true);
            }}
            variant="contained"
          >
            Calculate
          </Button>
        </Stack>
      </Container>
      <ResultDialog
        isOpen={showResult}
        requestClose={() => {
          setShowResult(false);
        }}
        formData={formValues}
      />
    </LocalizationProvider>
  );
};

export default Calculator;
