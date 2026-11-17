import { getBookCover } from '@/presentation/utils/fileUrl';
import { Button, Card, Result, Space, Spin, Tooltip, Typography, Popconfirm } from 'antd';
import { useBookDetails } from './useBookDetails';

export const BookDetails = () => {
  const {
    book, isLoading, isError, isOwner, canDelete,
    onRequestExchange, isExchanging, onDelete, isDeleting, goBack,
  } = useBookDetails();

  if (isLoading) {
    return <Spin className="block py-10" />;
  }

  if (isError || !book) {
    return <Result status="404" title="Книгу не знайдено" extra={<Button onClick={goBack}>Назад</Button>} />;
  }

  return (
    <Card>
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <img src={getBookCover(book)} alt={book.name} className="w-full rounded object-cover" />
        </div>
        <div className="col-12 col-md-8">
          <Typography.Title level={2}>{book.name}</Typography.Title>
          <Typography.Title level={4} type="secondary">{book.author}</Typography.Title>
          <Typography.Paragraph>{book.description ?? 'Опис відсутній'}</Typography.Paragraph>
          <Typography.Text type="secondary">Власник: {book.owner?.name}</Typography.Text>

          <Space className="mt-4 flex" wrap>
            <Tooltip title={isOwner ? 'Не можна обмінювати власну книгу' : ''}>
              <Button type="primary" disabled={isOwner} loading={isExchanging} onClick={onRequestExchange}>
                Запросити обмін
              </Button>
            </Tooltip>
            {canDelete && (
              <Popconfirm title="Видалити книгу?" okText="Так" cancelText="Ні" onConfirm={onDelete}>
                <Button danger loading={isDeleting}>Видалити</Button>
              </Popconfirm>
            )}
            <Button onClick={goBack}>Назад</Button>
          </Space>
        </div>
      </div>
    </Card>
  );
};