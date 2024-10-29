import {FetchReportRequest} from "../../domain/requests/FetchReportRequest";
import {ReportResponse} from "../../domain/responses/ReportResponse";
import ReportRepository from "../../domain/repositories/ReportRepository";
import apiClient from "../utils/ApiClient";

const reportRootSegment = 'report';

class ReportRepositoryImpl implements ReportRepository {
  async fetchReport(fetchSaleRequest: FetchReportRequest): Promise<ReportResponse> {
    const fetchSaleDto = {
      email: fetchSaleRequest.email === 'all' ? null : fetchSaleRequest.email,
      startDate: this.formatDate(fetchSaleRequest.startDate),
      endDate: this.formatDate(fetchSaleRequest.endDate),
      paymentMethod: fetchSaleRequest.paymentMethod === 'all' ? null : fetchSaleRequest.paymentMethod
    };

    const saleResponse = await apiClient.get(`/${reportRootSegment}/sales/`, {params: fetchSaleDto});

    return saleResponse.data;
  }

  formatDate(inputDate: Date): string {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const hour = inputDate.getHours().toString().padStart(2, '0');
    const min = inputDate.getMinutes().toString().padStart(2, '0');
    const sec = inputDate.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }

}

export default ReportRepositoryImpl;
