import { Duration } from "luxon";
import { createContext } from "react";

export interface Shift {
  id: string;
  name: string;
  duration: Duration;
}

const initialShifterState = {
  shifts: [] as Shift[],
  addShift: (name: string, duration: Duration): void => {
    throw Error("Uninitalized context!");
  },
  removeShift: (id: string): void => {
    throw Error("Uninitalized context!");
  },
};

export type ShifterState = typeof initialShifterState;

const ShifterStateContext = createContext(initialShifterState);

export default ShifterStateContext;
