import { createContext } from "react";

export enum DefaultPage {
  Calculator = "/calculator",
  AlarmTool = "/alarm-tool",
}
const defaultSettings = {
  normalDutyHours: 14,
  abnormalDutyHours: 17,
  defaultPage: DefaultPage.Calculator as DefaultPage,
  updateDefaultPage: (_value: DefaultPage): void => {
    throw Error("Uninitalized context!");
  },
  updateNormalDutyHours: (_value: number): void => {
    throw Error("Uninitalized context!");
  },
  updateAbnormalDutyHours: (_value: number): void => {
    throw Error("Uninitalized context!");
  },
};

export type Settings = typeof defaultSettings;

const SettingsContext = createContext(defaultSettings);

export default SettingsContext;
