import { useAuth } from "@/application/auth/AuthContext";
import { UserRole } from "@/domain/entities/User";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "./routes.const";


interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={ROUTES.forbidden} replace />;
    }

    return <Outlet />;
}

