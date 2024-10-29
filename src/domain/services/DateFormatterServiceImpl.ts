export default class DateFormatterServiceImpl {

  private readonly formatter: Intl.DateTimeFormat
  private readonly options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  public constructor() {
    this.formatter = new Intl.DateTimeFormat("en-US", this.options)
  }

  format(date: string): string {
    const newDate = new Date(date);
    return this.formatter.format(newDate);
  }

  dateOnly(date: string): string {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "short",
      day: "2-digit"
    };
    return newDate.toLocaleDateString(undefined, options);
  }

  timeOnly(date: string): string {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    };
    return newDate.toLocaleTimeString(undefined, options);
  }
}