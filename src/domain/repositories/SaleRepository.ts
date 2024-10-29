import {SaleRequest} from "../requests/SaleRequest";
import {SaleResponse} from "../responses/SaleResponse";

interface SaleRepository {
  makeSale(saleRequest: SaleRequest): Promise<SaleResponse>

  makeSaleNew(saleRequest: SaleRequest): Promise<SaleResponse>
}

export default SaleRepository;
