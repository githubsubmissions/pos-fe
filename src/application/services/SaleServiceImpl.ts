import SaleService from "./SaleService";
import SaleContext from "../../domain/strategies/SaleContext";
import {SaleRequest} from "../../domain/requests/SaleRequest";

export default class SaleServiceImpl implements SaleService {

  private readonly saleContext;

  constructor(saleContext: SaleContext, readonly taxType: "old" | "new") {
    this.saleContext = saleContext
  }

  makeSale(saleRequest: SaleRequest, amountToBePaid: number): Promise<boolean> {
    return this.saleContext.getStrategy(this.taxType)
      .makeSale(saleRequest, amountToBePaid);
  }
}