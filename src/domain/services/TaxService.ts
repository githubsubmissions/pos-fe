interface TaxService {
  calculateTaxLocalStorage(taxes: [], subTotal: number): number;

  calculateTaxesSaleResponse(taxes: {}, subTotal: number): { name: string, percent: number, value: number }[];

  getTaxType(): string;
}

export default TaxService;
