import React from 'react'
import {Item} from "../entities/Item";

export interface SalesState {
  products: Item[]
  cart: Item[]
  subTotal: number
  totalAmount: number
  amountToBePaid: number;
  change: number;
  multiplier: number;
  payoutInputRef: React.RefObject<HTMLInputElement> | null;
}
