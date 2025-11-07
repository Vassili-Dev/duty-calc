import React, { FunctionComponent, useState } from "react";
import TitleContext from "../contexts/title";

interface TitleProviderProps {
  children: React.ReactNode;
}

const TitleProvider: FunctionComponent<TitleProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>("Duty Calculator");

  return (
    <TitleContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </TitleContext.Provider>
  );
};
export default TitleProvider;
