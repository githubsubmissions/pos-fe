import Report from "../entities/Report";
import ReportDetail from "../entities/ReportDetail";

export interface ReportResponse {
  message: string,
  report: Report,
  status: boolean,
  reportDetail: [ReportDetail]
}

