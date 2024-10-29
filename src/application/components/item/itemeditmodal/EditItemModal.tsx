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
import PurchaseRepository from "../../../../domain/repositories/PurchaseRepository";

const EditItemDialog = (props: {
  onClose: () => void;
  open: boolean;
  allItems: any;
  setItems: any;
  editData: any;
  itemCategories: any;
  setItemCategories: any;
}) => {
  const navigate = useNavigate();
  const itemRepository = container.resolve<ItemRepository>('ItemRepository');
  const purchaseRepository = container.resolve<PurchaseRepository>('PurchaseRepository');

  const {open, onClose, allItems, setItems, editData, itemCategories} = props;

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const purchaseDetails = [{
      itemId: editData.id,
      price: parseFloat(form.price.value),
      quantity: parseInt(form.addStock.value, 10),
      purchaseId: 0,
    }];

    const purchase = {
      purchaseDate: new Date().toISOString(),
      purchaseDetails,
      supplierId: 1,
      totalAmount: 0
    };

    const itemObject = {
      id: editData.id,
      imagePath: form.imagePath.value,
      itemCategoryId: parseInt(form.itemCategoryId.value, 10),
      minStockLevel: parseInt(form.minStockLevel.value, 10),
      name: form.itemName.value,
      price: parseFloat(form.price.value),
      status: form.status.value,
      trackStock: form.trackStock.checked,
      stock: parseInt(form.stock.value, 10) + parseInt(form.addStock.value, 10),
    };

    try {
      if (purchaseDetails[0].quantity > 0) {
        const purchasedItem = await purchaseRepository.purchaseItems(purchase);
        // console.log(purchasedItem);
        await updateItem(itemObject);
      } else {
        await updateItem(itemObject);
      }
    } catch (error: any) {
      handleError(error);
    }
  };

  const updateItem = async (itemObject: any) => { // TODO: Define 'itemObject' type properly
    try {
      const updatedItem = await itemRepository.updateItem(itemObject);
      if (updatedItem) {
        toast.success(`Updated ${updatedItem.name}`);
        const newItems = allItems.map((item: { id: number }) => {
          if (item.id === updatedItem.id) {
            return {
              ...updatedItem,
              itemCategoryId: updatedItem.itemCategoryDo.id,
              category: updatedItem.itemCategoryDo.name,
              trackStock: true,
              updateDate: updatedItem.updatedAt,
              creationDate: updatedItem.createdAt,
            };
          }
          return item;
        });
        setItems(newItems.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)));
        onClose();
      }
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
      const message = error.response.data.detailedMessage;
      toast.error(message);
    }
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
            {/* Add any additional text or instructions here if needed */}
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
                <TextField
                  label="Category"
                  variant="filled" name='itemCategoryId'
                  fullWidth select focused required
                  // color={(dialogOperation === "edit") ? editColor : addColor}
                  defaultValue={editData?.itemCategoryId}
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
                  focused
                  fullWidth
                  required
                  type="text"
                  variant="filled"
                  name="itemName"
                  defaultValue={editData?.name}
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
                  defaultValue={editData?.price}
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
                  defaultValue={editData?.status}
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
                  defaultValue={editData?.minStockLevel}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Image Path"
                  name="imagePath"
                  fullWidth
                  focused
                  variant="filled"
                  defaultValue={editData?.imagePath}
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
                  defaultValue={editData?.stock}
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
                      defaultChecked={editData?.trackStock}
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
    </React.Fragment>
  );
};

export default EditItemDialog;
