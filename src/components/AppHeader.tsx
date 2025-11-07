import { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";

import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

import NavDrawer from "./NavDrawer";
import TitleContext from "../contexts/title";

import { ReactComponent as Logo } from "../Plane.svg";

interface Props {
  openSettingsModal: () => void;
}
const AppHeader = ({ openSettingsModal }: Props) => {
  const { title } = useContext(TitleContext);
  return (
    <AppBar>
      <Toolbar>
        <NavDrawer />
        <SvgIcon
          component={Logo}
          inheritViewBox
          color="action"
          sx={{
            fontSize: "3rem",
            flexGrow: { xs: 1, sm: 0 },
            marginLeft: { xs: "2rem", sm: "0" },
          }}
        />
        <Typography
          color="#000000AA"
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          {title}
        </Typography>
        <IconButton onClick={openSettingsModal}>
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
