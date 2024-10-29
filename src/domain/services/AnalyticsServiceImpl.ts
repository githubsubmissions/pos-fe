import AnalyticsService from "./AnalyticsService";
import ChartData from "highcharts-library/lib/domain/models/ChartData";
import type IHighchartsFactory from "highcharts-library/lib/domain/factories/IHighchartsFactory";
import type IHighchartsFormatter from "highcharts-library/lib/domain/formatters/IHighchartsFormatter";
import type AnalyticsRepository from "../repositories/AnalyticsRepository";
import {Builder} from "builder-pattern";
import Category from "highcharts-library/lib/domain/models/Category";
import {CategoryTypes} from "highcharts-library/lib/domain/enums/CategoryTypes";
import DataPoint from "highcharts-library/lib/domain/models/DataPoint";
import Series from "highcharts-library/lib/domain/models/Series";
import Unit from "highcharts-library/lib/domain/models/Unit";
import UnitTypes from "highcharts-library/lib/domain/enums/UnitTypes";
import HighchartsRequest from "highcharts-library/lib/application/models/HighchartsRequest";
import HighchartsResponse from "highcharts-library/lib/application/models/HighchartsResponse";
import {AnalyticsItem} from "../entities/AnalyticsItem";
import ChartTypes from "highcharts-library/lib/domain/enums/ChartTypes";
import {SetStateAction} from "react";

class AnalyticsServiceImpl implements AnalyticsService {

  private readonly highchartsFormatter;
  private readonly highchartsFactory;
  private readonly analyticsRepository;

  constructor(
    highchartsFormatter: IHighchartsFormatter,
    highchartsFactory: IHighchartsFactory,
    analyticsRepository: AnalyticsRepository
  ) {
    this.highchartsFormatter = highchartsFormatter;
    this.highchartsFactory = highchartsFactory;
    this.analyticsRepository = analyticsRepository;
  }

  async getTodaySalesData(highchartsRequest: HighchartsRequest,
                          selectedChartType: string,
                          setHighchartsRequestToday: (value: (((prevState: HighchartsRequest) => HighchartsRequest) | HighchartsRequest)) => void): Promise<HighchartsResponse> {

    let chartData = highchartsRequest.chartData;
    if (highchartsRequest.chartData.seriesList.length === 0) {
      const todaySalesData: AnalyticsItem[] = await this.analyticsRepository.getTodaySalesData();

      const seriesList = todaySalesData.map(item => {
        const category = Builder(Category).label(item.date).categoryType(CategoryTypes.DEFAULT).value(1).build();
        const dataPoint = Builder(DataPoint).y(item.quantitySold).category(category).build();
        const singleItemDataPoints = new Array<DataPoint>(dataPoint);
        return Builder(Series).name(item.name).isVisible(true).values(singleItemDataPoints).build();
      });

      const seriesUnit = Builder(Unit)
        .name("Quantity")
        .axisName("Quantity Sold")
        .unitType(UnitTypes.DEFAULT)
        .prefix("")
        .suffix("")
        .decimalPlaces(2)
        .build();
      const categories = seriesList
        .flatMap((oneSeries) => oneSeries.values)
        .map((dataP: { category: any }) => dataP.category)
        .map((category: { label: any }) => [category.label, category]);

      chartData = Builder(ChartData)
        .id("special")
        .title("SALES TODAY")
        // .defaultChartType(ChartTypes.COLUMN)
        .categories(new Map<string, Category>(Object.assign(categories))) // what's this property for
        .seriesList(seriesList)
        .defaultCategory("3")
        .unit(seriesUnit)
        // .colours([COLOUR_CODES[5], COLOUR_CODES[9]]) // use default colour scheme cause Builder default
        .build();

    }

    const updatedHighChartsRequest = Builder(HighchartsRequest)
      .chartData(chartData)
      .chartType(ChartTypes.getChartType(selectedChartType))
      .selectedCategory(highchartsRequest.selectedCategory)
      .build()

    setHighchartsRequestToday(updatedHighChartsRequest)

    return this.highchartsFactory.getChart(chartData, updatedHighChartsRequest);
  }

  async getPriorDaysSaleData(highchartsRequest: HighchartsRequest, selectedChartType: string, setHighchartsRequest: { (value: SetStateAction<HighchartsRequest>): void; (arg0: HighchartsRequest): void; }, topDailyItems: number, daysPrior: number, fetch: boolean): Promise<HighchartsResponse> {

    let chartData: ChartData = highchartsRequest.chartData;

    // INFO ... kinda caching
    if (chartData.seriesList.length === 0 || fetch) {
      const responseChartData = await this.analyticsRepository.getPriorDaysSaleData(topDailyItems, daysPrior);
      const categoriesMap = new Map<string, Category>();
      Object.entries(responseChartData.categories).forEach(([key, value]) => {
        const category = new Category();
        category.label = value.label;
        category.key = value.key ?? "";
        category.value = value.value;
        category.categoryType = CategoryTypes[value.categoryType as keyof typeof CategoryTypes];
        categoriesMap.set(key, category);
      });

      const seriesArray: Array<Series> = responseChartData.seriesList.map(series => {
        const dataPoints: Array<DataPoint> = series.values.map(value => {
          const dataPoint = new DataPoint();
          dataPoint.category = {
            label: value.category.label,
            key: value.category.key ?? "",
            value: value.category.value,
            categoryType: CategoryTypes[value.category.categoryType as unknown as keyof typeof CategoryTypes]
          };
          dataPoint.y = value.y;
          return dataPoint;
        });

        return Builder<Series>()
          .name(series.name)
          .description(series.description ?? "")
          .key(series.key ?? "")
          .seriesType(series.seriesType)
          .isVisible(series.isVisible)
          .values(dataPoints)
          .unit(Builder<Unit>().unitType(UnitTypes.UNKNOWN).build())
          .meta(new Map<string, string>())
          .build();
      });

      const unitObject = responseChartData.unit;
      const unit = Builder<Unit>()
        .name(unitObject.name)
        .description(unitObject.description || "no description")
        .axisName(unitObject.axisName)
        .prefix(unitObject.prefix)
        .suffix(unitObject.suffix)
        .decimalPlaces(unitObject.decimalPlaces)
        .unitType(unitObject.unitType)
        .build();

      chartData = Builder(ChartData)
        .categories(categoriesMap)
        .seriesList(seriesArray)
        .id(responseChartData.id)
        .unit(unit)
        .defaultCategory(Object.values(responseChartData.categories)[Object.keys(responseChartData.categories).length - 1].label)
        .title(responseChartData.title)
        .colours(responseChartData.colours)
        .build();

    }

    const updatedHighChartsRequest = Builder(HighchartsRequest)
      .chartData(chartData)
      .chartType(ChartTypes.getChartType(selectedChartType))
      .selectedCategory(highchartsRequest.selectedCategory)
      .build()

    setHighchartsRequest(updatedHighChartsRequest)

    return this.highchartsFactory.getChart(chartData, updatedHighChartsRequest);
  }

}

export default AnalyticsServiceImpl;
