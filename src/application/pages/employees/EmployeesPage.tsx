import React from "react";
import EmployeeDataTable from "../../components/employee/employeedatatable/EmployeeDataTable";
import {Paper} from "@mui/material";

const EmployeesPage = () => {

  return <Paper sx={{
    height: "85%"
  }}
  >
    <EmployeeDataTable />
  </Paper>

};

export default EmployeesPage;
