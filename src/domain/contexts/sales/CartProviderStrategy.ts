import {SalesState} from "../../props/SalesState";
import {CartData} from "../../enums/CartData";
import {Item} from "../../entities/Item";
import TaxService from "../../services/TaxService";

export abstract class CartProviderStrategy {
  protected products: Item[] = []

  protected taxes: number = 12.5;
  protected taxesNew = JSON.parse(localStorage.getItem('taxes')!);

  protected updatedCart: Item[];
  protected newTotalAmount: number;
  protected subTotal: number;
  protected change: number;

  protected currentState: SalesState
  protected incomingPayload: Item | number | any; // FIXME

  constructor(currentState: SalesState, payload: CartData | any, readonly taxService: TaxService) {
    this.taxService = taxService;

    this.updatedCart = currentState.cart;
    this.newTotalAmount = currentState.totalAmount;
    this.subTotal = currentState.subTotal;
    this.change = currentState.change;

    this.currentState = currentState
    this.incomingPayload = payload
  }

  public abstract execute(): SalesState;

  public abstract executeOldTax(): SalesState;

  public abstract executeNewTax(): SalesState;

  public removeItemFromCart(): SalesState {
    const itemIndexInCart = this.currentState.cart.findIndex((item) => item.id === this.incomingPayload);

    if (itemIndexInCart !== -1) {
      const item = this.updatedCart[itemIndexInCart];

      const product = this.currentState.products.find(product => product.id === item.id);
      if (product && product.trackStock) {
        product.stock += item.quantity;
      }

      const newCart = [...this.updatedCart];
      newCart.splice(itemIndexInCart, 1);

      const cartTotal = newCart.reduce((a, b) => a + b.quantity * b.price, 0);
      const newTotalAmount = cartTotal;
      const subTotal = (cartTotal * 100) / (100 + this.taxes);

      const change = this.currentState.amountToBePaid - newTotalAmount;

      localStorage.setItem("cart", JSON.stringify(newCart));

      return {
        ...this.currentState,
        cart: newCart,
        subTotal: subTotal,
        totalAmount: newTotalAmount,
        amountToBePaid: newTotalAmount,
        change: change >= 0 ? change : 0,
        multiplier: -1,
        products: this.currentState.products,
      };
    }

    return this.currentState;
  }

}
