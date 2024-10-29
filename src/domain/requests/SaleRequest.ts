import SaleDetail from "../entities/SaleDetail";

export type SaleRequest = {
  saleDetail: SaleDetail[],
  paymentMethod: string,
  taxes: string
}
