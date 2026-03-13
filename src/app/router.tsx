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
import RecipesPage from "@/pages/RecipesPage";
import FavoritePage from "@/pages/FavoritePage";
import PlannerPage from "@/pages/PlannerPage";
import ShoppingListPage from "@/pages/ShoppingListPage";
import ProfilePage from "@/pages/ProfilePage";

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

  // dashboard, recipes, favorite, planeador semanal, lista de compras y perfil protegido
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
        {
          path: ROUTES.RECIPES,
          element: <RecipesPage />,
        },
        {
          path: ROUTES.FAVORITES,
          element: <FavoritePage/>,
        },
        {
          path: ROUTES.PLANNER,
          element: <PlannerPage/>
        },
        {
          path: ROUTES.SHOPPING_LIST,
          element: <ShoppingListPage/>
        },
        {
          path: ROUTES.PROFILE,
          element: <ProfilePage/>
        }
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