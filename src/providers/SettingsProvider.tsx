import React, { FunctionComponent, useEffect, useState } from "react";
import SettingsContext from "../contexts/settings";
import { Settings } from "@mui/icons-material";
import { JsxElement } from "typescript";

const DEFAULT_NORMAL_DUTY_HOURS = 14;
const DEFAULT_ABNORMAL_DUTY_HOURS = 17;

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsProvider: FunctionComponent<SettingsProviderProps> = ({
  children,
}) => {
  const [normalDutyHours, setNormalDutyHours] = useState(
    DEFAULT_NORMAL_DUTY_HOURS
  );
  const [abnormalDutyHours, setAbnormalDutyHours] = useState(
    DEFAULT_ABNORMAL_DUTY_HOURS
  );

  const saveSettings = (changes: object) => {
    const settings = { normalDutyHours, abnormalDutyHours, ...changes };

    localStorage.setItem("settings", JSON.stringify(settings));
  };

  useEffect(() => {
    const storedSettingsString = localStorage.getItem("settings") || "{}";
    const storedSettings = JSON.parse(storedSettingsString) || null;

    if (storedSettings) {
      const { normalDutyHours = 14, abnormalDutyHours = 17 } = storedSettings;

      setNormalDutyHours(normalDutyHours);
      setAbnormalDutyHours(abnormalDutyHours);
    }
  }, []);

  const updateNormalDutyHours = (newValue: number) => {
    setNormalDutyHours(newValue);
    saveSettings({ normalDutyHours: newValue });

    return newValue;
  };

  const updateAbnormalDutyHours = (newValue: number) => {
    setAbnormalDutyHours(newValue);
    saveSettings({ abnormalDutyHours: newValue });

    return newValue;
  };

  return (
    <SettingsContext.Provider
      value={{
        normalDutyHours,
        abnormalDutyHours,
        updateNormalDutyHours,
        updateAbnormalDutyHours,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
