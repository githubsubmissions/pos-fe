import {Tax, TaxNew} from "../../domain/entities/Tax";
import apiClient from "../utils/ApiClient";
import TaxRepository from "../../domain/repositories/TaxRepository";

const taxRootSegment = 'tax';

class TaxRepositoryImpl implements TaxRepository {
  async getTaxes(): Promise<Tax> {
    const taxes = await apiClient.get(`/${taxRootSegment}/fetchAll`);
    return taxes.data;
  }

  async fetchNewTaxes(): Promise<TaxNew[]> {
    const taxes = await apiClient.get(`/${taxRootSegment}/fetchAllNew`);
    return taxes.data;
  }

}

export default TaxRepositoryImpl;
