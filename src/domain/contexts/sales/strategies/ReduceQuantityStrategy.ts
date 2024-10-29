import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";

class ReduceQuantityStrategy extends CartProviderStrategy {
  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {
    const itemIndex = this.currentState.cart.findIndex((item: { id: number; }) => item.id === this.incomingPayload.id);

    if (itemIndex !== -1) {
      const itemObject = this.updatedCart[itemIndex];

      if (itemObject.quantity > 1) {
        this.updatedCart[itemIndex] = {...itemObject, quantity: itemObject.quantity - 1};
        this.newTotalAmount -= this.incomingPayload.price;
        this.updateStock(itemObject.id, 1); // Increase stock by 1
      } else {
        this.updatedCart.splice(itemIndex, 1);
        this.newTotalAmount -= this.incomingPayload.price;
        this.updateStock(itemObject.id, itemObject.quantity); // Increase stock by the quantity of the item
      }

      this.subTotal = (this.newTotalAmount * 100) / (100 + this.taxes);
    }

    localStorage.setItem("cart", JSON.stringify(this.updatedCart));

    return {
      ...this.currentState,
      cart: this.updatedCart,
      subTotal: this.subTotal,
      totalAmount: this.newTotalAmount,
      amountToBePaid: this.newTotalAmount,
      change: 0,
      multiplier: -1,
    };
  }

  public executeNewTax(): SalesState {
    const itemIndex = this.currentState.cart.findIndex((item: { id: number; }) => item.id === this.incomingPayload.payload.id);

    if (itemIndex !== -1) {
      const itemObject = this.updatedCart[itemIndex];

      if (itemObject.quantity > 1) {
        this.updatedCart[itemIndex] = {...itemObject, quantity: itemObject.quantity - 1};
        this.updateStock(itemObject.id, 1); // Increase stock by 1
      } else {
        this.updatedCart.splice(itemIndex, 1);
        this.updateStock(itemObject.id, itemObject.quantity); // Increase stock by the quantity of the item
      }

      this.subTotal = this.updatedCart.reduce((a, b) => a + b.quantity * b.price, 0);
      this.newTotalAmount = this.taxService.calculateTaxLocalStorage(this.taxesNew, this.subTotal);
    }

    localStorage.setItem("cart", JSON.stringify(this.updatedCart));

    return {
      ...this.currentState,
      cart: this.updatedCart,
      subTotal: this.subTotal,
      totalAmount: this.newTotalAmount,
      amountToBePaid: this.newTotalAmount,
      change: 0,
      multiplier: -1,
    };
  }

  private updateStock(itemId: number, quantityChange: number): void {
    const product = this.currentState.products.find(product => product.id === itemId);
    if (product && product.trackStock) {
      product.stock += quantityChange;
    }
  }
}

export default ReduceQuantityStrategy;
