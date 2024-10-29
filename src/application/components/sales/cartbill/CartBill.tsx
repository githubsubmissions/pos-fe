import React, {useContext, useEffect, useState} from "react";
import {Button, CircularProgress, Divider, Grid, Theme, Typography, useMediaQuery} from "@mui/material";
import CurrencyFormatterServiceImpl from "../../../../domain/services/CurrencyFormatterServiceImpl";
import ReceivedComponent from "../received/ReceivedComponent";
import SendIcon from "@mui/icons-material/Send";
import {toast} from "react-toastify";
import {PrintService} from "../../../../domain/services/PrintService";
import container from "../../../../container";
import {useNavigate} from "react-router-dom";
import SaleService from "../../../services/SaleService";
import SalesContext from "../../../../domain/contexts/sales/SalesContext";
import {emptyCart} from "../../../../domain/contexts/sales/salesActions";


const CartBill = (props: { paymentType: string }) => {
    const navigate = useNavigate();
    const {state, dispatch} = useContext(SalesContext);
    const currencyFormatterService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');
    const printService = container.resolve<PrintService>('PrintService');
    const saleService = container.resolve<SaleService>('SaleService');

    const [totalAmount, setTotalAmount] = useState(state.totalAmount);
    const [taxAmount, setTaxAmount] = useState(totalAmount - state.subTotal);
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

    const saleDetail: any[] = [];

    useEffect(() => {
      setTotalAmount(state.totalAmount);
      setTaxAmount(totalAmount - state.subTotal);
    }, [state.totalAmount, state.subTotal, totalAmount]);

    const handlePrintClick = () => {
      if (loading) {
        return; // Prevent multiple submissions
      }

      if (state.cart.length < 1) {
        toast.warning("No items in cart");
        return;
      }
      setLoading(true);

      state.cart.forEach((item) => {
        // TODO shouldn't a service add items to ... wtv (saleDetail)
        // TODO very hacky -> use a mapper
        const itemExists = saleDetail.filter((saleDet) => saleDet.itemId === item.id);

        if (itemExists.length < 1) {
          saleDetail.push({itemId: item.id, quantity: item.quantity});
        }
      });

      if (!printService.checks(state.amountToBePaid, state.totalAmount)) {
        setLoading(false);
        return;
      }

      // const storedTaxes = localStorage.getItem("taxArray");
      const storedTaxes = localStorage.getItem("taxes");
      // console.log('storedTaxes', storedTaxes)
      if (storedTaxes) {
        const saleRequest = {
          paymentMethod: props.paymentType,
          saleDetail: saleDetail,
          taxes: storedTaxes,
        };

        saleService.makeSale(saleRequest, state.amountToBePaid)
          .then(res => {
            if (res) {
              dispatch(emptyCart())
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error)
            if (!error.response) toast.error("API might be down!");
            if (error.response.data.statusCode === 401) navigate("/");
            const message = error.response.data.detailedMessage;
            toast.error(message);
            setLoading(false);
          })
      }
    };


    return (
      <Grid container
            justifyContent="space-between"
            spacing={1}
      >
        {!isMobile &&
          (<>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Subtotal</Typography>
            </Grid><Grid item xs={4}>
            <Typography variant="subtitle1">
              GH&cent; {currencyFormatterService.format(state.subTotal)}
            </Typography>
          </Grid><Grid item xs={2}>
            <Typography variant="subtitle1">Tax</Typography>
          </Grid><Grid item xs={3}>
            <Typography variant="subtitle1" textAlign="right">
              GH&cent; {currencyFormatterService.format(taxAmount)}
            </Typography>
          </Grid><Grid item xs={12}>
            <Divider />
          </Grid>
          </>)
        }
        <Grid item xs={6}>
          <Typography variant="h6">Payout</Typography>
        </Grid>
        <Grid item xs={6}>
          <ReceivedComponent />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">Change</Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Typography variant="h5">
            GH&cent; {currencyFormatterService.format(state.change)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          {/*<Typography variant="h5">Total</Typography>*/}
          <Button
            fullWidth
            endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            size="large"
            variant="contained"
            color="success"
            onClick={handlePrintClick}
            disabled={loading} // Disable the button when loading is true
          >
            Pay
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" textAlign="right">
            GH&cent; {currencyFormatterService.format(totalAmount)}
          </Typography>
        </Grid>


        {/*<Grid item xs={12} sm={12}*/}
        {/*      // sx={{*/}
        {/*      //   height: "10%",*/}
        {/*      // }}*/}
        {/*>*/}
        {/*  <Button*/}
        {/*    fullWidth*/}
        {/*    endIcon={loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}*/}
        {/*    size="large"*/}
        {/*    variant="contained"*/}
        {/*    color="success"*/}
        {/*    onClick={handlePrintClick}*/}
        {/*    disabled={loading} // Disable the button when loading is true*/}
        {/*  >*/}
        {/*    Pay*/}
        {/*  </Button>*/}

        {/*</Grid>*/}


      </Grid>
    );
  }
;

export default CartBill;
