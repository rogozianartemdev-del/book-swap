import { container } from '@/application/di/container';
import { BookSortBy, SortOrder } from '@/domain/entities/Book';
import { BooksQuery } from '@/domain/repositories/BooksRepository';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const PAGE_LIMIT = 12;

export const useBooksList = () => {
  const [params, setParams] = useSearchParams();

  const query: BooksQuery = {
    page: Number(params.get('page') ?? 1),
    limit: PAGE_LIMIT,
    search: params.get('search') ?? undefined,
    sortBy: (params.get('sortBy') as BookSortBy) ?? 'name',
    order: (params.get('order') as SortOrder) ?? 'asc',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['books', query],
    queryFn: () => container.booksRepository.list(query),
    placeholderData: keepPreviousData,
  });

  const updateParams = (patch: Record<string, string | undefined>) => {
    const next = new URLSearchParams(params);

    Object.entries(patch).forEach(([key, value]) =>
      value ? next.set(key, value) : next.delete(key),
    );
    setParams(next);
  };

  return {
    query,
    books: data?.items ?? [],
    meta: data?.meta,
    isLoading,
    onSearch: (search: string) => updateParams({ search: search || undefined, page: undefined }),
    onSortChange: (sortBy: BookSortBy) => updateParams({ sortBy, page: undefined }),
    onOrderChange: (order: SortOrder) => updateParams({ order, page: undefined }),
    onPageChange: (page: number) => updateParams({ page: String(page) }),
  };
};