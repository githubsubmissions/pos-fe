import SaleContext from "./SaleContext";
import SaleStrategy from "./SaleStrategy";
import OldTaxSaleStrategyImpl from "./OldTaxSaleStrategyImpl";
import NewTaxSaleStrategyImpl from "./NewTaxSaleStrategyImpl";
import SaleRepository from "../repositories/SaleRepository";
import {PrintService} from "../services/PrintService";

class SaleContextImpl implements SaleContext {

  private readonly saleStrategiesMap = new Map<String, SaleStrategy>();

  constructor(saleRepository: SaleRepository, printService: PrintService) {

    this.saleStrategiesMap.set("old", new OldTaxSaleStrategyImpl(saleRepository, printService));
    this.saleStrategiesMap.set("new", new NewTaxSaleStrategyImpl(saleRepository, printService));

  }

  getStrategy(taxType: "old" | "new"): SaleStrategy {
    return this.saleStrategiesMap.get(taxType)!;
  }
}

export default SaleContextImpl;
