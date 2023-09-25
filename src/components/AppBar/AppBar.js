import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { MUIToolbar } from "../MUI/MUIComponents";

const pages = ["Vulnerability management", "Tidelift", "Partner 2"];

function ResponsiveAppBar(props) {
  const { handleAppBarActionNames } = props;

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const onClickPages = (pageName) => {
    handleAppBarActionNames(pageName);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <MUIToolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => onClickPages(page)}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => onClickPages("Vulnerability management")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Vulnerability management
            </Button>
            <Button
              onClick={() => onClickPages("Tidelift")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <img
                alt="Tidelift"
                src="https://4008838.fs1.hubspotusercontent-na1.net/hubfs/4008838/website/logos/Tidelift-logo-on-light.svg"
                style={{width: '25mm'}}
              />
            </Button>
            <Button
              onClick={() => onClickPages("Partner 2")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Partner 2
            </Button>
          </Box>
        </MUIToolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
