import {SalesState} from "../../../props/SalesState";
import {CartProviderStrategy} from "../CartProviderStrategy";

class AddItemStrategy extends CartProviderStrategy {
  public execute(): SalesState {
    return this.taxService.getTaxType() === "old"
      ? this.executeOldTax()
      : this.executeNewTax();
  }

  public executeOldTax(): SalesState {
    let cartListItems = [...this.currentState.cart];
    const itemIndexInCart = cartListItems.findIndex(item => item.id === this.incomingPayload.id);
    let quantityChange = 0;

    if (itemIndexInCart > -1) {
      const itemToUpdate = cartListItems[itemIndexInCart];
      if (this.currentState.multiplier === 0) {
        quantityChange = -itemToUpdate.quantity;
        cartListItems.splice(itemIndexInCart, 1);
      } else if (this.currentState.multiplier === 1) {
        quantityChange = 1 - itemToUpdate.quantity;
        cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: 1};
      } else if (this.currentState.multiplier === -1) {
        quantityChange = 1;
        if (this.canAddToCart(this.currentState.products, this.incomingPayload.id, quantityChange)) {
          cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: itemToUpdate.quantity + 1};
        } else {
          quantityChange = 0; // No change if stock is insufficient
        }
      } else {
        quantityChange = this.currentState.multiplier - itemToUpdate.quantity;
        if (this.canAddToCart(this.currentState.products, this.incomingPayload.id, quantityChange)) {
          cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: this.currentState.multiplier};
        } else {
          quantityChange = 0; // No change if stock is insufficient
        }
      }
    } else {
      const cartDataItem = {
        ...this.incomingPayload,
        quantity: this.currentState.multiplier > 0 ? this.currentState.multiplier : 1,
      };
      quantityChange = cartDataItem.quantity;
      if (this.canAddToCart(this.currentState.products, this.incomingPayload.id, quantityChange)) {
        cartListItems = [...cartListItems, cartDataItem];
      } else {
        quantityChange = 0; // No change if stock is insufficient
      }
    }

    cartListItems.sort((a, b) => a.name.localeCompare(b.name));

    const cartTotal = cartListItems.reduce((a, b) => a + b.quantity * b.price, 0);
    this.newTotalAmount = cartTotal;
    this.subTotal = (cartTotal * 100) / (100 + this.taxes);

    localStorage.setItem("cart", JSON.stringify(cartListItems));

    const updatedProducts = this.adjustProductStock(this.currentState.products, this.incomingPayload.id, quantityChange);

    return {
      ...this.currentState,
      cart: cartListItems,
      subTotal: this.subTotal,
      totalAmount: cartTotal,
      amountToBePaid: cartTotal,
      change: 0,
      multiplier: -1,
      products: updatedProducts,
    };
  }

  public executeNewTax(): SalesState {
    let cartListItems = [...this.currentState.cart];
    const itemIndexInCart = cartListItems.findIndex(item => item.id === this.incomingPayload.payload.id);
    let quantityChange = 0;

    if (itemIndexInCart > -1) {
      const itemToUpdate = cartListItems[itemIndexInCart];
      if (this.currentState.multiplier === 0) {
        quantityChange = -itemToUpdate.quantity;
        cartListItems.splice(itemIndexInCart, 1);
      } else if (this.currentState.multiplier === 1) {
        quantityChange = 1 - itemToUpdate.quantity;
        cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: 1};
      } else if (this.currentState.multiplier === -1) {
        quantityChange = 1;
        if (this.canAddToCart(this.currentState.products, this.incomingPayload.payload.id, quantityChange)) {
          cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: itemToUpdate.quantity + 1};
        } else {
          quantityChange = 0; // No change if stock is insufficient
        }
      } else {
        quantityChange = this.currentState.multiplier - itemToUpdate.quantity;
        if (this.canAddToCart(this.currentState.products, this.incomingPayload.payload.id, quantityChange)) {
          cartListItems[itemIndexInCart] = {...itemToUpdate, quantity: this.currentState.multiplier};
        } else {
          quantityChange = 0; // No change if stock is insufficient
        }
      }
    } else {
      const cartDataItem = {
        ...this.incomingPayload.payload,
        quantity: this.currentState.multiplier > 0 ? this.currentState.multiplier : 1,
      };
      quantityChange = cartDataItem.quantity;
      if (this.canAddToCart(this.currentState.products, this.incomingPayload.payload.id, quantityChange)) {
        cartListItems = [...cartListItems, cartDataItem];
      } else {
        quantityChange = 0; // No change if stock is insufficient
      }
    }


    cartListItems.sort((a, b) => a.name.localeCompare(b.name));

    this.subTotal = cartListItems.reduce((a, b) => a + b.quantity * b.price, 0);
    const cartTotal = this.taxService.calculateTaxLocalStorage(this.taxesNew, this.subTotal);
    this.newTotalAmount = cartTotal;

    localStorage.setItem("cart", JSON.stringify(cartListItems));

    const updatedProducts = this.adjustProductStock(this.currentState.products, this.incomingPayload.payload.id, quantityChange);

    return {
      ...this.currentState,
      cart: cartListItems,
      subTotal: this.subTotal,
      totalAmount: cartTotal,
      amountToBePaid: cartTotal,
      change: 0,
      multiplier: -1,
      products: updatedProducts,
    };
  }

  private adjustProductStock(products: any[], itemId: number, quantityChange: number): any[] {
    return products.map(product => {
      if (product.id === itemId && product.trackStock) {
        const updatedStock = product.stock - quantityChange;
        return {
          ...product,
          stock: updatedStock >= 0 ? updatedStock : 0,
        };
      }
      return product;
    });
  }

  private canAddToCart(products: any[], itemId: number, quantityChange: number): boolean {
    const product = products.find(product => product.id === itemId);
    if (product && product.trackStock) {
      return product.stock >= quantityChange;
    }
    return true;
  }
}

export default AddItemStrategy;
