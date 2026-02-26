import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import PortalLayout from "./PortalLayout";
import AuthLayout from "./AuthLayout";
import { ROUTES } from "./routes";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import ProtectedRoute from "@/pages/ProtectedRoute";
import { RegisterPage } from "@/pages/RegisterPage";

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