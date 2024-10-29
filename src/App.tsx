import React, {useState} from 'react'
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import LoginPage from './application/pages/login/LoginPage'
import UserContext from './domain/contexts/user/UserContext'
import {Layout} from "./application/layout/Layout";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "@mui/material";
import MenuPage from "./application/pages/menu/MenuPage";
import Error from "./application/pages/error/Error";
import SalesProvider from "./domain/contexts/sales/SalesProvider";

interface PrivateRouteProps {
  isAuthenticated: boolean;
  redirectPath?: string;
  outlet: JSX.Element;
  children?: React.ReactNode;
}

function App() {
  const auth = localStorage.getItem('token');
  const initialIsAuthenticated = !!auth;
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);

  const defaultProtectedRouteProps = {
    isAuthenticated: isAuthenticated,
    redirectPath: "/",
    outlet: <Outlet />,
  };
  const theme = createTheme();

  function PrivateRoute({isAuthenticated, redirectPath, outlet}: PrivateRouteProps) {
    if (isAuthenticated) {
      return outlet;
    } else {
      return <Navigate to={{pathname: redirectPath}} />;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" autoClose={3000} />
      <UserContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <SalesProvider>
          <Router>
            <Routes>
              <Route path="/"
                     element={<LoginPage />}
              />
              <Route path="/*"
                     element={<PrivateRoute
                       {...defaultProtectedRouteProps}
                       outlet={<Layout />}
                     />}
              />
              <Route path="/akorno/menu" element={<div style={{height: '100vh'}}><MenuPage /></div>} />
              <Route key={"error"} path={"/error"} element={<Error />} />
              {/*path: '/menu', element: <MenuPage />, toast: "Yum Yum", name: "Today's Menu", icon: <LayersIcon />*/}
            </Routes>
          </Router>
        </SalesProvider>
      </UserContext.Provider>
    </ThemeProvider>
  );

}

export default App;
