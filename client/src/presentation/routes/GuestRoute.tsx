import { useAuth } from '@/application/auth/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes.const';

export const GuestRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to={ROUTES.books} replace /> : <Outlet />;
};