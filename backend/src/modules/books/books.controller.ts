import { asyncHandler } from '../../utils/async-handler';
import { getAuthUser } from '../../utils/get-auth-user';
import { listBooksQuerySchema } from './books.schema';
import * as booksService from './books.service';

export const listBooks = asyncHandler(async (req, res) => {
  const query = listBooksQuerySchema.parse(req.query);

  res.json(await booksService.listBooks(query));
});

export const getBook = asyncHandler(async (req, res) => {
  res.json(await booksService.getBook(String(req.params.id)));
});

export const listMyBooks = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.json(await booksService.listMyBooks(userId));
});

export const createMyBook = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.status(201).json(await booksService.createBook(userId, req.body, req.file));
});

export const deleteBook = asyncHandler(async (req, res) => {
  await booksService.deleteBook(String(req.params.id), getAuthUser(req));
  res.status(204).send();
});