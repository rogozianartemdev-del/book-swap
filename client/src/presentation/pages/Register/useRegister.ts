import { useAuth } from '@/application/auth/AuthContext';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { RegisterDto } from '@/domain/repositories/AuthRepository';
import { ROUTES } from '@/presentation/routes/routes.const';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export type RegisterFormValues = RegisterDto & { confirmPassword: string };

export const useRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate(ROUTES.books, { replace: true }),
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const onFinish = ({ name, email, password }: RegisterFormValues) =>
    mutation.mutate({ name, email, password });

  return { onFinish, isLoading: mutation.isPending };
};