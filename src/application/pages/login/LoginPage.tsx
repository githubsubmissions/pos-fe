import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import UserContext from "../../../domain/contexts/user/UserContext";
import Employee from "../../../domain/entities/Employee";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {toast} from "react-toastify";
import container from "../../../container";
import EmployeeRepository from "../../../domain/repositories/EmployeeRepository";
import AuthRepository from "../../../domain/repositories/AuthRepository";
import {Tax, TaxNew} from "../../../domain/entities/Tax";
import TaxRepository from "../../../domain/repositories/TaxRepository";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();
  let {setIsAuthenticated} = useContext(UserContext);
  const employeeRepository = container.resolve<EmployeeRepository>('EmployeeRepository');
  const authRepository = container.resolve<AuthRepository>('AuthRepository');
  const taxRepository = container.resolve<TaxRepository>('TaxRepository');

  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [email, setEmail] = useState<string>("delcoker@live.ca");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getLoginEmployees();
  }, [])

  const getLoginEmployees = () => {
    employeeRepository.getLoginEmployees()
      .then((employees: Employee[]) => {
        setEmployeeList(employees);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  const renderUsers = () => {
    if (employeeList && employeeList.length > 0) {
      return (
        employeeList.map((employee) => {
          if (!employee) return null;
          if (!employee.userDo) return null;
          return (
            <MenuItem
              value={employee.email}
              key={employee.email}
            >
              {employee.userDo.firstname + " " + employee.userDo.lastname}
            </MenuItem>
          );
        })
      )
    }
    return (
      <MenuItem value={"User"}
                disabled
                hidden>
        Username
      </MenuItem>);
  };

  const handleEmployeeSelect = (e: any) => {
    const {value} = e.target;
    setEmail(value);
  }

  const handlePassword = (e: any) => {
    const {value} = e.target;
    setPassword(value);
  }

  const getNewTaxes = () => {
    taxRepository.fetchNewTaxes()
      .then((taxes: TaxNew[]) => {

        localStorage.setItem('taxes', JSON.stringify(taxes))
        // localStorage.setItem('taxArray', JSON.stringify(taxes)) // FIXME do I need for new taxes?
        // setTaxesNew(taxes);})
        // .catch(error => {

      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  const getTaxes = () => {
    taxRepository.getTaxes()
      .then((taxes: Tax) => {
        localStorage.setItem('taxes', JSON.stringify(['VAT'])) // FIXME HACK
        // localStorage.setItem('taxes', JSON.stringify(Object.keys(taxes)))
        // localStorage.setItem('taxArray', JSON.stringify(taxes)) // FIXME do I need for new taxes?
        // setTaxesNew(taxes);})
        // .catch(error => {

      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!(email && password)) {
      toast.error("No email or no password")
      return;
    }

    setLoading(true);

    try {
      await authRepository.login({email: email, password: password});
      toast.success('Woezɔ̃');
      setIsAuthenticated(true);
      // getNewTaxes(); // FIXME use for new taxes
      getTaxes();
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password")
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {process.env.REACT_APP_COMPANY_NAME}
          </Typography>
          {/*<Typography component="h1" variant="h5">*/}
          {/*  Sign in*/}
          {/*</Typography>*/}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Name</InputLabel>
              <Select labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={email}
                      label="Age"
                      onChange={handleEmployeeSelect}
              >
                {renderUsers()}
              </Select>
            </FormControl>

            <TextField margin="normal"
                       required
                       fullWidth
                       id="email"
                       label="Email Address"
                       name="email"
                       autoComplete="email"
                       autoFocus
                       aria-readonly={true}
                       disabled
                       value={email}
                       placeholder='delcoker@live.ca'
            />
            <TextField margin="normal"
                       required
                       fullWidth
                       name="password"
                       label="Password"
                       type="password"
                       id="password"
                       autoComplete="current-password"
                       placeholder={"password"}
                       onChange={handlePassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              size="large"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                'Sign In'
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{mt: 8, mb: 4}} />
      </Container>
    </ThemeProvider>
  );
}
