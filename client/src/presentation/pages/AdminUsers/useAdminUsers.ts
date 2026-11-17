import { useAuth } from '@/application/auth/AuthContext';
import { container } from '@/application/di/container';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { User } from '@/domain/entities/User';
import { UserFormValues } from '@/presentation/components/UserFormModal';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useState } from 'react';

const PAGE_LIMIT = 10;

export const useAdminUsers = () => {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();
  const { usersRepository } = container;

  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: () => usersRepository.list({ page, limit: PAGE_LIMIT }),
    placeholderData: keepPreviousData,
  });

  const onSuccess = (text: string) => () => {
    message.success(text);
    queryClient.invalidateQueries({ queryKey: ['users'] });
    closeModal();
  };
  const onError = (error: unknown) => message.error(getErrorMessage(error));

  const save = useMutation({
    mutationFn: ({ password, ...fields }: UserFormValues) =>
      editingUser
        ? usersRepository.update(editingUser.id, { ...fields, ...(password && { password }) })
        : usersRepository.create({ ...fields, password: password ?? '' }),
    onSuccess: onSuccess('Збережено'),
    onError,
  });

  const remove = useMutation({
    mutationFn: usersRepository.remove,
    onSuccess: onSuccess('Користувача видалено'),
    onError,
  });

  function closeModal() {
    setModalOpen(false);
    setEditingUser(null);
  }

  return {
    users: data?.items ?? [],
    meta: data?.meta,
    isLoading,
    currentUserId: currentUser?.id,
    isModalOpen,
    editingUser,
    isSaving: save.isPending,
    onPageChange: setPage,
    onAdd: () => setModalOpen(true),
    onEdit: (user: User) => {
      setEditingUser(user);
      setModalOpen(true);
    },
    onDelete: (id: string) => remove.mutate(id),
    onSubmit: (values: UserFormValues) => save.mutate(values),
    onCloseModal: closeModal,
  };
};