import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";


class NumpadMultiplierStrategy extends CartProviderStrategy {

  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {

    if (this.incomingPayload.quantity < 0)
      this.incomingPayload.quantity = Math.abs(this.incomingPayload.quantity) % 10;

    return {
      ...this.currentState,
      multiplier: this.incomingPayload.quantity,
    };

  }

  executeNewTax(): SalesState {
    return this.executeOldTax();
  }
}

export default NumpadMultiplierStrategy;
