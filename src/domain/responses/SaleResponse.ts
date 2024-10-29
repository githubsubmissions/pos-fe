import Sale from "../entities/Sale";
import SaleNew from "../entities/SaleNew";

export interface SaleResponse {
  message: string;
  status: boolean;
  data: Sale;
  saleDo: SaleNew;
}

