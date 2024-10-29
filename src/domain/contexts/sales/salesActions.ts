// src/actions/salesActions.ts

import {Item} from "../../entities/Item";

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MULTIPLY_ITEM = 'MULTIPLY_ITEM';
export const REDUCE_CART_QUANTITY = 'REDUCE_CART_QUANTITY';
// export const REDUCE_STOCK_QUANTITY = 'REDUCE_STOCK_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';
export const CALCULATE_TOTAL = 'CALCULATE_TOTAL';
export const CALCULATE_CHANGE = 'CALCULATE_CHANGE';

export interface AddItemAction {
  type: typeof ADD_ITEM;
  payload: Item;
}

export interface RemoveItemAction {
  type: typeof REMOVE_ITEM;
  payload: number;
}

export interface MultiplyItemAction {
  type: typeof MULTIPLY_ITEM;
  payload: { quantity: number };
}

export interface ReduceCartQuantityAction {
  type: typeof REDUCE_CART_QUANTITY;
  payload: Item;
}


// export interface ReduceStockQuantityAction {
//   type: typeof REDUCE_STOCK_QUANTITY;
//   payload: Item;
// }

export interface EmptyCartAction {
  type: typeof EMPTY_CART;
  payload: null;
}

export interface CalculateTotalAction {
  type: typeof CALCULATE_TOTAL;
  payload: null;
}

export interface CalculateChangeAction {
  type: typeof CALCULATE_CHANGE;
  payload: number;
}

export type SalesAction =
  | AddItemAction
  | RemoveItemAction
  | MultiplyItemAction
  | ReduceCartQuantityAction
  // | ReduceStockQuantityAction
  | EmptyCartAction
  | CalculateTotalAction
  | CalculateChangeAction;

export const addItem = (item: Item): AddItemAction => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (itemId: number): RemoveItemAction => ({
  type: REMOVE_ITEM,
  payload: itemId,
});

export const multiplyItem = (quantity: number): MultiplyItemAction => ({
  type: MULTIPLY_ITEM,
  payload: {quantity},
});

export const reduceItemQuantity = (item: Item): ReduceCartQuantityAction => ({
  type: REDUCE_CART_QUANTITY,
  payload: item,
});

// export const reduceStockQuantity = (item: Item): ReduceStockQuantityAction => ({
//   type: REDUCE_STOCK_QUANTITY,
//   payload: item,
// });

export const emptyCart = (): EmptyCartAction => ({
  type: EMPTY_CART,
  payload: null
});

export const calculateTotal = (): CalculateTotalAction => ({
  type: CALCULATE_TOTAL,
  payload: null
});

export const calculateChange = (amountPaid: number): CalculateChangeAction => ({
  type: CALCULATE_CHANGE,
  payload: amountPaid,
});
