import React, { useContext } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MenuContext from "../contexts/menu";
import { Link, LinkProps } from "react-router";

const ListItemButtonLink = styled(ListItemButton)<LinkProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

const NavDrawer: React.FC = () => {
  const { menuOpen, setMenuOpen } = useContext(MenuContext) || {};

  return (
    <>
      <IconButton size="large" edge="start" aria-label="menu">
        <MenuIcon onClick={() => setMenuOpen(true)} />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButtonLink LinkComponent={Link} to="/calculator">
                <ListItemText primary={"Duty Calculator"} />
              </ListItemButtonLink>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButtonLink LinkComponent={Link} to="/alarm-tool">
                <ListItemText primary={"Alarm Tool"} />
              </ListItemButtonLink>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default NavDrawer;
