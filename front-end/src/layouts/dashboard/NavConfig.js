// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Thống kê',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Quản lý người dùng',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Quản lý công việc',
    path: '/dashboard/task',
    icon: getIcon('eva:monitor-fill'),
  },
  {
    title: 'Quản lý vai trò',
    path: '/dashboard/role',
    icon: getIcon('eva:star-fill'),
  },
  {
    title: 'Quản lý loại công việc',
    path: '/dashboard/type-task',
    icon: getIcon('eva:grid-fill'),
  },
];

export default navConfig;
