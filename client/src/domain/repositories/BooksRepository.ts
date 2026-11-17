import  { Book, BookSortBy, SortOrder } from '../entities/Book';
import  { PageQuery, Paginated } from '../entities/Pagination';

export interface BooksQuery extends PageQuery {
  search?: string;
  sortBy: BookSortBy;
  order: SortOrder;
}

export interface CreateBookDto {
  name: string;
  author: string;
  description?: string;
  photoUrl?: string;
  file?: File;
}

export interface BooksRepository {
  list(query: BooksQuery): Promise<Paginated<Book>>;
  getById(id: string): Promise<Book>;
  remove(id: string): Promise<void>;
  requestExchange(bookId: string): Promise<void>;
  listMine(): Promise<Book[]>;
  createMine(dto: CreateBookDto): Promise<Book>;
}