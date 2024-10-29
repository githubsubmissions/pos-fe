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
import {Status} from "../../../../domain/enums/Status";
import {useNavigate} from "react-router-dom";
import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import {ItemCategory} from "../../../../domain/entities/ItemCategory";
import {toast} from "react-toastify";
import container from "../../../../container";
import ItemRepository from "../../../../domain/repositories/ItemRepository";

const AddItemDialog = (props: {
  onClose: () => void;
  open: boolean;
  allItems: any;
  setItems: any;
  itemCategories: any;
}) => {
  const navigate = useNavigate();
  const itemRepository = container.resolve<ItemRepository>('ItemRepository');

  const {open, onClose, itemCategories, allItems, setItems} = props;

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const itemObject = {
      imagePath: form.imagePath.value,
      itemCategoryId: parseInt(form.itemCategoryId.value, 10),
      minStockLevel: parseInt(form.minStockLevel.value, 10),
      name: form.itemName.value,
      price: parseFloat(form.price.value),
      status: form.status.value,
      trackStock: form.trackStock.checked,
      stock: parseInt(form.stock.value, 10),
    };

    try {
      const addedItem = await itemRepository.addItem(itemObject);
      toast.success(`Added ${addedItem.name}`);

      const itemInAnotherFormat = {
        id: addedItem.id,
        updateDate: addedItem.updatedAt,
        creationDate: addedItem.createdAt,
        category: itemCategories.find((cat: ItemCategory) => cat.id === itemObject.itemCategoryId)?.name,
        ...itemObject,
      };

      setItems([...allItems, itemInAnotherFormat].sort((a, b) => a.name.localeCompare(b.name)));
      onClose();
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    console.log(error);
    if (!error.response) {
      toast.error("API might be down!");
    } else if (error.response.data.statusCode === 401) {
      navigate("/");
    } else {
      // const message = error.response.data.detailedMessage;
      // toast.error(message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='md'
    >
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Box
          component="form"
          sx={{'& .MuiTextField-root': {md: 1}}}
          noValidate
          autoComplete="off"
          onSubmit={onSubmitHandler}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                variant="filled"
                name="itemCategoryId"
                fullWidth
                select
                focused
                required
                defaultValue={1}
              >
                {itemCategories &&
                  itemCategories.filter((itemCategory: ItemCategory) => itemCategory.status !== Status.DELETED)
                    .map((itemCategory: ItemCategory) =>
                      <MenuItem key={itemCategory?.id} value={itemCategory?.id}>
                        {itemCategory?.name}
                      </MenuItem>
                    )}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                type="text"
                variant="filled"
                name="itemName"
                focused
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Price"
                name="price"
                fullWidth
                focused
                required
                variant="filled"
                type="number"
                defaultValue={0}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Status"
                variant="filled"
                name="status"
                fullWidth
                select
                focused
                defaultValue={Status.ENABLED.toString()}
              >
                <MenuItem value={Status.ENABLED.toString()}>Enabled</MenuItem>
                <MenuItem value={Status.DISABLED.toString()}>Disabled</MenuItem>
                <MenuItem value={Status.DELETED.toString()}>Deleted</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Minimum Stock Level"
                name="minStockLevel"
                fullWidth
                focused
                variant="filled"
                type="number"
                defaultValue={10}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Image Path"
                name="imagePath"
                fullWidth
                focused
                variant="filled"
                defaultValue=""
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Current Stock"
                name="stock"
                fullWidth
                focused
                variant="filled"
                type="number"
                defaultValue={0} // Provide a sensible default if needed
                disabled
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Add Stock"
                name="addStock"
                fullWidth
                focused
                variant="filled"
                type="number"
                defaultValue={0}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="trackStock"
                    defaultChecked={false} // Provide a sensible default if needed
                  />
                }
                label="Track Stock"
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button onClick={onClose} variant="outlined" color="error">
              Cancel
            </Button>

            <Button type="submit" variant="outlined" color="success">
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;
