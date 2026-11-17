
import {
    BooksQuery,
    BooksRepository,
    CreateBookDto,
} from '@/domain/repositories/BooksRepository';
import { httpClient } from '../http/httpClient';
import { toFormData } from '../http/toFormData';
import { Paginated } from '@/domain/entities/Pagination';
import { Book } from '@/domain/entities/Book';

export class BooksApiRepository implements BooksRepository {
    list = async (query: BooksQuery) =>
        (await httpClient.get<Paginated<Book>>('/books', { params: query })).data;

    getById = async (id: string) => (await httpClient.get<Book>(`/books/${id}`)).data;

    remove = async (id: string) => {
        await httpClient.delete(`/books/${id}`);
    };

    requestExchange = async (bookId: string) => {
        await httpClient.post(`/books/${bookId}/exchange`);
    };

    listMine = async () => (await httpClient.get<Book[]>('/me/books')).data;

    createMine = async ({ name, author, description, photoUrl, file }: CreateBookDto) =>
        (
            await httpClient.post<Book>(
                '/me/books',
                toFormData({ name, author, description, photoUrl, file }),
            )
        ).data;
}