import Employee from "./Employee";
import {Item} from "./Item";

interface ReportDetail {
  lastSaleDetailId: number,
  name: string,
  category: string,
  quantity: number,
  price: number,
  total: number,
  itemDo: Item,
  paymentMethod: any,
  employees: [Employee]
}

export default ReportDetail;
