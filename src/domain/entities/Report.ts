import Employee from "./Employee";
import Sale from "./Sale";

type Report = {
  employees: [Employee],
  paymentMethods: [string],
  sales: [Sale],
  subTotal: number,
  grandTotal: number
}

export default Report;
