import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import taskApi from '../api/taskApi';
import userApi from '../api/userApi';
import taskTypeApi from '../api/taskTypeApi';
import roleApi from '../api/roleApi';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const [tasks, setTask] = useState([]);
  const [users, setUsers] = useState([]);
  const [taskType, setTaskType] = useState([]);
  const [roles, setRoles] = useState([]);

  const [january, setJanuary] = useState(0);
  const [february, setFebruary] = useState(0);
  const [march, setMarch] = useState(0);
  const [april, setApril] = useState(0);
  const [may, setMay] = useState(0);
  const [june, setJune] = useState(0);
  const [july, setJuly] = useState(0);
  const [august, setAugust] = useState(0);
  const [september, setSeptember] = useState(0);
  const [october, setOctober] = useState(0);
  const [november, setNovember] = useState(0);
  const [december, setDecember] = useState(0);

  const [user1, setUser1] = useState(0);
  const [user2, setUser2] = useState(0);
  const [user3, setUser3] = useState(0);
  const [user4, setUser4] = useState(0);
  const [user5, setUser5] = useState(0);
  const [user6, setUser6] = useState(0);
  const [user7, setUser7] = useState(0);
  const [user8, setUser8] = useState(0);
  const [user9, setUser9] = useState(0);
  const [user10, setUser10] = useState(0);
  const [user11, setUser11] = useState(0);
  const [user12, setUser12] = useState(0);

  const [taskWaiting, setTaskWaiting] = useState(0);
  const [taskDoing, setTaskDoing] = useState(0);
  const [taskFinish, setTaskFinish] = useState(0);
  const [taskCancel, setTaskCancel] = useState(0);


  useEffect(() => {
    const fetchTask = async () => {
      const response = await taskApi.getAll();
      setTask(response);
       const month1 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 1);
       setJanuary(month1.length);
       const month2 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 2);
       setFebruary(month2.length);
       const month3 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 3);
       setMarch(month3.length);
       const month4 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 4);
       setApril(month4.length);
       const month5 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 5);
       setMay(month5.length);
       const month6 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 6);
       setJune(month6.length);
       const month7 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 7);
       setJuly(month7.length);
       const month8 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 8);
       setAugust(month8.length);
       const month9 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 9);
       setSeptember(month9.length);
       const month10 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 10);
       setOctober(month10.length);
       const month11 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 11);
       setNovember(month11.length);
       const month12 = response.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 12);
       setDecember(month12.length);

       const task1 = response.filter(e => e.status === "Đang chờ thực hiện");
       setTaskWaiting(task1.length);
       const task2 = response.filter(e => e.status === "Đang thực hiện");
       setTaskDoing(task2.length);
       const task3 = response.filter(e => e.status === "Hoàn thành");
       setTaskFinish(task3.length);
       const task4 = response.filter(e => e.status === "Hủy bỏ");
       setTaskCancel(task4.length);
    };
    const fetchUsers = async () => {
      const responseUser = await userApi.getAll();
      setUsers(responseUser);
       const users1 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 1);
       setUser1(users1.length);
       const user2 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 2);
       setUser2(user2.length);
       const user3 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 3);
       setUser3(user3.length);
       const user4 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 4);
       setUser4(user4.length);
       const user5 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 5);
       setUser5(user5.length);
       const user6 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 6);
       setUser6(user6.length);
       const user7 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 7);
       setUser7(user7.length);
       const user8 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 8);
       setUser8(user8.length);
       const user9 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 9);
       setUser9(user9.length);
       const users10 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 10);
       setUser10(users10.length);
       const user11 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 11);
       setUser11(user11.length);
       const user12 = responseUser.filter(e => parseInt(e.createdAt.substring(5,7), 10) === 12);
       setUser12(user12.length);

    };
    const fetchTaskType = async () => {
      const response = await taskTypeApi.getTaskTypes();
      setTaskType(response);
    };
    const fetchRoles = async () => {
      const response = await roleApi.getAll();
      setRoles(response);
    };

    fetchTask();
    fetchUsers();
    fetchRoles();
    fetchTaskType();

    }, []);

  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Thống kê
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Công việc" total={tasks.length} color="success" icon={'ant-design:code-sandbox-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Người dùng" total={users.length} icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Vai trò" total={roles.length} color="warning" icon={'ant-design:star-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Loại công việc" total={taskType.length} color="error" icon={'ant-design:appstore-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Thống kê số lượng công việc và người dùng"
              subheader="trong năm 2022"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
                '12/01/2022',
              ]}
              chartData={[
                {
                  name: 'Công việc',
                  type: 'column',
                  fill: 'solid',
                  data: [january, february, march, april, may, june, july, august, september, october, november, december],
                },
                {
                  name: 'Người dùng',
                  type: 'area',
                  fill: 'gradient',
                  data: [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12],
                },
                {
                  name: '',
                  type: 'line',
                  fill: 'solid',
                  data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Thống kê danh mục"
              chartData={[
                { label: 'Công việc', value: tasks.length },
                { label: 'Người dùng', value: users.length },
                { label: 'Vai trò', value: roles.length },
                { label: 'Loại công việc', value: taskType.length },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.red[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.green[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Thống kê tiến độ công việc"
              subheader="trên tổng số lượng công việc"
              chartData={[
                { label: 'Đang chờ thực hiện', value: taskWaiting },
                { label: 'Đang thực hiện', value: taskDoing },
                { label: 'Hoàn thành', value: taskFinish },
                { label: 'Hủy bỏ', value: taskCancel },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
