import React, {useContext, useEffect, useState} from "react";
import {Grid, Theme, useMediaQuery} from "@mui/material";
import {Item} from "../../../domain/entities/Item";
import dummyItems from "./Items.json"
import ProductListComponent from "../../components/sales/productlistcomponent/ProductListComponent";
import {useNavigate} from "react-router-dom";
import {Status} from "../../../domain/enums/Status";
import {Tax} from "../../../domain/entities/Tax";
import SalesHeaderComponent from "../../components/sales/salesheadercomponent/SalesHeaderComponent";
import {Cart} from "../../components/sales/cart/Cart";
import {toast} from "react-toastify";
import container from "../../../container";
import ItemRepository from "../../../domain/repositories/ItemRepository";
import TaxRepository from "../../../domain/repositories/TaxRepository";
import SalesContext from "../../../domain/contexts/sales/SalesContext";


const SalesPage = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(SalesContext);
  const itemRepository = container.resolve<ItemRepository>('ItemRepository');
  const taxRepository = container.resolve<TaxRepository>('TaxRepository');

  // const [productList, setProductList] = useState<Item[]>([]); // TODO FIXME INTERESTING handled in context now
  const [searchText, setSearchText] = useState<string>("");
  const [paymentType, setPaymentType] = useState("CASH");
  const [taxes, setTaxes] = useState({});

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    // setRenderCount((prevCount) => prevCount + 1);
    getTaxes();
    getItems();
  }, []);

  const getItems = () => {
    itemRepository.getItems(Status.ENABLED)
      .then((items: [Item]) => {
        // setProductList(items); // TODO FIXME INTERESTING handled in context now
        state.products = items;
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
        // setProductList(dummyItems);
        state.products = dummyItems;
      });
  };


  if (taxes) {
    Object.entries(taxes).forEach(([key, value]) => {
      const taxArray = []
      if (typeof value == "number") {
        if (key === "VAT" && value !== 0) {
          taxArray.push(key)
          // subTotal = (totalAmount * 100) / (100 + value);
          localStorage.setItem('taxArray', JSON.stringify(taxArray))
        }
        // else if (key !== "VAT" && value !== 0) {
        //   totalAmount += value
        //   taxArray.push(key)
        //   localStorage.setItem("taxArray", JSON.stringify(taxArray));
        // }
      }
    });
  }

  const getTaxes = () => {
    taxRepository.getTaxes()
      .then((taxes: Tax) => setTaxes(taxes))
      // .catch(error => {

      // })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        const message = error.response.data.detailedMessage;
        toast.error(message);
      });
  };

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={'end'}
        spacing={0}
        sx={{
          height: "89%",
        }}
      >
        <Grid item
              xs={12} sm={6} md={8} lg={9}
              sx={{
                height: isMobile ? "38%" : "100%",
                marginBottom: "-50px"
              }}>
          <SalesHeaderComponent
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            setSearchText={setSearchText}
          />

          <ProductListComponent
            productList={state.products}
            searchText={searchText}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} sx={{height: isMobile ? "47%" : "100%",}}>
          <Cart
            paymentType={paymentType}
          />
        </Grid>

      </Grid>

      <iframe
        title={"Print Cart"}
        id="contents_to_print"
        style={{
          height: "0",
          width: "0",
          position: "absolute"
        }}
      />

    </React.Fragment>
  );
};

export default SalesPage;
