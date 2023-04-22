// ** MUI Imports
import Grid from '@mui/material/Grid'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import { ApplicationsData, StatsDataType } from 'src/@core/utils/shared-types'
import {  Abacus, CellphoneLink, CurrencyUsd, TrendingUp } from 'mdi-material-ui'

const initStatsData: StatsDataType[] = [
  {
    stats: '',
    title: 'Apps',
    color: 'success',
    icon: <Abacus sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    title: 'Consumption',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'warning',
    title: 'Instances',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '',
    color: 'info',
    title: 'Cost',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const fetchAllApplicationsFromAPI = async () => {
  const res = await fetch('https://engineering-task.elancoapps.com/api/applications');
  return  res.json();
}

const fetchAllApplicationDetailsByNameFromAPI = async (name: string) => {
  const res = await fetch(`https://engineering-task.elancoapps.com/api/applications/${name}`);
  return  res.json();
}


const Dashboard = () => {
  const [statsData, setStatsData] = useState<StatsDataType[]>(initStatsData);
  const [appRows, setAppRows] = useState<ApplicationsData[]>([]);
  const [appName, setAppName] = useState<sting[]>([]); ;
  const { data: appsList= [] } = useQuery("appList", fetchAllApplicationsFromAPI);
  // const appName = appsList[0];
  let { isIdle, data: allAppsByName } = useQuery(["allAppsByName", appName],() => fetchAllApplicationDetailsByNameFromAPI(appName), {
    // The query will not execute until the appName exists
    enabled: !!appName,
  });
  

  const handleAppNameChange = (i: number) => {
    setAppName(appsList[i]);
  };

  useEffect(() => {
    setAppName(appName ?? appsList[0]);
  }, [appName]);
 
  useEffect(() => {
    setAppName(appsList[0])
  }, [appsList]);

  useEffect(() => {
    allAppsByName =  allAppsByName?.map((val: any, index: number) => ({
      ...val, id: index, consumedQuantity: Number(val.ConsumedQuantity),
      cost: Number(val.Cost),
    }));
    const costArray =  allAppsByName?.map((val: ApplicationsData) => val.cost);
    const totalCost: number =  costArray?.reduce((accumulator: number, currentValue: number) => accumulator + currentValue,0);
    const consumedQuantity =  allAppsByName?.map((val: ApplicationsData) => val.consumedQuantity);
    const totalConsumedQuantity =  consumedQuantity?.reduce((accumulator: number, currentValue: number) => accumulator + currentValue,0); 
    statsData[0].stats = appsList?.length;
    statsData[1].stats = totalConsumedQuantity?.toFixed(2);
    statsData[2].stats = allAppsByName?.length;
    statsData[3].stats = totalCost?.toFixed(2);
    setAppRows(allAppsByName);
    setStatsData(statsData);
  }, [allAppsByName]);
  
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <StatisticsCard statsData={statsData} appList={appsList} onSelectAppName={handleAppNameChange}/>
        </Grid>
        <Grid item xs={12}>
          <Table appRows={appRows} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
