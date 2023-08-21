import { createContext } from "react";

const defaultSettings = {
  normalDutyHours: 14,
  abnormalDutyHours: 17,
  updateNormalDutyHours: (value: number) => {
    throw Error("Uninitalized context!");
    return value;
  },
  updateAbnormalDutyHours: (value: number) => {
    throw Error("Uninitalized context!");
    return value;
  },
};

export type Settings = typeof defaultSettings;

const SettingsContext = createContext(defaultSettings);

export default SettingsContext;
