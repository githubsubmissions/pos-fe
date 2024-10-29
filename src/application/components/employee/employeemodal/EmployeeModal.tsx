import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid, MenuItem, Slide} from '@mui/material';
import {TransitionProps} from "@mui/material/transitions";
import Employee from "../../../../domain/entities/Employee";
import {Status} from "../../../../domain/enums/Status";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import container from "../../../../container";
import EmployeeRepository from "../../../../domain/repositories/EmployeeRepository";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EmployeeModal(props: {
  onClose: () => void;
  open: boolean;
  dialogOperation: string;
  editData: any;
  onSave: () => void;
}) {
  const navigate = useNavigate();
  const employeeRepository = container.resolve<EmployeeRepository>('EmployeeRepository');

  const {open, onClose, dialogOperation, editData, onSave} = props;
  const addColor = "success";
  const editColor = "warning";
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  }

  const handleEmployeeOperation = (e: React.FormEvent<HTMLFormElement>) => {
    const employeeDetails = {
      id: editData?.id,
      email: e.currentTarget.email.value,
      employeeId: "Employee ID",
      firstname: e.currentTarget.firstname.value,
      lastname: e.currentTarget.lastname.value,
      status: e.currentTarget.status.value,
      telephone: e.currentTarget.phone.value,
      userRole: {id: e.currentTarget.user_role.value}
    }

    let request;

    if (dialogOperation === 'add') {
      const emailError = validateEmail(employeeDetails.email);
      if (emailError) {
        setEmailError(emailError);
        return;
      }

      request = employeeRepository.addEmployee(employeeDetails)
    } else if (dialogOperation === 'edit') {
      request = employeeRepository.updateEmployee(employeeDetails)
    }

    if (!request) {
      return;
    }

    request.then((res: Employee) => {
      toast.success(`${res.userDo.firstname} ${dialogOperation}ed.`);
      onSave(); // TODO use response data rather than reload
      onClose();
    })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  }

  return (
    <React.Fragment>
      <Dialog open={open}
              onClose={onClose}
              TransitionComponent={Transition}
              fullWidth
              maxWidth='md'
      >
        <DialogTitle>{dialogOperation.toUpperCase()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`${dialogOperation.charAt(0).toUpperCase()}${dialogOperation.substring(1)}`} an employee.
          </DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {md: 1},
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleEmployeeOperation(e);
            }}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Email"
                           type="email"
                           variant="filled"
                           name="email"
                           fullWidth focused
                           disabled={dialogOperation === "edit"}
                           color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={(dialogOperation === "edit") ? editData?.email : ""}
                           error={Boolean(emailError)}
                           helperText={emailError}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Telephone" focused fullWidth
                           type="tel"
                           variant="filled"
                           name="phone"
                           color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={(dialogOperation === "edit") ? editData?.userDo.telephone : ""}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="First Name"
                           name="firstname"
                           fullWidth focused
                           variant="filled"
                           color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={(dialogOperation === "edit") ? editData?.userDo.firstname : ""}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Last Name"
                           name="lastname"
                           fullWidth focused
                           variant="filled"
                           color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={(dialogOperation === "edit") ? editData?.userDo.lastname : ""}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Status"
                  variant="filled" name='status'
                  fullWidth select focused
                  color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={(dialogOperation === "edit") ? editData?.userDo.status : Status.ENABLED.toString()}
                >
                  <MenuItem
                    value={Status.ENABLED.toString()}>Enabled</MenuItem>
                  <MenuItem
                    value={Status.DISABLED.toString()}>Disabled</MenuItem>
                  <MenuItem
                    value={Status.DELETED.toString()}>Deleted</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Role"
                  variant="filled"
                  name='user_role'
                  fullWidth select focused
                  color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={(dialogOperation === "edit") ? parseInt(editData?.userDo.userRoleDo.id) : 5}
                >
                  <MenuItem value={2}>Administrator</MenuItem>
                  <MenuItem value={3}>Manager</MenuItem>
                  <MenuItem value={4}>Supervisor</MenuItem>
                  <MenuItem value={5}>Cashier</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={onClose}
                      variant="outlined"
                      color="error">
                Cancel
              </Button>

              <Button type="submit"
                      variant="outlined"
                      color="success">
                Confirm {dialogOperation.toUpperCase()}
              </Button>

            </DialogActions>

          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
