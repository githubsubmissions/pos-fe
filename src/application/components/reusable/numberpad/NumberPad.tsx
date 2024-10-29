import React from 'react';
import {Button, Grid} from "@mui/material";
import SalesContext from "../../../../domain/contexts/sales/SalesContext";
import {multiplyItem} from "../../../../domain/contexts/sales/salesActions";

const NumberPad: React.FC = () => {
  const salesContext = React.useContext(SalesContext);
  const handleClick = (value: number) => {
    const multiplierValue = parseInt(String(salesContext.state.multiplier ?? "") + value);
    salesContext.dispatch(multiplyItem(multiplierValue));
  };


  const getButtonFontSize = (totalButtons: number) => {
    // Adjust the desired font size here
    const baseFontSize = 24;
    const maxButtonsPerRow = 10;
    const fontSize = Math.floor(baseFontSize / totalButtons * maxButtonsPerRow);
    return fontSize;
  };

  const totalButtons = 10; // Update this with the actual number of buttons
  const buttonFontSize = getButtonFontSize(totalButtons);

  return (
    <Grid container spacing={0}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number, index) => (
        <Grid item key={number}>
          <Button
            key={number}
            variant="contained"
            color="primary"
            size="medium"
            style={{
              fontSize: buttonFontSize,
              fontWeight: "bold",
              height: "78%",
              marginRight: 3,
              minWidth: "45px",
              padding: "0"
            }}
            onClick={() => handleClick(number)}
          >
            {number}
          </Button>

        </Grid>
      ))}

    </Grid>
  );
};

export default NumberPad;
