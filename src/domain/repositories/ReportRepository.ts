import {FetchReportRequest} from "../requests/FetchReportRequest";
import {ReportResponse} from "../responses/ReportResponse";

interface ReportRepository {

  fetchReport(fetchSaleRequest: FetchReportRequest): Promise<ReportResponse>

  formatDate(inputDate: Date): string

}

export default ReportRepository;
