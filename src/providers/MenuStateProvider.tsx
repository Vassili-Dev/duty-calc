import React, { FunctionComponent, useState } from "react";
import MenuStateContext from "../contexts/menu";

interface MenuStateProviderProps {
  children: React.ReactNode;
}

const MenuStateProvider: FunctionComponent<MenuStateProviderProps> = ({
  children,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <MenuStateContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </MenuStateContext.Provider>
  );
};
export default MenuStateProvider;
