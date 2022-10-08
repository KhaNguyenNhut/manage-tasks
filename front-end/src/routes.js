import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import AddNewTask from './pages/AddNewTask';
import AddNewUser from './pages/AddNewUser';
import DashboardApp from './pages/DashboardApp';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Task from './pages/Task';
import User from './pages/User';
import Role from './pages/Role';
import Profile from './pages/Profile';
import AddNewRole from './pages/AddNewRole';
import TaskInfo from './pages/TaskInfo';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'profile', element: <Profile /> },
        { path: 'add-new-user', element: <AddNewUser /> },
        { path: 'edit-user/:id', element: <AddNewUser /> },
        { path: 'task', element: <Task /> },
        { path: 'role', element: <Role /> },
        { path: 'add-new-role', element: <AddNewRole /> },
        { path: 'edit-role/:id', element: <AddNewRole /> },
        { path: 'add-new-task', element: <AddNewTask /> },
        { path: 'edit-task/:id', element: <AddNewTask /> },
        { path: 'task-info/:id', element: <TaskInfo /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
