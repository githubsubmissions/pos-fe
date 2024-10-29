import React, {useContext} from 'react';
import {Button, Divider, Grid, Paper, Theme, useMediaQuery} from '@mui/material';
import CartBill from '../cartbill/CartBill';
import CartItem from '../cartitem/CartItem';
import {DeleteIcon} from '../../reusable/svgicons/SvgIcons';
import 'react-toastify/dist/ReactToastify.css';
import SalesContext from '../../../../domain/contexts/sales/SalesContext';
import {emptyCart} from '../../../../domain/contexts/sales/salesActions';

interface CartProps {
  paymentType: string;
}

export const Cart: React.FC<CartProps> = ({paymentType}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const {state, dispatch} = useContext(SalesContext);

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={'end'}
        spacing={1}
        sx={{
          height: '100%'
        }}
      >
        <Grid item xs={12}>
          {!isMobile ?
            (
              <Button
                onClick={handleEmptyCart}
                color="error"
                startIcon={<DeleteIcon style={{fontSize: '2.5rem'}} />}
                sx={{
                  padding: 0
                }}
              />
            ) : (<span>Cart</span>)
          }</Grid>
        <Grid item
              xs={12}
              sx={{
                height: "63%",
                overflow: 'auto',
                paddingRight: "10px",
                "&::-webkit-scrollbar": {
                  width: "35px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgb(38 127 255)",
                  borderRadius: "3px",
                },
                "&::-webkit-scrollbar-track-piece:vertical": {
                  backgroundColor: "lightblue",
                },
              }}
        >
          {state.cart && state.cart.map((item) => (
            <Paper
              key={"paper" + item.id}
              sx={{
                p: 1,
                marginBottom: 1,
              }}
            >
              <CartItem
                key={item.id}
                itemDetails={item}
              />
            </Paper>
          ))}
        </Grid>

        <Grid item xs={12} md={12}
              sx={{
                height: "25%",
              }}
        >
          <Divider />

          <CartBill paymentType={paymentType} />

        </Grid>

      </Grid>
    </React.Fragment>
  );
};
