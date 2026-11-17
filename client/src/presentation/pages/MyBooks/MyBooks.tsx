import { Book } from '@/domain/entities/Book';
import { getBookCover } from '@/presentation/utils/fileUrl';
import { Button, Popconfirm, Space, Table, Typography } from 'antd';
import { useMyBooks } from './useMyBooks';

export const MyBooks = () => {
  const { books, isLoading, onDelete, onAdd, onOpen } = useMyBooks();

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Typography.Title level={2} className="!mb-0">Мої книги</Typography.Title>
        <Button type="primary" onClick={onAdd}>Додати книгу</Button>
      </div>

      <Table<Book>
        rowKey="id"
        loading={isLoading}
        dataSource={books}
        pagination={false}
        locale={{ emptyText: 'Ви ще не додали жодної книги' }}
        columns={[
          {
            title: 'Обкладинка',
            width: 110,
            render: (_, book) => (
              <img src={getBookCover(book)} alt={book.name} className="h-16 w-12 rounded object-cover" />
            ),
          },
          { title: 'Назва', dataIndex: 'name' },
          { title: 'Автор', dataIndex: 'author' },
          {
            title: 'Дії',
            width: 200,
            render: (_, book) => (
              <Space>
                <Button onClick={() => onOpen(book.id)}>Відкрити</Button>
                <Popconfirm title="Видалити книгу?" okText="Так" cancelText="Ні" onConfirm={() => onDelete(book.id)}>
                  <Button danger>Видалити</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </>
  );
};