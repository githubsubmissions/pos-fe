import React, {useReducer, useRef} from 'react';
import SalesContext, {initialState} from './SalesContext';
import salesReducer from '../../../reducers/salesReducer';
import {SalesAction} from './salesActions';
import {SalesState} from "../../props/SalesState";
import container from "../../../container";
import CurrencyFormatterServiceImpl from "../../services/CurrencyFormatterServiceImpl";
import {Theme, useMediaQuery} from "@mui/material";

const currencyService = container.resolve<CurrencyFormatterServiceImpl>('CurrencyFormatterService');

const SalesProvider: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer<React.Reducer<SalesState, SalesAction>>(salesReducer, {
    ...initialState,
    payoutInputRef: inputRef
  });
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const highlight = (inputRef: any, amountToBePaid: number) => {
    if (inputRef.current) {
      if (isMobile) return;
      inputRef.current.value = currencyService.format(amountToBePaid);
      inputRef.current.select();
    }
  };

  React.useEffect(() => {
    highlight(state.payoutInputRef, state.totalAmount);
  }, [state.totalAmount]);

  return (
    <SalesContext.Provider value={{state, dispatch}}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesProvider;
