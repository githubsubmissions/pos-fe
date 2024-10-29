import apiClient from "../utils/ApiClient";
import PurchaseRepository from "../../domain/repositories/PurchaseRepository";

const purchasesRootSegment = 'purchases';

class PurchaseRepositoryImpl implements PurchaseRepository {

  async purchaseItems(purchases: any): Promise<any> {
    const purchaseData = await apiClient.post(`/${purchasesRootSegment}`, purchases);
    return purchaseData.data;
  }
}

export default PurchaseRepositoryImpl;
