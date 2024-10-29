import SaleStrategy from "./SaleStrategy";
import {SaleRequest} from "../requests/SaleRequest";
import {toast} from "react-toastify";
import SaleRepository from "../repositories/SaleRepository";
import {PrintService} from "../services/PrintService";

class NewTaxSaleStrategyImpl implements SaleStrategy {
  private readonly saleRepository;
  private readonly printService;

  constructor(
    saleRepository: SaleRepository,
    printService: PrintService
  ) {
    this.saleRepository = saleRepository;
    this.printService = printService;
  }

  async makeSale(saleRequest: SaleRequest, amountToBePaid: number): Promise<boolean> {
    try {
      const response = await this.saleRepository.makeSaleNew(saleRequest);
      toast.success('Successful');
      this.printService.printReceipt(response.saleDo, amountToBePaid);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default NewTaxSaleStrategyImpl;
