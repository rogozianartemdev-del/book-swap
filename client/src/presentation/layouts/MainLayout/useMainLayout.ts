import { useAuth } from '@/application/auth/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/presentation/routes/routes.const';

export const useMainLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: ROUTES.books, label: 'Книги' },
    { path: ROUTES.myBooks, label: 'Мої книги' },
    { path: ROUTES.profile, label: 'Профіль' },
    ...(isAdmin ? [{ path: ROUTES.admin, label: 'Адмін' }] : []),
  ];

  const activePath = menuItems
    .filter(({ path }) => pathname.startsWith(path))
    .sort((a, b) => b.path.length - a.path.length)[0]?.path;

  const onLogout = () => {
    logout();
    navigate(ROUTES.login);
  };

  return { user, menuItems, activePath, onLogout };
};