import React from "react";
import {Item} from "../../../../domain/entities/Item";
import {Grid, Theme, useMediaQuery} from "@mui/material";
import Product from "../product/Product";

const ProductListComponent = React.memo((props: { searchText: string, productList: Item[] }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  // const isLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));


  let containerHeight;
  if (isMobile) {
    containerHeight = "65%";
  } else if (isMedium) {
    containerHeight = "88%";
  }
    // else if (isLarge) {
    //   containerHeight = "90%";
  // }
  else {
    containerHeight = "79%";
  }
  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{
        overflow: "auto",
        height: containerHeight,
        paddingRight: "10px",
        "&::-webkit-scrollbar": {
          width: "35px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(38 127 255)",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-track-piece:vertical": {
          backgroundColor: "lightblue",  // Customize the background color of the vertical track
        },
      }}
    >
      {!props.searchText
        ? props.productList.map((item: Item, i) => {
          // console.log('props.productList', props.productList)
          return (<Grid item xs={12} md={5} lg={3} key={i}>
              <Product
                key={item.id}
                productDetails={item}
              />
            </Grid>
          )
        })
        : props.productList.map((item: Item, i) => {
          // console.log('props.productList', props.productList)
          if (item.name.toLowerCase().includes(props.searchText.toLowerCase())) {
            return (
              <Grid item xs={12} md={5} lg={3} key={i}>
                <Product
                  key={item.id}
                  productDetails={item}
                  // setProductList={props.setProductList}
                />
              </Grid>
            );
          }
          return null;
        })}
    </Grid>
  );
});

export default ProductListComponent