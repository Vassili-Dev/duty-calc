import React, { useContext } from "react";
// import moment from "moment";
import { Navigate } from "react-router";
import SettingsContext from "../contexts/settings";

const Home = () => {
  const { defaultPage } = useContext(SettingsContext);

  return <Navigate replace to={defaultPage} />;
};

export default Home;
