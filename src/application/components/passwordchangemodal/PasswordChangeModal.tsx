import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, Grid, Slide} from '@mui/material';
import {TransitionProps} from "@mui/material/transitions";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import container from "../../../container";
import EmployeeRepository from "../../../domain/repositories/EmployeeRepository";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function PasswordChangeModal(props: { onClose: () => void; open: boolean; }) {
  const navigate = useNavigate();
  const employeeRepository = container.resolve<EmployeeRepository>('EmployeeRepository');
  const {open, onClose} = props;
  const addColor = "success";
  const editColor = "warning";

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    const oldPassword = e.currentTarget.oldPassword.value;
    const newPassword = e.currentTarget.newPassword.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Your new password should be equal to the confirm!!")
    }

    const passwordDetails = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    employeeRepository.resetMyPassword(passwordDetails)
      .then((res) => {
        if (res) toast.success("Password change success.");
        onClose()
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
              maxWidth={'md'}
      >
        <DialogTitle>
          <strong>{localStorage.getItem('email')?.toUpperCase()}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Is changing their <strong>password</strong>!
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
              handlePasswordChange(e);
            }}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField label="Old Password"
                           type="password"
                           variant="filled"
                           name="oldPassword"
                           fullWidth
                           focused
                           color="error"
                           defaultValue={""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="New Password"
                           type="password"
                           variant="filled"
                           name="newPassword"
                           fullWidth
                           focused
                           color={editColor}
                           defaultValue={""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Confirm Password"
                           type="password"
                           variant="filled"
                           name="confirmPassword"
                           fullWidth
                           focused
                           color={addColor}
                           defaultValue={""}
                />
              </Grid>
            </Grid>

            <DialogActions>
              <Button onClick={props.onClose}
                      variant="outlined"
                      color="error">
                Cancel
              </Button>

              <Button type="submit"
                      variant="outlined"
                      color={addColor}>
                Confirm{/* {dialogOperation.toUpperCase()}*/}
              </Button>

            </DialogActions>

          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
