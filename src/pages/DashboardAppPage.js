import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Select, Switch } from '@mui/material';
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
import { cardIconStyle, cardTitle } from '../helpers/carddataHelper';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  const crops = useSelector((state) => state.crops);
  const users = useSelector((state) => state.users);

  const [cardStat1, setCardStat1] = useState(0);
  const [cardStat2, setcardStat2] = useState(0);
  const [cardStat3, setcardStat3] = useState(0);
  const [cardStat4, setcardStat4] = useState(0);
  const [cropAnlytics, setCropAnalytics] = useState([]);
  const [chartDates, setChartDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [userType, setUserType] = useState('');

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

    //  console.log(crops.crops)

    if (users.users.length > 0 && crops.crops.length > 0) {
      if (user.user.type === 'Officer') {
        setCardStat1(users.users.filter(user => user.type === 'Farmer').length);
      }
      if (user.user.type === 'Farmer') {
        setCardStat1(crops.crops.length);
      }

      if (user.user.type === 'Officer') {
        setcardStat2(crops.crops.length);
      }
      if (user.user.type === 'Farmer') {
        setcardStat2(users.users.filter(thisUser => thisUser._id === user.user._id)[0].cultivation.length);
      }

      if (user.user.type === 'Officer') {
        setcardStat3(0);
      }
      if (user.user.type === 'Farmer') {
        const cultivations = users.users.filter(thisUser => thisUser._id === user.user._id)[0].cultivation;
        if (cultivations.length > 0) {
          setcardStat3(cultivations.filter(c => c.status === 'Ready').length);
        }
      }

      if (user.user.type === 'Officer') {
        setcardStat4(0);
      }
      if (user.user.type === 'Farmer') {
        const cultivations = users.users.filter(thisUser => thisUser._id === user.user._id)[0].cultivation;
        if (cultivations.length > 0) {
          setcardStat4(cultivations.filter(c => c.status === 'Progress').length);
        }
      }

      setCropAnalytics(crops.crops.filter(crop => targetCrops.includes(crop._id)));
      let chartLabels = [];

      cropAnlytics.forEach(crop => {
        crop.statistics.forEach(stat => {
          const dateStr = `${String(stat.month).padStart(2, '0')}/01/${stat.year}`;
          chartLabels.push(dateStr);
        });
      });

      chartLabels = [...new Set(chartLabels)].sort();

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
            <AppWidgetSummary title={cardStat1 === 0 ? '---' : cardTitle(1, userType)} total={cardStat1} icon={cardIconStyle(1, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat2 === 0 ? '---' : cardTitle(2, userType)} total={cardStat2} color="info" icon={cardIconStyle(2, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat3 === 0 ? '---' : cardTitle(3, userType)} total={cardStat3} color="success" icon={cardIconStyle(3, userType)} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={cardStat4 === 0 ? '---' : cardTitle(4, userType)} total={cardStat4} color="warning" icon={cardIconStyle(4, userType)} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {chartDates.length > 0 && (
              <AppWebsiteVisits
                title="Demand Analytics"
                subheader={`From ${chartDates[0]} to ${chartDates[chartDates.length - 1]}`}
                chartLabels={chartDates}
                chartData={[
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[0].name : '---',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27],
                  },
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[1].name : '---',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67],
                  },
                  {
                    name: cropAnlytics.length > 0 ? cropAnlytics[2].name : '---',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30],
                  },
                ]}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>


        </Grid>
      </Container>
    </>
  );
}
