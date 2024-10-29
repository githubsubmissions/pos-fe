import {Tax, TaxNew} from "../entities/Tax";

interface TaxRepository {
  getTaxes(): Promise<Tax>

  fetchNewTaxes(): Promise<TaxNew[]>;
}

export default TaxRepository;
