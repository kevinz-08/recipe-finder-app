import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './MainLayout';
import AuthLayout from './AuthLayout';
import { ROUTES } from './routes';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import ProtectedRoute from '@/pages/ProtectedRoute';
import { RegisterPage } from '@/pages/RegisterPage';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <LandingPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.DASHBOARD,
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);
