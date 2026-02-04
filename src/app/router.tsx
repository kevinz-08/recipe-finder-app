import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App'; // Importamos tu nuevo componente base
import { LandingPage } from '../presentation/pages/LandingPage';
import { LoginPage } from '../presentation/pages/LoginPage';
import { DashboardPage } from '../presentation/pages/DashboardPage';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // este es el "Padre" el cual tiene el Navbar y el <Outlet />
    children: [
      {
        index: true, // esto hace que la landing sea lo que se ve en la ruta "/"
        element: <LandingPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
      {
        path: ROUTES.DASHBOARD,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);