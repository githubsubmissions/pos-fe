import {AnalyticsItem} from "../entities/AnalyticsItem";
import ChartData from "highcharts-library/lib/domain/models/ChartData";


interface AnalyticsRepository {
  getTodaySalesData(): Promise<[AnalyticsItem]>

  getPriorDaysSaleData(topDailyItems: number, days: number): Promise<ChartData>
}

export default AnalyticsRepository;
