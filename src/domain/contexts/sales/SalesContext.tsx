import React, {createContext, Dispatch} from 'react';
import {SalesAction} from './salesActions';
import {SalesState} from "../../props/SalesState";

export const initialState: SalesState = {
  // cart: [],
  // total: 0,
  // change: 0,
  products: [],
  cart: [],
  subTotal: 0,
  totalAmount: 0,
  amountToBePaid: 0,
  change: 0,
  multiplier: -1,
  payoutInputRef: null
};

const SalesContext = createContext<{
  state: SalesState;
  dispatch: Dispatch<SalesAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default SalesContext;
