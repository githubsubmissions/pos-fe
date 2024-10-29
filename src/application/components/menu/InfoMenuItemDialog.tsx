import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import {toast} from "react-toastify";
import container from "../../../container";
import ItemRepository from "../../../domain/repositories/ItemRepository";
import {Status} from "../../../domain/enums/Status";


const InfoMenuItemDialog = (props: {
  onClose: () => void;
  open: boolean;
  allItems: any;
  setItems: any;
  editData: any;
}) => {
  const navigate = useNavigate();
  const itemRepository = container.resolve<ItemRepository>('ItemRepository')

  const {open, onClose, allItems, setItems, editData} = props;

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const itemObject = {
      id: editData.id,
      imagePath: event.currentTarget.imagePath.value,
      itemCategoryId: event.currentTarget.itemCategoryId.value,
      minStockLevel: event.currentTarget.minStockLevel.value,
      name: event.currentTarget.itemName.value,
      price: event.currentTarget.price.value,
      status: event.currentTarget.status.value,
    };

    return itemRepository.updateItem(itemObject)
      .then((updatedItem: any) => { // TODO any should be of type Item
        if (updatedItem) {
          toast.success(`Updated ${updatedItem.name}`);
          const newItems = allItems.map((item: { id: number; }) => {
            if (item.id === updatedItem.id) {
              updatedItem.itemCategoryId = updatedItem.itemCategoryDo.id
              updatedItem.category = updatedItem.itemCategoryDo.name
              updatedItem.updateDate = updatedItem.updatedAt
              updatedItem.creationDate = updatedItem.createdAt
              return updatedItem;
            }
            return item;
          });
          setItems(newItems.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name)))
          onClose();
        }
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
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/*{`${dialogOperation.charAt(0).toUpperCase()}${dialogOperation.substring(1)}`} an employee.*/}
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
              onSubmitHandler(e);
            }}
          >
            <Grid container justifyContent="center" spacing={2}>

              <Grid item xs={12} md={6}>
                <TextField label="Name" focused fullWidth required
                           type="text"
                           variant="filled"
                           name="itemName"
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={editData?.name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Price"
                           name="price"
                           fullWidth focused required
                           variant="filled"
                           type="number"
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={editData?.price}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Status"
                  variant="filled" name='status'
                  fullWidth select focused
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={editData?.status}
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
                <TextField label="Minimum Stock Level"
                           name="minStockLevel"
                           fullWidth focused
                           variant="filled"
                           type="number"
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={editData?.minStockLevel}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField label="Image Path"
                           name="imagePath"
                           fullWidth focused
                           variant="filled"
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                           defaultValue={editData?.imagePath}
                />
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
                Confirm
              </Button>

            </DialogActions>

          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default InfoMenuItemDialog;
