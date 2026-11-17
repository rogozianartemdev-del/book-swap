import { Router } from 'express';
import { uploadBookCover } from '../../middlewares/upload';
import { validateBody, validateParams } from '../../middlewares/validate';
import { idParamSchema } from '../../utils/id-param.schema';
import {
  createMyBook,
  deleteBook,
  getBook,
  listBooks,
  listMyBooks,
} from './books.controller';
import { createBookSchema } from './books.schema';

export const booksRouter = Router();

booksRouter.get('/', listBooks);
booksRouter.get('/:id', validateParams(idParamSchema), getBook);
booksRouter.delete('/:id', validateParams(idParamSchema), deleteBook);

export const myBooksRouter = Router();

myBooksRouter.get('/', listMyBooks);
myBooksRouter.post('/', uploadBookCover, validateBody(createBookSchema), createMyBook);