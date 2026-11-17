import { BookCard } from '@/presentation/components/BookCard';
import { Empty, Input, Pagination, Select, Spin, Typography } from 'antd';
import { useBooksList } from './useBooksList';

export const Books = () => {
  const { query, books, meta, isLoading, onSearch, onSortChange, onOrderChange, onPageChange } =
    useBooksList();

  return (
    <>
      <Typography.Title level={2}>Книги</Typography.Title>

      <div className="mb-4 flex flex-wrap gap-3">
        <Input.Search
          className="max-w-sm"
          allowClear
          defaultValue={query.search}
          placeholder="Пошук за назвою або автором"
          onSearch={onSearch}
        />
        <Select
          value={query.sortBy}
          onChange={onSortChange}
          options={[
            { value: 'name', label: 'За назвою' },
            { value: 'author', label: 'За автором' },
          ]}
        />
        <Select
          value={query.order}
          onChange={onOrderChange}
          options={[
            { value: 'asc', label: 'А → Я' },
            { value: 'desc', label: 'Я → А' },
          ]}
        />
      </div>

      <Spin spinning={isLoading}>
        {books.length > 0 ? (
          <div className="row g-3">
            {books.map((book) => (
              <div key={book.id} className="col-12 col-sm-6 col-lg-3">
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <Empty description="Книг не знайдено" />
        )}
      </Spin>

      {meta && meta.totalPages > 1 && (
        <Pagination
          className="mt-4 text-center"
          current={meta.page}
          pageSize={meta.limit}
          total={meta.total}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      )}
    </>
  );
};