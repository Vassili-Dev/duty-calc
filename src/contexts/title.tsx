import { createContext } from "react";

const defaultTitleState = {
  title: "Duty Calculator",
  setTitle: (_value: string): void => {
    throw Error("Uninitalized context!");
  },
};

export type TitleState = typeof defaultTitleState;

const TitleContext = createContext(defaultTitleState);

export default TitleContext;
