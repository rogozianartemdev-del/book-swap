import { isAxiosError } from 'axios';

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<ApiErrorBody>(error)) {
    const fieldError = Object.values(error.response?.data?.errors ?? {}).flat()[0];

    return fieldError ?? error.response?.data?.message ?? error.message;
  }

  return 'Щось пішло не так';
};