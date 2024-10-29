import React, {ReactElement} from 'react';
import Dashboard from "../pages/dashboard/Dashboard";
import Logout from "../pages/logout/Logout";
import SalesPage from "../pages/sales/SalesPage";
import ReportsPage from "../pages/reports/ReportsPage";
import ItemsPage from "../pages/items/ItemsPage";
import EmployeesPage from "../pages/employees/EmployeesPage";
import CategoryPage from "../pages/categories/CategoryPage";
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {CategorySharp, ListAltTwoTone, LogoutOutlined} from "@mui/icons-material";
import MenuPage from "../pages/menu/MenuPage";

export interface Route {
  path: string;
  element: ReactElement;
  toast?: string;
  name: string;
  icon: ReactElement;
}

const routes: Route[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    toast: "Discover interesting stats right here",
    name: "Dashboard",
    icon: <BarChartIcon />
  },
  {
    path: "/sales",
    element: <SalesPage />,
    toast: "Sales at your fingertips",
    name: "Sell",
    icon: <ShoppingCartIcon />
  },
  {path: '/reports', element: <ReportsPage />, toast: "Look out", name: "Reports", icon: <AssignmentIcon />},
  {path: '/items', element: <ItemsPage />, toast: "Find out", name: "Items", icon: <ListAltTwoTone />},
  {path: '/item/categories', element: <CategoryPage />, name: "Categories", icon: <CategorySharp />},
  {path: '/employees', element: <EmployeesPage />, toast: "People", name: "Employees", icon: <PeopleIcon />},
  {path: '/menu', element: <MenuPage />, toast: "Yum Yum", name: "Today's Menu", icon: <LayersIcon />},
  {path: '/logout', element: <Logout />, toast: "Bye Bye", name: "Logout", icon: <LogoutOutlined />},
];

export default routes;
