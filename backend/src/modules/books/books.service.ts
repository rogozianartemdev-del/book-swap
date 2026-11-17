import { Includeable, Op, WhereOptions } from 'sequelize';
import { Book, User } from '../../database';
import { UserRole } from '../../database/models/user.model';
import { ApiError } from '../../utils/api-error';
import { buildPaginatedResponse, getPagination } from '../../utils/pagination';
import { buildFileUrl, removeUploadedFile } from '../../utils/uploads';
import type { TokenPayload } from '../auth/token.service';
import { CreateBookDto, ListBooksQuery } from './books.schema';

const ownerInclude: Includeable = { model: User, as: 'owner', attributes: ['id', 'name'] };

const buildSearchCondition = (search?: string): WhereOptions =>
    search
        ? {
            [Op.or]: [
                { name: { [Op.iLike]: `%${search}%` } },
                { author: { [Op.iLike]: `%${search}%` } },
            ],
        }
        : {};

export const listBooks = async ({ search, sortBy, order, ...pagination }: ListBooksQuery) => {
    const { rows, count } = await Book.findAndCountAll({
        where: buildSearchCondition(search),
        include: [ownerInclude],
        order: [
            [sortBy, order.toUpperCase()],
            ['id', 'ASC'],
        ],
        ...getPagination(pagination),
    });

    return buildPaginatedResponse(rows, count, pagination);
};

export const getBook = async (id: string) => {
    const book = await Book.findByPk(id, { include: [ownerInclude] });

    if (!book) {
        throw ApiError.notFound('Book not found');
    }

    return book;
};

export const listMyBooks = (ownerId: string) =>
    Book.findAll({ where: { ownerId }, order: [['createdAt', 'DESC']] });

export const createBook = (
    ownerId: string,
    { name, author, description, photoUrl }: CreateBookDto,
    file?: Express.Multer.File,
) => {
    if (photoUrl && file) {
        throw ApiError.badRequest('Provide either a photo URL or a file, not both');
    }

    return Book.create({
        ownerId,
        name,
        author,
        description: description ?? null,
        photoUrl: photoUrl ?? null,
        filePath: file ? buildFileUrl(file.filename) : null,
    });
};

export const deleteBook = async (id: string, { userId, role }: TokenPayload) => {
    const book = await Book.findByPk(id);

    if (!book) {
        throw ApiError.notFound('Book not found');
    }

    if (book.ownerId !== userId && role !== UserRole.Admin) {
        throw ApiError.forbidden('You can delete only your own books');
    }

    await book.destroy();

    if (book.filePath) {
        await removeUploadedFile(book.filePath);
    }
};