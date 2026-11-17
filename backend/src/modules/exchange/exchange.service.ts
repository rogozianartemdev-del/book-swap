import { Book, ExchangeRequest, User } from '../../database';
import { enqueueEmail } from '../../queues/email.queue';
import { ApiError } from '../../utils/api-error';
import { buildExchangeRequestEmail } from './exchange.email';

const findBookWithOwnerOrFail = async (bookId: string) => {
  const book = await Book.findByPk(bookId, {
    include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email'] }],
  });

  if (!book || !book.owner) {
    throw ApiError.notFound('Book not found');
  }

  return { book, owner: book.owner };
};

const assertRequestIsNew = async (bookId: string, requesterId: string) => {
  const existingRequest = await ExchangeRequest.findOne({ where: { bookId, requesterId } });

  if (existingRequest) {
    throw ApiError.conflict('You have already requested an exchange for this book');
  }
};

export const requestExchange = async (bookId: string, requesterId: string) => {
  const { book, owner } = await findBookWithOwnerOrFail(bookId);

  if (book.ownerId === requesterId) {
    throw ApiError.badRequest('You cannot request an exchange for your own book');
  }

  await assertRequestIsNew(bookId, requesterId);

  const requester = await User.findByPk(requesterId);

  if (!requester) {
    throw ApiError.unauthorized();
  }

  const requesterBooks = await Book.findAll({
    where: { ownerId: requesterId },
    order: [['name', 'ASC']],
  });

  await enqueueEmail(buildExchangeRequestEmail({ book, owner, requester, requesterBooks }));

  return ExchangeRequest.create({ bookId, requesterId });
};

export const listIncomingRequests = (ownerId: string) =>
  ExchangeRequest.findAll({
    include: [
      {
        model: Book,
        as: 'book',
        attributes: ['id', 'name', 'author'],
        where: { ownerId },
        required: true,
      },
      { model: User, as: 'requester', attributes: ['id', 'name', 'email'] },
    ],
    order: [['createdAt', 'DESC']],
  });