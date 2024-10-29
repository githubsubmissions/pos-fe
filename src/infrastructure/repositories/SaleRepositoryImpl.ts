import SaleRepository from "../../domain/repositories/SaleRepository";
import apiClient from "../utils/ApiClient";
import {SaleRequest} from "../../domain/requests/SaleRequest";
import {SaleResponse} from "../../domain/responses/SaleResponse";

const saleRootSegment = 'sale';

class SaleRepositoryImpl implements SaleRepository {
  async makeSale(saleRequest: SaleRequest): Promise<SaleResponse> {
    saleRequest.taxes = JSON.parse(saleRequest.taxes);
    const saleResponse = await apiClient.post(`/${saleRootSegment}/create`, saleRequest);
    return saleResponse.data;
  }

  async makeSaleNew(saleRequest: SaleRequest): Promise<SaleResponse> {
    saleRequest.taxes = JSON.parse(saleRequest.taxes);
    const saleResponse = await apiClient.post(`/${saleRootSegment}/make`, saleRequest);
    return saleResponse.data;
  }
}

export default SaleRepositoryImpl;
