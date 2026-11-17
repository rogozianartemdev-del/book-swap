import { QueryInterface, QueryTypes } from 'sequelize';
import { getUserId } from '../../utils/seed-helpers';

const DEMO_USER_EMAILS = [
  'anna@example.com',
  'oleh@example.com',
  'maria@example.com',
] as const;

// Книги для демонстрации обменов. Если книга не попала в books из-за отсутствия
// обложки, соответствующая заявка просто пропускается.
const DEMO_REQUESTS = [
  { bookName: 'Кобзар', requesterEmail: 'oleh@example.com' },
  { bookName: 'Кобзар', requesterEmail: 'maria@example.com' },
  { bookName: '1984', requesterEmail: 'anna@example.com' },
  { bookName: 'Гордість і упередження', requesterEmail: 'oleh@example.com' },
  { bookName: 'Гобіт', requesterEmail: 'maria@example.com' },
  { bookName: 'Дюна', requesterEmail: 'anna@example.com' },
  { bookName: 'Великий Гетсбі', requesterEmail: 'oleh@example.com' },
  { bookName: 'Тигролови', requesterEmail: 'maria@example.com' },
  { bookName: 'Лісова пісня', requesterEmail: 'anna@example.com' },
  { bookName: 'Захар Беркут', requesterEmail: 'oleh@example.com' },
  { bookName: 'Гаррі Поттер і філософський камінь', requesterEmail: 'maria@example.com' },
  { bookName: 'Вбити пересмішника', requesterEmail: 'anna@example.com' },
];

type SeedBook = { id: string; owner_id: string; name: string };

export const up = async (queryInterface: QueryInterface) => {
  const userIds = new Map<string, string>();
  for (const email of DEMO_USER_EMAILS) {
    userIds.set(email, await getUserId(queryInterface, email));
  }

  const bookNames = [...new Set(DEMO_REQUESTS.map((request) => request.bookName))];
  const books = await queryInterface.sequelize.query<SeedBook>(
    `SELECT id, owner_id, name
     FROM books
     WHERE name IN (:bookNames)`,
    {
      replacements: { bookNames },
      type: QueryTypes.SELECT,
    },
  );

  const booksByName = new Map(books.map((book) => [book.name, book]));
  const requests: Array<{ book_id: string; requester_id: string }> = [];

  for (const request of DEMO_REQUESTS) {
    const book = booksByName.get(request.bookName);
    if (!book) {
      console.warn(`Skipped exchange request: book not seeded — ${request.bookName}`);
      continue;
    }

    const requesterId = userIds.get(request.requesterEmail)!;
    if (requesterId === book.owner_id) {
      console.warn(`Skipped exchange request: requester owns the book — ${request.bookName}`);
      continue;
    }

    requests.push({ book_id: book.id, requester_id: requesterId });
  }

  if (requests.length > 0) {
    await queryInterface.bulkInsert('exchange_requests', requests);
  }

  console.log(`Inserted ${requests.length}/${DEMO_REQUESTS.length} demo exchange requests.`);
};

export const down = async (queryInterface: QueryInterface) => {
  const requesterIds = await Promise.all(
    DEMO_USER_EMAILS.map((email) => getUserId(queryInterface, email)),
  );
  const bookNames = [...new Set(DEMO_REQUESTS.map((request) => request.bookName))];

  await queryInterface.sequelize.query(
    `DELETE FROM exchange_requests
     WHERE requester_id IN (:requesterIds)
       AND book_id IN (SELECT id FROM books WHERE name IN (:bookNames))`,
    {
      replacements: { requesterIds, bookNames },
      type: QueryTypes.DELETE,
    },
  );
};
