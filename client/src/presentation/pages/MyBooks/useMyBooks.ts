import { container } from '@/application/di/container';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { ROUTES } from '@/presentation/routes/routes.const';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export const useMyBooks = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { booksRepository } = container;

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['my-books'],
    queryFn: booksRepository.listMine,
  });

  const remove = useMutation({
    mutationFn: booksRepository.remove,
    onSuccess: () => {
      message.success('Книгу видалено');
      queryClient.invalidateQueries({ queryKey: ['my-books'] });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return {
    books,
    isLoading,
    onDelete: (id: string) => remove.mutate(id),
    onAdd: () => navigate(ROUTES.bookCreate),
    onOpen: (id: string) => navigate(ROUTES.bookDetails(id)),
  };
};