import * as React from 'react';
import {ReactElement, useEffect, useState} from 'react';
import HighchartsReact from "highcharts-react-official";
import HighchartsRequest from "highcharts-library/lib/application/models/HighchartsRequest";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Grid from '@mui/material/Grid';
import ChartTypes from "highcharts-library/lib/domain/enums/ChartTypes";
import HighchartsButton from "./HighchartsButton";
import {
  AlignHorizontalLeft as AlignHorizontalLeftIcon,
  Equalizer as EqualizerIcon,
  Looks as LooksIcon,
  PieChart as PieChartIcon,
  Radar,
  StackedLineChart as StackedLineChartIcon
} from "@mui/icons-material";
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ChartFilter from "./ChartFilter";
import {Builder} from "builder-pattern";
import SubButtonComponent from "./SubButton";
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import GestureIcon from '@mui/icons-material/Gesture';
import AnalyticsService from "../../../domain/services/AnalyticsService";
import container from "../../../container";

interface ChartTypeIcons {
  [key: string]: ReactElement;
}

export default function Chart(props: {
  selectedChartType: string;
  setSelectedChartType: React.Dispatch<React.SetStateAction<string>>;
  highchartsRequest: HighchartsRequest;
  setHighchartsRequest: React.Dispatch<React.SetStateAction<HighchartsRequest>>;
}) {
  const {selectedChartType, setSelectedChartType, highchartsRequest, setHighchartsRequest} = props;

  const navigate = useNavigate();
  const analyticsService = container.resolve<AnalyticsService>('AnalyticsService');

  const [loading, setLoading] = useState(false);
  const [topDailyItems, setTopDailyItems] = useState(10);
  const [daysPrior, setDaysPrior] = useState(4);

  const [chartKey, setChartKey] = useState(0);
  const [chartConfig, setChartConfig] = useState({});

  const categories = Array.from(highchartsRequest.chartData.categories.values()).map(category => category.label);

  const switchChart = (newChartType: string) => {
    setSelectedChartType(newChartType);
    setChartKey((prevKey) => prevKey + 1);
    setHighchartsRequest((prevRequest: HighchartsRequest) => ({
      ...prevRequest,
      chartType: ChartTypes.getChartType(newChartType)
    }));
  };

  const chartTypeIcons: ChartTypeIcons = {
    column: <EqualizerIcon />,
    pie: <PieChartIcon />,
    bar: <AlignHorizontalLeftIcon />,
    [ChartTypes.STACKED_BAR.label]: <ClearAllIcon />,
    [ChartTypes.SPIDER_WEB.label]: <Radar />,
    [ChartTypes.LINE.label]: <StackedLineChartIcon />,
    [ChartTypes.STACKED_PERCENTAGE_COLUMN.label]: <ViewColumnIcon />,
    [ChartTypes.SEMI_CIRCLE_DONUT.label]: <LooksIcon />,
    [ChartTypes.STACKED_COLUMN.label]: <StackedBarChartIcon />,
    [ChartTypes.STACKED_PERCENTAGE_BAR.label]: <LineStyleIcon />,
    [ChartTypes.AREA.label]: <FormatPaintIcon />,
    [ChartTypes.AREASPLINE.label]: <FormatColorFillIcon />,
    [ChartTypes.SPLINE.label]: <GestureIcon />,

  };

  const setChartCategory = (category: string) => {
    const updatedHighChartsRequest = Builder(HighchartsRequest)
      .chartData(highchartsRequest.chartData)
      .chartType(ChartTypes.getChartType(selectedChartType))
      .selectedCategory(category)
      .build();

    setHighchartsRequest(updatedHighChartsRequest)
  };


  const getSubIcons = () => {
    return categories.map(category => ({
      icon: <SubButtonComponent onClick={() => setChartCategory(category)}
                                color={'success'}>
        {category}
      </SubButtonComponent>,
      category: category,
      tooltip: '',
      onClick: () => {
      }
    }));
  }

  const chartTypeButtons = () => {
    const excludedCharts = ["map", "tile", "table"];
    const preferredOrder = [
      ChartTypes.LINE,
      ChartTypes.COLUMN,
      ChartTypes.PIE,
      ChartTypes.SEMI_CIRCLE_DONUT,
      ChartTypes.BAR,
      ChartTypes.STACKED_BAR,
      ChartTypes.STACKED_PERCENTAGE_COLUMN,
      ChartTypes.STACKED_COLUMN,
      ChartTypes.STACKED_PERCENTAGE_BAR,
      ChartTypes.AREA,
      ChartTypes.AREASPLINE,
      ChartTypes.SPLINE
      // ChartTypes.ORGANOGRAM.label,
      // ChartTypes.SPIDER_WEB
    ];

    const chartTypes = Object.values(ChartTypes)
      .filter((chartType) => chartType.label && !excludedCharts.includes(chartType.label))
      .filter((chartType) => chartType.label && preferredOrder.some((order) => order.label === chartType.label))
      .sort((a, b) => preferredOrder.findIndex((order) => order.label === a.label) - preferredOrder.findIndex((order) => order.label === b.label));

    return chartTypes.map((chartType) => (
      <HighchartsButton key={chartType.value}
                        mainIcon={chartTypeIcons[chartType.label]}
                        mainIconType={chartType.label}
                        tooltip={chartType.display}
                        onClick={() => switchChart(chartType.label)}
                        style={{backgroundColor: selectedChartType === chartType.label ? 'green' : 'inherit'}}
                        selectedChartType={selectedChartType}
                        selectedCategory={highchartsRequest.selectedCategory}
                        subIcons={getSubIcons()}
      />
    ));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const updatedHighchartsRequest = {
        ...highchartsRequest,
        field1: topDailyItems,
        field2: daysPrior
      };
      setHighchartsRequest(updatedHighchartsRequest);
      getPriorDaysSaleData(true);
    } catch (error: any) {
    } finally {
      setTimeout(() => {
        // Code to execute after the specified delay
        setLoading(false);
      }, 3000); // Set loading state to false when data retrieval is completed (whether successful or not)
    }
  };

  const getTodaySales = async () => {
    try {
      const highchartsResponse = await analyticsService.getTodaySalesData(highchartsRequest, selectedChartType, setHighchartsRequest);
      setChartConfig(highchartsResponse.chartConfig);
      return highchartsResponse.chartConfig; // Resolve the promise with chart config
    } catch (error: any) {
      console.log(error);
      if (!error.response) toast.error("API might be down!");
      if (error.response?.data.statusCode === 401) navigate("/");
      // const message = error.response?.data.detailedMessage;
      // toast.error(message);
      // throw error; // Re-throw the error to propagate it
    }
  };

  const getPriorDaysSaleData = (fetch: boolean) => {
    analyticsService.getPriorDaysSaleData(highchartsRequest, selectedChartType, setHighchartsRequest, topDailyItems, daysPrior, fetch)
      .then((highchartsResponse) => {
        setChartConfig(highchartsResponse.chartConfig);
      })
      .catch((error: any) => {
        console.log(error)
        if (!error.response) toast.error("API might be down!");
        if (error.response.data.statusCode === 401) navigate("/");
        // const message = error.response.data.detailedMessage;
        // toast.error(message);
      });
  };

  useEffect(() => {
    // getTodaySales();
    getPriorDaysSaleData(false);
  }, [selectedChartType, highchartsRequest.selectedCategory]);

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [selectedChartType]);

  return (
    <React.Fragment>
      <Grid container spacing={1} justifyContent={"space-between"} sx={{height: "80%"}}>
        <Grid item xs={12} md={6} lg={6} container justifyContent="flex-start">
          <ChartFilter
            topDailyItems={topDailyItems}
            daysPrior={daysPrior}
            loading={loading}
            onTopDailyItemsChange={setTopDailyItems}
            onDaysPriorChange={setDaysPrior}
            onSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} container justifyContent="flex-end">
          <Grid item xs={12} container justifyContent="flex-end">
            {chartTypeButtons()}
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{height: "100%"}}>
          <HighchartsReact
            key={chartKey}
            containerProps={{style: {height: '100%'}}}
            highcharts={window.Highcharts}
            options={chartConfig}
          />
        </Grid>
      </Grid>
    </React.Fragment>);
}
