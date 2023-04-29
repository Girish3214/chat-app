import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import headerStyles from "../assets/headerStyles";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <>
      <Box sx={headerStyles.box}>
        <Container maxWidth="auto" sx={headerStyles.container}>
          <Container maxWidth="lg" sx={headerStyles.centerContainer}>
            <Typography variant="h4" sx={headerStyles.titleName}>
              <Link to={"/"}>ChatApp</Link>
            </Typography>
            <Box sx={headerStyles.menuContainer}>
              <Typography variant="h6" sx={headerStyles.menuTitles}>
                <Link to={"/login"}>Login</Link>
              </Typography>
              <Typography variant="h6" sx={headerStyles.menuTitles}>
                <Link to={"/register"}>Register</Link>
              </Typography>
            </Box>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default NavBar;
