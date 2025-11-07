import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import ShifterStateContext from "../contexts/shifter";
import { v4 as uuid } from "uuid";
import { Shift } from "../contexts/shifter";
import { Duration } from "luxon";

interface ShifterStateProviderProps {
  children: React.ReactNode;
}

type ActionTypes = "addShift" | "removeShift" | "hydrateShifts";
const shiftsReducer = (
  state: Shift[],
  action: { type: ActionTypes; payload?: any }
): Shift[] => {
  switch (action.type) {
    case "addShift":
      const id = uuid();
      return [...state, { ...action.payload, id }];
    case "removeShift":
      return state.filter((shift) => shift.id !== action.payload.id);
    case "hydrateShifts":
      return action.payload.map((shift: any) => ({
        ...shift,
        duration: Duration.fromISO(shift.duration),
      }));
    default:
      return state;
  }
};

const ShifterStateProvider: FunctionComponent<ShifterStateProviderProps> = ({
  children,
}) => {
  const [hydrated, setHydrated] = React.useState(false);
  const [shifts, dispatch] = useReducer(shiftsReducer, []);

  const saveSettings = useCallback(
    (changes: object) => {
      const settings = {
        shifts,
        ...changes,
      };

      localStorage.setItem("shifterState", JSON.stringify(settings));
    },
    [shifts]
  );

  useEffect(() => {
    if (hydrated) return;

    const storedSettingsString = localStorage.getItem("shifterState") || "{}";
    const storedSettings = JSON.parse(storedSettingsString) || null;

    if (storedSettings) {
      const { shifts } = storedSettings;

      dispatch({ type: "hydrateShifts", payload: shifts ?? [] });
    }

    setHydrated(true);
  }, [hydrated]);

  const addShift = (name: string, duration: Duration) => {
    dispatch({ type: "addShift", payload: { name, duration } });
  };

  const removeShift = (id: string) => {
    dispatch({ type: "removeShift", payload: { id } });
  };

  useEffect(() => {
    if (!hydrated) return;

    saveSettings({ shifts });
  }, [hydrated, shifts, saveSettings]);

  return (
    <ShifterStateContext.Provider
      value={{
        shifts,
        addShift,
        removeShift,
      }}
    >
      {children}
    </ShifterStateContext.Provider>
  );
};

export default ShifterStateProvider;
