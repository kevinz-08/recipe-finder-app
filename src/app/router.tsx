import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PortalLayout from "@/components/layout/PortalLayout";
import AuthLayout from "../components/layout/AuthLayout";
import { ROUTES } from "./routes";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import ProtectedRoute from "@/components/authentication/ProtectedRoute";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardDemoPage } from "../pages/DashboardDemoPage";

export const router = createBrowserRouter([
  // landing
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <LandingPage />,
      },
    ],
  },

  // dashboard protegido
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PortalLayout />,
        children: [
        {
          path: ROUTES.DASHBOARD,
          element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  // dashboard demo
  {
    element: <PortalLayout />,
    children: [
      {
        path: ROUTES.DEMO,
        element: <DashboardDemoPage />,
      },
    ],
  },
  // auth
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