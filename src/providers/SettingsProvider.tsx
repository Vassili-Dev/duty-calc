import React, { FunctionComponent, useEffect, useState } from "react";
import SettingsContext, { DefaultPage } from "../contexts/settings";

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
  const [defaultPage, setDefaultPage] = useState<DefaultPage>(
    DefaultPage.Calculator
  );

  const saveSettings = (changes: object) => {
    const settings = {
      normalDutyHours,
      abnormalDutyHours,
      defaultPage,
      ...changes,
    };

    localStorage.setItem("settings", JSON.stringify(settings));
  };

  useEffect(() => {
    const storedSettingsString = localStorage.getItem("settings") || "{}";
    const storedSettings = JSON.parse(storedSettingsString) || null;

    if (storedSettings) {
      const {
        normalDutyHours = 14,
        abnormalDutyHours = 17,
        defaultPage = DefaultPage.Calculator,
      } = storedSettings;

      setNormalDutyHours(normalDutyHours);
      setAbnormalDutyHours(abnormalDutyHours);
      setDefaultPage(defaultPage);
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

  const updateDefaultPage = (newValue: DefaultPage) => {
    setDefaultPage(newValue);
    saveSettings({ defaultPage: newValue });

    return newValue;
  };

  return (
    <SettingsContext.Provider
      value={{
        normalDutyHours,
        abnormalDutyHours,
        defaultPage,
        updateDefaultPage,
        updateNormalDutyHours,
        updateAbnormalDutyHours,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
