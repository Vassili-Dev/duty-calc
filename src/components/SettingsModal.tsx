import React, { useContext } from "react";
import SettingsContext from "../contexts/settings";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
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
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
