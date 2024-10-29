import * as React from 'react';
import {useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../../components/dashboard/Chart';
import ChartTypes from "highcharts-library/lib/domain/enums/ChartTypes";
import {Builder} from "builder-pattern";
import HighchartsRequest from "highcharts-library/lib/application/models/HighchartsRequest";

function DashboardContent() {

  const [chartInfo, setChartInfo] = useState([
    {id: 1, selectedChartType: ChartTypes.COLUMN.label, highchartsRequest: Builder(HighchartsRequest).build},
    {id: 2, selectedChartType: ChartTypes.PIE.label, highchartsRequest: Builder(HighchartsRequest).build},
    // Add more chart data objects as needed
  ]);

  const [selectedChartTypeToday, setSelectedChartTypeToday] = useState(ChartTypes.COLUMN.label);
  const [highchartsRequestToday, setHighchartsRequestToday] = useState(Builder(HighchartsRequest).build);

  const [selectedChartTypePrior, setSelectedChartTypePrior] = useState(ChartTypes.PIE.label);
  const [highchartsRequestPrior, setHighchartsRequestPrior] = useState(Builder(HighchartsRequest).build);

  return (
    <Grid container spacing={2}
          sx={{
            height: "100%",
            overflow: "auto"
          }}
    >
      <Grid item xs={12} sx={{height: "91%"}}>
        <Paper sx={{p: 1, display: 'flex', flexDirection: 'column', height: "95%", overflow: "auto"}}>
          <Chart
            selectedChartType={selectedChartTypeToday}
            setSelectedChartType={setSelectedChartTypeToday}
            highchartsRequest={highchartsRequestToday}
            setHighchartsRequest={setHighchartsRequestToday}
          />
        </Paper>
      </Grid>
      {/*<Grid item xs={12} sx={{height: "90%"}}>*/}
      {/*  <Paper sx={{p: 1, display: 'flex', flexDirection: 'column', height: "95%", overflow: "auto"}}>*/}
      {/*    <Chart*/}
      {/*      selectedChartType={selectedChartTypePrior}*/}
      {/*      setSelectedChartType={setSelectedChartTypePrior}*/}
      {/*      highchartsRequest={highchartsRequestPrior}*/}
      {/*      setHighchartsRequest={setHighchartsRequestPrior}*/}
      {/*    />*/}
      {/*  </Paper>*/}
      {/*</Grid>*/}
    </Grid>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
