import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { Shift } from "../contexts/shifter";
import { DateTime } from "luxon";
import { Chip, IconButton } from "@mui/material";

interface Props {
  timeShifts: Shift[];
  time: DateTime;
  removeShift?: (id: string) => void;
}

const TimeShiftDisplay: React.FC<Props> = ({
  timeShifts,
  time,
  removeShift,
}) => {
  return (
    <List>
      {timeShifts.map((shift) => (
        <TimeShiftItem
          key={shift.id}
          shift={shift}
          time={time}
          removeShift={removeShift}
        />
      ))}
    </List>
  );
};

const TimeShiftItem: React.FC<{
  shift: Shift;
  time: DateTime;
  removeShift?: (id: string) => void;
}> = ({ shift, time, removeShift }) => {
  return (
    <>
      <Divider textAlign="left" component="li">
        <Chip
          label={shift.duration.toFormat("hh:mm", {
            signMode: "negativeLargestOnly",
          })}
          size="small"
        />
      </Divider>
      <ListItem
        secondaryAction={
          <IconButton color="error" onClick={() => removeShift?.(shift.id)}>
            <CloseIcon />
          </IconButton>
        }
      >
        <ListItemText secondary={shift.name} />
        <ListItemText
          primary={time ? time.plus(shift.duration).toFormat("HH:mm") : null}
        />
      </ListItem>
    </>
  );
};
export default TimeShiftDisplay;
