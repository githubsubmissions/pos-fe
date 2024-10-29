import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";


class DefaultStrategy extends CartProviderStrategy {

  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {
    return this.currentState;
  }

  executeNewTax(): SalesState {
    return this.currentState;
  }
}

export default DefaultStrategy;
