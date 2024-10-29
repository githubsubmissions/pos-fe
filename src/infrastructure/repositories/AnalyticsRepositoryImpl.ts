import apiClient from "../utils/ApiClient";
import AnalyticsRepository from "../../domain/repositories/AnalyticsRepository";
import {AnalyticsItem} from "../../domain/entities/AnalyticsItem";
import ChartData from "highcharts-library/lib/domain/models/ChartData";

const rootUrlSegment = 'analytics';

class AnalyticsRepositoryImpl implements AnalyticsRepository {
  async getTodaySalesData(): Promise<[AnalyticsItem]> {
    // toast.info("API FETCH 2day");
    const responseData = await apiClient.get(`/${rootUrlSegment}/today/sales`);
    return responseData.data;
  }

  async getPriorDaysSaleData(topDailyItems: number, days: number): Promise<ChartData> {
    // toast.info("API FETCH");
    const params = {params: {topDailyItems: topDailyItems, days: days}}
    const responseData = await apiClient.get(`/${rootUrlSegment}/sales/daysago`, params);
    return responseData.data;
  }

}

export default AnalyticsRepositoryImpl;
