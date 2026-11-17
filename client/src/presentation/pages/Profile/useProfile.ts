import { useAuth } from '@/application/auth/AuthContext';
import { container } from '@/application/di/container';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, message } from 'antd';
import type { UploadFile } from 'antd';
import { useEffect } from 'react';

export interface ProfileFormValues {
  name: string;
  email: string;
  avatar?: UploadFile[];
}

export const useProfile = () => {
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<ProfileFormValues>();
  const { profileRepository } = container;

  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profileRepository.get });
  const requestsQuery = useQuery({
    queryKey: ['incoming-requests'],
    queryFn: profileRepository.listIncomingRequests,
  });

  const profile = profileQuery.data;

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({ name: profile.name, email: profile.email, avatar: [] });
    }
  }, [profile, form]);

  const update = useMutation({
    mutationFn: ({ name, email, avatar }: ProfileFormValues) =>
      profileRepository.update({ name, email, avatar: avatar?.[0]?.originFileObj }),
    onSuccess: (updated) => {
      setUser(updated);
      queryClient.setQueryData(['profile'], updated);
      message.success('Профіль оновлено');
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return {
    form,
    profile,
    isProfileLoading: profileQuery.isLoading,
    requests: requestsQuery.data ?? [],
    isRequestsLoading: requestsQuery.isLoading,
    onFinish: (values: ProfileFormValues) => update.mutate(values),
    isSaving: update.isPending,
  };
};