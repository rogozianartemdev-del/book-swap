import { Book } from '@/domain/entities/Book';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/routes.const';
import { getBookCover } from '../utils/fileUrl';

export const BookCard = ({ book }: { book: Book }) => (
  <Link to={ROUTES.bookDetails(book.id)}>
    <Card
      hoverable
      cover={<img alt={book.name} src={getBookCover(book)} className="h-64 w-full object-cover" />}
    >
      <Card.Meta title={book.name} description={book.author} />
    </Card>
  </Link>
);