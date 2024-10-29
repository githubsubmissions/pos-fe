import Employee from "./Employee";
import SaleDetail from "./SaleDetail";
import {Tax} from "./Tax";

type Sale = {
  employeeDo: Employee,
  grandTotal: number,
  paymentMethod: string,
  saleDetails: [SaleDetail],
  subTotal: number,
  taxes: {
    VAT: Tax,
    tax2: Tax,
    tax3: Tax
  }
}

export default Sale;
