import { ROUTES } from '@/presentation/routes/routes.const';
import { useNavigate } from 'react-router-dom';

export const useForbidden = () => {
  const navigate = useNavigate();

  return { goHome: () => navigate(ROUTES.books) };
};