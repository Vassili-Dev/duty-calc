import React, { useContext } from "react";
import SettingsContext, { DefaultPage } from "../contexts/settings";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: "4px",
//   boxShadow: 24,
//   p: 4,
// };

interface SettingsModalProps {
  isOpen: boolean;
  requestClose(): void;
}
const SettingsModal = ({ isOpen, requestClose }: SettingsModalProps) => {
  const {
    normalDutyHours,
    abnormalDutyHours,
    defaultPage,
    updateDefaultPage,
    updateAbnormalDutyHours,
    updateNormalDutyHours,
  } = useContext(SettingsContext);

  return (
    <Dialog open={isOpen} onClose={requestClose}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Normal Duty Hours"
          value={normalDutyHours}
          fullWidth
          margin="dense"
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            updateNormalDutyHours(val);
          }}
        />
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Abnormal Duty Hours"
          value={abnormalDutyHours}
          fullWidth
          margin="dense"
          onChange={(e) => {
            const val = parseInt(e.target.value) || 0;
            updateAbnormalDutyHours(val);
          }}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="default-page-select-label">Default Page</InputLabel>
          <Select
            fullWidth
            margin="dense"
            id="default-page-select"
            labelId="default-page-select-label"
            label="Default Page"
            value={defaultPage}
            onChange={(e) => {
              updateDefaultPage(e.target.value as DefaultPage);
            }}
          >
            <MenuItem value={DefaultPage.Calculator}>Duty Calculator</MenuItem>
            <MenuItem value={DefaultPage.AlarmTool}>Alarm Tool</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
