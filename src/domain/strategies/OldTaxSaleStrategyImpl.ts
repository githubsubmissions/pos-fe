import SaleStrategy from "./SaleStrategy";
import {toast} from "react-toastify";
import SaleRepository from "../repositories/SaleRepository";
import {SaleRequest} from "../requests/SaleRequest";
import {PrintService} from "../services/PrintService";

class OldTaxSaleStrategyImpl implements SaleStrategy {

  private readonly saleRepository;
  private readonly printService;
  // private readonly navigate;
  // private readonly cartContext = useContext(CartContext);

  constructor(saleRepository: SaleRepository, printService: PrintService) {
    this.saleRepository = saleRepository;
    this.printService = printService;
  }

  async makeSale(saleRequest: SaleRequest, amountToBePaid: number): Promise<boolean> {
    try {
      const response = await this.saleRepository.makeSale(saleRequest);
      toast.success('Successful');
      this.printService.printReceipt(response.data, amountToBePaid);
      return true;
    } catch (error) {
      throw error;
    }
  }

}

export default OldTaxSaleStrategyImpl;
