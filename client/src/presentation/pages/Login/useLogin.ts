import { useAuth } from '@/application/auth/AuthContext';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { LoginDto } from '@/domain/repositories/AuthRepository';
import { ROUTES } from '@/presentation/routes/routes.const';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.books;

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate(redirectTo, { replace: true }),
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return { onFinish: (values: LoginDto) => mutation.mutate(values), isLoading: mutation.isPending };
};