import TaxService from "./TaxService";

class TaxServiceImpl implements TaxService {
  constructor(readonly taxType: "old" | "new") {
    this.taxType = taxType
  }

  calculateTaxLocalStorage(taxes: [], subTotal: number): number {
    const extractedTaxes = taxes.map((tax) => {
      const {name, percent} = tax;
      const taxPercent = parseFloat(percent);
      const taxValue = (taxPercent / 100) * subTotal;
      const roundedTaxValue = parseFloat(taxValue.toFixed(2));
      return {name, percent: taxPercent, value: roundedTaxValue};
    });

    const totalTaxValue = extractedTaxes.reduce((acc, tax) => acc + tax.value, 0);
    return subTotal + totalTaxValue;
  }

  calculateTaxesSaleResponse(taxes: {}, subTotal: number): { name: string, percent: number, value: number }[] {

    const extractedTaxes = Object.keys(taxes).map((key) => {
      const matches = key.match(/name=(.*?),.*percent=(\d+(?:\.\d+)?)/);
      if (matches) {
        const [, name, percent] = matches;
        const taxPercent = parseFloat(percent);
        const taxValue = taxPercent / 100 * subTotal;
        const roundedTaxValue = parseFloat(taxValue.toFixed(2));
        return {name, percent: taxPercent, value: roundedTaxValue};
      }
      return {name: "no tax", percent: 0, value: 0};
    }).filter(Boolean);

    return extractedTaxes;
  }

  getTaxType(): string {
    return this.taxType;
  }
}

export default TaxServiceImpl;
