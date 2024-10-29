import {CartAction} from "./CartAction";
import {Item} from "../entities/Item";

export type CartData = {
  type: CartAction
  payload: Item
  amountPayload: number
}
