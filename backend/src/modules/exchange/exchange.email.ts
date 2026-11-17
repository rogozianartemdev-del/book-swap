
import type { Book, User } from '../../database';
import { EmailJobData } from '../../queues/email.queue';

interface ExchangeEmailParams {
    book: Book;
    owner: User;
    requester: User;
    requesterBooks: Book[];
}



const formatBookList = (books: Book[]) =>
    books.length > 0
        ? books.map(({ name, author }) => `- ${name} — ${author}`).join('\n')
        : 'Користувач ще не додав жодної книги.';

export const buildExchangeRequestEmail = ({
    book,
    owner,
    requester,
    requesterBooks,
}: ExchangeEmailParams): EmailJobData => ({
    to: owner.email,
    subject: `Запит на обмін книги «${book.name}»`,
    text: [
        `Привіт, ${owner.name}!`,
        '',
        `${requester.name} (${requester.email}) хоче обміняти вашу книгу «${book.name}».`,
        '',
        'Книги для обміну:',
        formatBookList(requesterBooks),
    ].join('\n'),
});