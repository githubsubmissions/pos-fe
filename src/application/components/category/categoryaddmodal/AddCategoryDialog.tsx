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

const AddCategoryDialog = (props: {
  open: boolean;
  onClose: () => void;
  categories: ItemCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ItemCategory[]>>; // TODO can also be () => void
}) => {
  const navigate = useNavigate();
  const itemCategoryRepository = container.resolve<ItemCategoryRepository>('ItemCategoryRepository');

  const {open, onClose, categories, setCategories} = props;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const category = {
      name: event.currentTarget.categoryName.value,
      status: event.currentTarget.status.value,
    };

    return itemCategoryRepository.addItemCategory(category)
      .then((addedCategory) => {
        toast.success(`Added ${addedCategory.name}`);
        setCategories([...categories, addedCategory].sort((a, b) => a.name.localeCompare(b.name)));
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
              {/*<Grid item xs={12}>*/}
              {/*  <TextField*/}
              {/*    label="Category"*/}
              {/*    variant="filled" name='itemCategoryId'*/}
              {/*    fullWidth select focused required*/}
              {/*    // color={(dialogOperation === "edit") ? editColor : addColor}*/}
              {/*    defaultValue={1}*/}
              {/*  >*/}
              {/*    {itemCategories &&*/}
              {/*      itemCategories.map((itemCategory: ItemCategory) =>*/}
              {/*        <MenuItem key={itemCategory?.id} value={itemCategory?.id}>*/}
              {/*          {itemCategory?.name}*/}
              {/*        </MenuItem>*/}
              {/*      )}*/}
              {/*  </TextField>*/}
              {/*</Grid>*/}

              <Grid item xs={12}>
                <TextField label="Name"
                           type="text"
                           variant="filled"
                           name="categoryName"
                           focused fullWidth required
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                  //        defaultValue={editData?.name}
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  label="Status"
                  variant="filled" name='status'
                  fullWidth select focused
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={Status.ENABLED.toString()}
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

export default AddCategoryDialog;
