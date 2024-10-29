import Sale from "../entities/Sale";
import {ReportResponse} from "../responses/ReportResponse";

export interface PrintService {
  printReceipt(saleData: Sale, paying: number): void;

  printReport(saleRequest: any, response: ReportResponse): void;

  checks(paying: number, grandTotal: number): boolean;
}