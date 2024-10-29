import React, {Dispatch, SetStateAction} from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, useMediaQuery} from "@mui/material";
import NumberPad from "../../reusable/numberpad/NumberPad";
import Search from "../searchcomponent/Search";
import {useTheme} from "@mui/material/styles";

function SalesHeaderComponent(props: {
  paymentType: string,
  setPaymentType: Dispatch<SetStateAction<string>>,
  setSearchText: (event: string) => void
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paymentTypeHandler = (event: SelectChangeEvent) => {
    props.setPaymentType(event.target.value);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginBottom: "20px",
      }}
      justifyContent={'space-between'}
    >
      {!isMobile && (
        <Grid item xs={12} sm={12} md={12} lg={9}>
          <NumberPad />
        </Grid>
      )}

      <Grid item xs={12} sm={6} md={6} lg={3}>
        <Search
          setSearchText={props.setSearchText}
          placeholder="Search..."
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={3}>

        <FormControl fullWidth>
          <InputLabel>Payment Method</InputLabel>
          <Select
            value={props.paymentType}
            label="Payment Method"
            onChange={paymentTypeHandler}
          >
            <MenuItem
              value={"CASH"}
              key={'CASH'}
            >
              CASH
            </MenuItem>
            {/*<MenuItem*/}
            {/*  value={"MEAL_PLAN"}*/}
            {/*  key={'MEAL_PLAN'}*/}
            {/*>*/}
            {/*  MEAL PLAN*/}
            {/*</MenuItem>*/}
          </Select>
        </FormControl>
      </Grid>

      {/*<Grid item xs={3}>*/}
      {/*</Grid>*/}

      {/*<Grid item xs={3}>*/}
      {/*</Grid>*/}
    </Grid>
  );
}

export default SalesHeaderComponent