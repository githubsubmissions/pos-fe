import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {Status} from "../../../../domain/enums/Status";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import {ItemCategory} from "../../../../domain/entities/ItemCategory";
import {toast} from "react-toastify";
import container from "../../../../container";
import ItemCategoryRepository from "../../../../domain/repositories/ItemCategoryRepository";

const EditCategoryDialog = (props: {
  open: boolean;
  onClose: () => void;
  editableRowData: ItemCategory | null;
  categories: ItemCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ItemCategory[]>>; // TODO can also be () => void?
}) => {
  const navigate = useNavigate();
  const itemCategoryRepository = container.resolve<ItemCategoryRepository>('ItemCategoryRepository')

  const {open, onClose, editableRowData, categories, setCategories} = props;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const category = {
      id: editableRowData?.id,
      name: event.currentTarget.categoryName.value,
      status: event.currentTarget.status.value,
    };

    return itemCategoryRepository.updateCategory(category)
      .then((updatedCategory) => {
        toast.success(`Updated ${category.name}`);
        const updatedCategories = [
          ...categories.filter(category => category.id !== updatedCategory.id),
          updatedCategory
        ];

        setCategories([...updatedCategories].sort((a, b) => a.name.localeCompare(b.name)));
        onClose();
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  return (
    <React.Fragment>
      <Dialog open={open}
              onClose={onClose}
        // TransitionComponent={Transition}
              fullWidth
              maxWidth='md'
      >
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {md: 1},
            }}
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler(e);
            }}
          >
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField label="Name"
                           type="text"
                           variant="filled"
                           name="categoryName"
                           focused fullWidth required
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={editableRowData?.name}
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  label="Status"
                  variant="filled" name='status'
                  fullWidth select focused
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={editableRowData?.status.toString()}
                >
                  <MenuItem
                    value={Status.ENABLED.toString()}>Enabled</MenuItem>
                  <MenuItem
                    value={Status.DISABLED.toString()}>Disabled</MenuItem>
                  <MenuItem
                    value={Status.DELETED.toString()}>Deleted</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <DialogActions>
              <Button
                onClick={onClose}
                variant="outlined"
                color="error"
              >
                Cancel
              </Button>

              <Button type="submit"
                      variant="outlined"
                      color="success"
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default EditCategoryDialog;
