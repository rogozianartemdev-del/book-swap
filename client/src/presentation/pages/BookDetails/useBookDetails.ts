import { useAuth } from '@/application/auth/AuthContext';
import { container } from '@/application/di/container';
import { getErrorMessage } from '@/data/http/getErrorMessage';
import { ROUTES } from '@/presentation/routes/routes.const';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

export const useBookDetails = () => {
    const { id = '' } = useParams();
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { booksRepository } = container;

    const { data: book, isLoading, isError } = useQuery({
        queryKey: ['book', id],
        queryFn: () => booksRepository.getById(id),
    });

    const exchange = useMutation({
        mutationFn: () => booksRepository.requestExchange(id),
        onSuccess: () => message.success('Запит надіслано власнику книги'),
        onError: (error) => message.error(getErrorMessage(error)),
    });

    const remove = useMutation({
        mutationFn: () => booksRepository.remove(id),
        onSuccess: () => {
            message.success('Книгу видалено');
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['my-books'] });
            navigate(ROUTES.books);
        },
        onError: (error) => message.error(getErrorMessage(error)),
    });

    const isOwner = Boolean(book && book.ownerId === user?.id);

    return {
        book,
        isLoading,
        isError,
        isOwner,
        canDelete: isOwner || isAdmin,
        onRequestExchange: () => exchange.mutate(),
        isExchanging: exchange.isPending,
        onDelete: () => remove.mutate(),
        isDeleting: remove.isPending,
        goBack: () => navigate(-1),
    };
};