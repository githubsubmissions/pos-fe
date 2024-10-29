import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {AiOutlineAppstoreAdd} from "react-icons/ai";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {Status} from "../../../../domain/enums/Status";

const FormDialog: React.FC<{ onFormSubmit: any }> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [textFieldInput, setTextFieldInput] = React.useState("");
  const [selectorInput, setSelectorInput] = React.useState(Status.ENABLED.toString());


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const retrieved = (event.target as HTMLInputElement).value;
    setTextFieldInput(retrieved);
    console.log(textFieldInput);
  };

  const getSelectorInput = (event: SelectChangeEvent) => {
    event.preventDefault();
    const retrieved = (event.target as HTMLInputElement).value;
    setSelectorInput(retrieved);
  };

  const getInputHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onFormSubmit({name: textFieldInput, status: selectorInput});
    console.log(textFieldInput, selectorInput);

  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <AiOutlineAppstoreAdd
          style={{
            marginRight: "10px",
          }}
        />
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a category</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form action="src/application/components/reusable/formmodal/FormModal">
            <TextField
              sx={{
                width: 500,
              }}
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              error
              onChange={getTextInput}
              required
            />

            <Box sx={{minWidth: 120, marginTop: 5}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectorInput}
                  label="Status"
                  onChange={getSelectorInput}
                  required
                >
                  <MenuItem value={Status.ENABLED.toString()}>Enabled</MenuItem>
                  <MenuItem value={Status.DISABLED.toString()}>
                    Disabled
                  </MenuItem>
                  <MenuItem value={Status.DELETED.toString()}>Deleted</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={getInputHandler}>
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog
