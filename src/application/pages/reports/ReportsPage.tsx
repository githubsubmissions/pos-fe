import React, {useEffect, useState} from "react";
import {BsPrinter} from "react-icons/bs";
import FormControl from "@mui/material/FormControl";
import Employee from "../../../domain/entities/Employee";
import MenuItem from "@mui/material/MenuItem";
import {ReportResponse} from "../../../domain/responses/ReportResponse";
import {useNavigate} from "react-router-dom";
import DateTimePicker from "../../components/reusable/datetime/DateTime";
import {Grid, Paper, Theme, useMediaQuery} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {FetchReportRequest} from "../../../domain/requests/FetchReportRequest";
import TextField from "@mui/material/TextField";
import CurrencyFormatterServiceImpl from "../../../domain/services/CurrencyFormatterServiceImpl";
import {PaymentMethod} from "../../../domain/enums/PaymentMethod";
import ReportDataTable from "../../components/report/reportdatatable/ReportDataTable";
import {toast} from "react-toastify";
import LoadingButton from "../../components/reusable/LoadingButton";
import container from "../../../container";
import EmployeeRepository from "../../../domain/repositories/EmployeeRepository";
import {PrintService} from "../../../domain/services/PrintService";
import ReportRepository from "../../../domain/repositories/ReportRepository";

const ReportsPage = () => {
  const navigate = useNavigate();
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');
  const printService = container.resolve<PrintService>('PrintService');
  const employeeRepository = container.resolve<EmployeeRepository>('EmployeeRepository');
  const reportRepository = container.resolve<ReportRepository>('ReportRepository');

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('CASH');
  const [selectedEmployee, setSelectedEmployee] = useState(localStorage.getItem("email"));
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setHours(2)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [reportResponse, setReportResponse] = useState<ReportResponse | null>(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const [reportRequest, setReportRequest] = useState<FetchReportRequest>();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [fetchLoading, setFetchLoadingProgress] = useState(false);
  const [printLoading, setPrintLoadingProgress] = useState(false);

  useEffect(() => {
    getEmployeesData();
  }, []);

  const getEmployeesData = () => {
    employeeRepository.getAllEmployees()
      .then((data: Employee[]) => {
        setEmployeesData(data);
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  const handleChange = (event: any) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const getMail = (event: any) => {
    setSelectedEmployee(event.target.value);
  };

  function startDateChangeHandler(date: Date) {
    setStartDate(new Date(date));
  }

  function endDateChangeHandler(date: Date) {
    setEndDate(new Date(date));
  }

  function printReportHandler() {
    setPrintLoadingProgress(true);
    if (!reportResponse?.report.employees) {
      toast.error("You must fetch some data first.");
      return;
    }
    if (reportResponse.report.employees.length < 1) {
      toast.warning("No data found!");
      return;
    }
    printService.printReport(reportRequest, reportResponse);
    setPrintLoadingProgress(false);
  }

  const getReport = (/*event: React.FormEvent*/) => {  // INFO just here because i need to under React.FormEvent
    setFetchLoadingProgress(true)
    const fetchReportRequest = {
      email: selectedEmployee,
      startDate: startDate,
      endDate: endDate,
      paymentMethod: selectedPaymentMethod,
    };

    setReportRequest(fetchReportRequest);

    reportRepository.fetchReport(fetchReportRequest)
      .then((response: ReportResponse) => {
        setGrandTotal(response.report.grandTotal);
        setReportResponse(response);
        setTimeout(() => {
          setFetchLoadingProgress(false);
        }, 2000);
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  function getEmployeesMenuItemList() {
    let employees = [
      <MenuItem value="all" key={-1}>
        <em>All</em>
      </MenuItem>
    ];

    employees.push(...employeesData.map((employee) =>
      <MenuItem key={employee.id} value={employee.email}>
        {employee.userDo.firstname} {employee.userDo.lastname}
      </MenuItem>
    ));
    return employees
  }

  function getPaymentMethodsMenuItemList() {
    let paymentMethods = [
      <MenuItem value="all" key={-1}>
        <em>All</em>
      </MenuItem>
    ];
    paymentMethods.push(...Object.entries(PaymentMethod).map(([key, value]) =>
      <MenuItem key={key} value={key}>
        {value}
      </MenuItem>
    ));
    return paymentMethods;
  }

  let containerHeight;
  if (isMobile) {
    containerHeight = "25%";
  } else {
    containerHeight = "20%";
  }

  return (
    <React.Fragment>

      <Paper
        sx={{height: "86%"}}
      >
        <Grid container
              spacing={1}
              justifyContent={"space-around"}
          // sx={{height: containerHeight}}
        >
          <Grid item xs={6} md={4} lg={2}>
            <TextField label="Employee"
                       name='Employee'
                       fullWidth
                       select
                       focused
                       color="primary"
                       value={selectedEmployee ?? ""}
                       onChange={getMail}
                       InputProps={{style: {height: '43px'}}}
            >
              {getEmployeesMenuItemList()}
            </TextField>
          </Grid>

          <Grid item xs={6} md={4} lg={2}>

            <TextField label="Payment Method"
                       name='payment_method'
                       fullWidth
                       select
                       focused
                       color="primary"
                       value={selectedPaymentMethod}
                       onChange={handleChange}
                       InputProps={{style: {height: '43px'}}}
            >
              {getPaymentMethodsMenuItemList()}
            </TextField>
          </Grid>

          <Grid item xs={6} md={4} lg={2}>
            <FormControl fullWidth sx={{height: "20px"}}>
              <DateTimePicker
                text="Start Date"
                date={startDate}
                onChange={startDateChangeHandler}
                required
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} md={4} lg={2}>
            <FormControl fullWidth>
              <DateTimePicker
                text="End Date"
                date={endDate}
                onChange={endDateChangeHandler}
                required
                fullWidth
                style={{height: '48px'}}
              />
            </FormControl>

          </Grid>

          <Grid item xs={6} md={4} lg={2}>
            <LoadingButton spinnerLoading={fetchLoading}
                           endIcon={<SendIcon />}
                           size="large"
                           variant="contained"
                           color="warning"
                           onClick={getReport}
                           fullWidth
            >
              Fetch
            </LoadingButton>
          </Grid>

          <Grid item xs={6} md={4} lg={2}>
            <LoadingButton fullWidth
                           spinnerLoading={printLoading}
                           size="large"
                           variant="contained"
                           color="success"
                           endIcon={<BsPrinter />}
                           onClick={printReportHandler}
            >
              Print
            </LoadingButton>
          </Grid>

        </Grid>

        <Grid container spacing={3} justifyContent={"space-around"}
              sx={{height: 100 - parseInt(containerHeight.replace("%", "")) + '%'}}
        >
          <Grid item xs={12}>
            <br />
            <ReportDataTable grandTotal={grandTotal} responseData={reportResponse} />
          </Grid>
        </Grid>
      </Paper>

      <iframe
        title={"Print Cart"}
        id="reports_to_print"
        style={{height: "0", width: "0", position: "absolute"}}
      />
    </React.Fragment>
  );
};

export default ReportsPage;
