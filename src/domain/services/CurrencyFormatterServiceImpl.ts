export default class CurrencyFormatterServiceImpl {
  private readonly formatter: Intl.NumberFormat;

  public constructor() {
    this.formatter = new Intl.NumberFormat('en-US',
      {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
  }

  format(currency: number): string {
    return this.formatter.format(currency);
  }

}