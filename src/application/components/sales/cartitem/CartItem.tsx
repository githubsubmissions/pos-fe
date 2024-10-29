import React, {useContext} from 'react';
import {Item} from "../../../../domain/entities/Item";
import CurrencyFormatterServiceImpl from "../../../../domain/services/CurrencyFormatterServiceImpl";
import {green, orange} from "@mui/material/colors";
import {DeleteIcon, DownIcon, UpIcon} from "../../reusable/svgicons/SvgIcons";
import {Button, Grid, IconButton, Typography} from "@mui/material";
import container from "../../../../container";
import {addItem, reduceItemQuantity, removeItem} from "../../../../domain/contexts/sales/salesActions";
import SalesContext from "../../../../domain/contexts/sales/SalesContext";

const iconSize = 50;

interface CartItemProps {
  itemDetails: Item;
}

const CartItem: React.FC<CartItemProps> = ({itemDetails}) => {
  const salesContext = useContext(SalesContext);
  const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');

  const addOneItem = () => {
    salesContext.dispatch(addItem(itemDetails));
  };

  const handleRemoveItem = (itemId: number) => {
    salesContext.dispatch(removeItem(itemId));
  };

  const reduceItemByOne = () => {
    salesContext.dispatch(reduceItemQuantity(itemDetails));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{overflow: 'hidden'}}
    >
      <Grid item xs={8}>
        <Grid container justifyContent="space-between" spacing={0}>
          <Grid item xs={12}>
            <Button
              onClick={() => handleRemoveItem(itemDetails.id)}
              color="error"
              startIcon={<DeleteIcon />}
              sx={{
                minWidth: 3,
                padding: 0,
              }}
            />
            {itemDetails.name} [
            {currencyFormatterService.format(itemDetails.price)}]
          </Grid>

          <Grid item xs={8}>
            &cent;{" "}
            {currencyFormatterService.format(
              +itemDetails.price * itemDetails.quantity
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4} container justifyContent="space-evenly">
        <Grid item xs={4}>
          <IconButton
            color="primary"
            component="label"
            onClick={addOneItem}
            sx={{
              padding: 0,
              marginTop: '7px',
              marginRight: '-7px',
            }}
          >
            <UpIcon
              sx={{
                fontSize: iconSize,
                color: green[300],
              }}
            />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              padding: '5px',
              marginTop: '7px'
            }}
          >
            {itemDetails.quantity}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="primary"
            component="label"
            onClick={reduceItemByOne}
            sx={{
              padding: 0,
              marginTop: '7px',
            }}
          >
            <DownIcon
              sx={{
                fontSize: iconSize,
                color: orange[300],
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
