import { Outlet, Navigate } from "react-router-dom";
import { ROUTES } from "@/app";
import { useAuth } from "@/components/authentication/AuthProvider";

export default function ProtectedRoute() {
    const auth = useAuth()

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.HOME} />;
}