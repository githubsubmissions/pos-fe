import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";


class CalculateChangeStrategy extends CartProviderStrategy {

  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {

    this.change = this.incomingPayload <= this.newTotalAmount ? 0 : this.incomingPayload - this.newTotalAmount;

    return {
      ...this.currentState,
      amountToBePaid: this.incomingPayload,
      change: this.change,
    };

  }

  executeNewTax(): SalesState {
    return this.executeOldTax();
  }
}

export default CalculateChangeStrategy;
