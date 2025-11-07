import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  Result,
  calculateDutyTime,
  validateForm,
} from "../utils/Calculate";
import SettingsContext from "../contexts/settings";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ResultDialogProps {
  isOpen: boolean;
  requestClose(): void;
  formData: Form;
}
const ResultDialog: React.FC<ResultDialogProps> = ({
  isOpen,
  requestClose,
  formData,
}) => {
  const [result, setResult] = useState<Result | null>(null);
  const formDataRef = useRef(formData);
  const settings = useContext(SettingsContext);
  const settingsRef = useRef(settings);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const updateResult = () => {
    const data = formDataRef.current;
    const settings = settingsRef.current;
    const valid = validateForm(data);

    if (valid) {
      const result = calculateDutyTime(data, settings);
      setResult(result);
    }
  };

  useEffect(() => {
    updateResult();
    const interval = setInterval(updateResult, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Dialog open={isOpen} onClose={requestClose}>
      <DialogTitle variant="h5">Remaining Duty Time</DialogTitle>
      <DialogContent>
        {!result && <CircularProgress />}
        {result && (
          <DialogContentText
            variant="h3"
            textAlign={"center"}
            color={result.overtime ? "error" : "success"}
          >
            {result.overtime && "-"}
            {result.durationDelta.toFormat("h:mm:ss")}
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
