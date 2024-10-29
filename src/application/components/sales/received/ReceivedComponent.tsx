import React from "react";
import TextField from "@mui/material/TextField";
import SalesContext from "../../../../domain/contexts/sales/SalesContext";
import {calculateChange} from "../../../../domain/contexts/sales/salesActions";

const Received: React.FC = (props) => {
  const saleContext = React.useContext(SalesContext);

  const getInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amountReceived = +(event.target as HTMLInputElement).value;
    saleContext.dispatch(calculateChange(amountReceived));
  };

  const highlight = () => {
    if (saleContext.state.payoutInputRef && saleContext.state.payoutInputRef.current) {
      saleContext.state.payoutInputRef.current.select();
    }
  };

  return (
    <React.Fragment>
      <TextField
        type="number"
        variant="standard"
        onChange={getInputHandler}
        onClick={highlight}
        defaultValue={saleContext.state.amountToBePaid}
        inputRef={saleContext.state.payoutInputRef}
        inputProps={{min: 0, style: {textAlign: 'right'}}}
        InputProps={{
          style: {
            fontSize: "25px",
          }
        }}
      />
    </React.Fragment>
  );
};

export default Received;
