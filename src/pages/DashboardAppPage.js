import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, Switch } from '@mui/material';
import { set } from 'lodash';
// components

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { getCrops } from '../features/crops/cropSlice';
import { getUsers } from '../features/users/usersSlice';
import Iconify from '../components/iconify';
import { cardIconStyle, cardTitle, sellerStat } from '../helpers/carddataHelper';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const crops = useSelector((state) => state.crops);
  const users = useSelector((state) => state.users);

  const [cardStat1, setCardStat1] = useState(-1);
  const [cardStat2, setcardStat2] = useState(-1);
  const [cardStat3, setcardStat3] = useState(-1);
  const [cardStat4, setcardStat4] = useState(-1);
  const [cropAnlytics, setCropAnalytics] = useState([]);
  const [cropDemand, setCropDemand] = useState([]);
  const [chartDates, setChartDates] = useState([]);
  const [userType, setUserType] = useState('');
  const [cultivationData, setCultivationData] = useState([]);
  const [pieChartTitle, setPieChartTitle] = useState('---');


  const targetCrops = ['64fe09929213ed8c3ff22ae3', '65088ae1ef48dd4f1f04e848', '65088b92ef48dd4f1f04e852'];


  const dispatch = useDispatch();
  useEffect(() => {
    if (user.user === null) {
      navigate('/login', { replace: true });
    } else {
      setUserType(user.user.type)
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCrops());
  }, [dispatch]);



  useEffect(() => {


    if (users.users.length > 0 && crops.crops.length > 0) {
     // const cropDemandSet = [];

      if (user.user.type === 'Officer') {
        setCardStat1(users.users.filter(user => user.type === 'Farmer').length);
        setPieChartTitle('Overall Crop Targets');
        if (crops.crops.length > 0) {
          setCultivationData(
            crops.crops
              .filter(crop => crop.statistics && crop.statistics.length > 0)
              .map(crop => ({
                label: crop.name,
                value: crop.statistics[crop.statistics.length - 1].quantity
              })));
              setcardStat2(crops.crops.length);
        }
        
        setcardStat3(users.users.filter(user => user.type === 'Buyer').length);
        setcardStat4(users.users.filter(user => user.type === 'Seller').length);
      }


      if (user.user.type === 'Farmer') {
        const cultivations = users.users.filter(thisUser => thisUser._id === user.user._id)[0].cultivation || [];
        const currentUserCultivations = users.users.find(thisUser => thisUser._id === user.user._id)?.cultivation || [];
        setCardStat1(crops.crops.length);
        setPieChartTitle('My Cultivations');
        setcardStat2(users.users.filter(thisUser => thisUser._id === user.user._id)[0].cultivation.length);

        const transformedCultivationData = currentUserCultivations.map(cultivation => ({
          label: cultivation.name,
          value: cultivation.quantity
        }));

        setCultivationData(transformedCultivationData);


        if (cultivations.length > 0) {
          setcardStat3(cultivations.filter(c => c.status === 'Ready').length);
        }

        if (cultivations.length > 0) {
          setcardStat4(cultivations.filter(c => c.status === 'Progress').length);
        }
      }

      if (user.user.type === 'Seller') {
        setCardStat1(9);
        setPieChartTitle('Stocks status');
        setcardStat2(9);
        setcardStat3(1403);
        setcardStat4(4);
        setCultivationData(sellerStat);
      }
        

      setCropAnalytics(crops.crops.filter(crop => targetCrops.includes(crop._id)));
      let cropStat = [];
      let chartLabels = [];
      const fullArr = [];

      cropAnlytics.forEach(crop => {
        chartLabels = [];
        crop.statistics.forEach(stat => {
          const dateStr = `${String(stat.month).padStart(2, '0')}/01/${stat.year}`;
          chartLabels.push(dateStr);
          cropStat.push(stat.quantity);
        });

        fullArr.push(cropStat);
        cropStat = [];
      });
      setCropDemand(fullArr);
      if (chartLabels.length > 0) {
        setChartDates(chartLabels);
      }

    }

  }, [users, crops]);


  return (
    <>
      <Helmet>
        <title> Dashboard | CPSMCD </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat1 === -1 ? '---' : cardTitle(1, userType)} total={cardStat1} icon={cardIconStyle(1, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat2 === -1 ? '---' : cardTitle(2, userType)} total={cardStat2} color="info" icon={cardIconStyle(2, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat3 === -1 ? '---' : cardTitle(3, userType)} total={cardStat3} color="success" icon={cardIconStyle(3, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat4 === -1 ? '---' : cardTitle(4, userType)} total={cardStat4} color="warning" icon={cardIconStyle(4, userType)} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {(chartDates.length > 0 && cropDemand.length > 0) && (
              <AppWebsiteVisits
                title="Crop Demand Analytics"
                subheader={`From ${chartDates[0]} to ${chartDates[chartDates.length - 1]}`}
                chartLabels={chartDates}
                chartData={[
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[0].name : '---',
                    type: 'line',
                    fill: 'solid',
                    data: cropDemand[0],
                  },
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[1].name : '---',
                    type: 'line',
                    fill: 'solid',
                    data: cropDemand[1],
                  },
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[2].name : '---',
                    type: 'line',
                    fill: 'solid',
                    data: cropDemand[2],
                  },
                ]}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title={pieChartTitle}
              chartData={cultivationData}
            />
          </Grid>


        </Grid>
      </Container>
    </>
  );
}
