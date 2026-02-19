import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "@/app";
import { useAuth } from "@/components/Auth/AuthProvider";

export default function ProtectedRoute() {
    const auth = useAuth()

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
}