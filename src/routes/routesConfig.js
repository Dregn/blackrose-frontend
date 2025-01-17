import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import CsvRecordsPage from '../pages/CsvRecordsPage';
import { Navigate } from 'react-router-dom';

const routesConfig = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />, // Redirect from / to /dashboard
    isProtected: true, // Optional: Adjust protection if needed
  },
  {
    path: '/login',
    element: <LoginPage />,
    isProtected: false,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    isProtected: true,
  },
  {
    path: '/csv-records',
    element: <CsvRecordsPage />,
    isProtected: true,
  },
];

export default routesConfig;