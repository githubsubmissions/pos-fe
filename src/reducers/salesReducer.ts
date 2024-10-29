import {
  ADD_ITEM,
  CALCULATE_CHANGE,
  EMPTY_CART,
  MULTIPLY_ITEM,
  REDUCE_CART_QUANTITY,
  REMOVE_ITEM,
  SalesAction,
} from '../domain/contexts/sales/salesActions';
import container from "../container";
import TaxService from "../domain/services/TaxService";
import DefaultStrategy from "../domain/contexts/sales/strategies/DefaultStrategy";
import AddItemStrategy from "../domain/contexts/sales/strategies/AddItemStrategy";
import ReduceQuantityStrategy from "../domain/contexts/sales/strategies/ReduceQuantityStrategy";
import ClearCartStrategy from "../domain/contexts/sales/strategies/ClearCartStrategy";
import CalculateChangeStrategy from "../domain/contexts/sales/strategies/CalculateChangeStrategy";
import NumpadMultiplierStrategy from "../domain/contexts/sales/strategies/NumpadMultiplierStrategy";
import {SalesState} from "../domain/props/SalesState";
import {initialState} from "../domain/contexts/sales/SalesContext";

const salesReducer = (state: SalesState = initialState, action: SalesAction): SalesState => {

  const taxService = container.resolve<TaxService>("TaxService");

  const defaultStrategy = new DefaultStrategy(state, action.payload, taxService);

  switch (action.type) {
    case ADD_ITEM:
      const addItemStrategy = new AddItemStrategy(state, action.payload, taxService);
      return addItemStrategy.execute();

    case REDUCE_CART_QUANTITY:
      const reduceQuantityStrategy = new ReduceQuantityStrategy(state, action.payload, taxService);
      return reduceQuantityStrategy.execute();

    case REMOVE_ITEM:
      return defaultStrategy.removeItemFromCart();

    case MULTIPLY_ITEM:
      const numpadMultiplierStrategy = new NumpadMultiplierStrategy(state, action.payload, taxService);
      return numpadMultiplierStrategy.execute();

    case EMPTY_CART:
      const clearCartStrategy = new ClearCartStrategy(state, action.payload, taxService);
      return clearCartStrategy.execute();

    // case CALCULATE_TOTAL:
    //   const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    //   return {
    //     ...state,
    //     total,
    //   };

    case CALCULATE_CHANGE:
      const calculateChangeStrategy = new CalculateChangeStrategy(state, action.payload, taxService);
      return calculateChangeStrategy.execute();
    default:
      return defaultStrategy.execute()
  }
};

export default salesReducer;
