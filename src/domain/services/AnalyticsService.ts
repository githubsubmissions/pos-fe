import HighchartsResponse from "highcharts-library/lib/application/models/HighchartsResponse";
import HighchartsRequest from "highcharts-library/lib/application/models/HighchartsRequest";


interface AnalyticsService {
  getTodaySalesData(highchartsRequest: HighchartsRequest, selectedChartType: string, setHighchartsRequestToday: (value: (((prevState: HighchartsRequest) => HighchartsRequest) | HighchartsRequest)) => void): Promise<HighchartsResponse>

  getPriorDaysSaleData(highchartsRequest: HighchartsRequest, selectedChartType: string, setHighchartsRequest: any, topDailyItems: number, daysPrior: number, fetch: boolean): Promise<HighchartsResponse>
}

export default AnalyticsService;
