import { createContext } from "react";

const defaultMenuState = {
  menuOpen: false,
  setMenuOpen: (_value: boolean): void => {
    throw Error("Uninitalized context!");
  },
};

export type MenuState = typeof defaultMenuState;

const MenuContext = createContext(defaultMenuState);

export default MenuContext;
