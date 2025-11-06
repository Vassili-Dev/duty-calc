import { createContext } from "react";

export enum DefaultPage {
  Calculator = "/calculator",
  AlarmTool = "/alarm-tool",
}
const defaultSettings = {
  normalDutyHours: 14,
  abnormalDutyHours: 17,
  defaultPage: DefaultPage.Calculator as DefaultPage,
  updateDefaultPage: (value: DefaultPage) => {
    throw Error("Uninitalized context!");
    return value;
  },
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
