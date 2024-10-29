import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import {SideBar} from "./sidebar/SideBar";
import Box from '@mui/material/Box';
import {Container, useMediaQuery, useTheme} from "@mui/material";
import {CustomAppBar} from "./appbar/CustomAppBar";
import PasswordChangeModal from "../components/passwordchangemodal/PasswordChangeModal";
import routes from "./RoutesList";

function Layout() {
  const mdTheme = useTheme();

  const isMobile = useMediaQuery(mdTheme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const togglePasswordChangeModal = () => {
    setOpenPasswordChangeModal(!openPasswordChangeModal);
  };

  return (
    <React.Fragment>
      {/*<ThemeProvider theme={mdTheme}>*/}
      <Box sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
        // top={0}
      >
        <CssBaseline />
        <CustomAppBar
          open={open}
          onClick={toggleDrawer}
          onPasswordChangeClick={togglePasswordChangeModal}
        />

        <PasswordChangeModal
          onClose={togglePasswordChangeModal}
          open={openPasswordChangeModal}
        />

        <SideBar
          open={open}
          onClick={toggleDrawer}
        />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            width: '100%',
            height: '100%',
          }}
        >
          <Toolbar />

          <Container
            maxWidth={false}
            sx={{
              mt: 2, ml: -1, mr: -1,
              height: '90%',
            }}
          >
            <Routes>
              {routes.map((route) => (
                <Route key={route.path}
                       path={route.path}
                       element={route.element}
                />
              ))}
              <Route path="/*" element={<Navigate to="/error" replace />} />
            </Routes>
          </Container>
        </Box>
      </Box>
      {/*</ThemeProvider>*/}
    </React.Fragment>
  );
}

export {Layout};
