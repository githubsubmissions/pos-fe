import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";

class ClearCartStrategy extends CartProviderStrategy {
  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {
    // Reset stock for all items in the cart
    this.resetStock(this.currentState.cart);

    localStorage.removeItem("cart");

    return {
      ...this.currentState,
      cart: [],
      subTotal: 0,
      totalAmount: 0,
      amountToBePaid: 0,
      change: 0,
      multiplier: -1,
    };
  }

  executeNewTax(): SalesState {
    return this.executeOldTax();
  }

  private resetStock(cart: any[]): void {
    cart.forEach(cartItem => {
      const product = this.currentState.products.find(product => product.id === cartItem.id);
      if (product && product.trackStock) {
        product.stock += cartItem.quantity;
      }
    });
  }
}

export default ClearCartStrategy;
