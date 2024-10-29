import {SaleRequest} from "../../domain/requests/SaleRequest";

export default interface SaleService {
  makeSale(saleRequest: SaleRequest, amountToBePaid: number): Promise<boolean>
}