import {SaleRequest} from "../requests/SaleRequest";

interface SaleStrategy {
  makeSale(saleRequest: SaleRequest, amountToBePaid: number): Promise<boolean>;
}

export default SaleStrategy;
