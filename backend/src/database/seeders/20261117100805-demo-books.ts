import { QueryInterface, QueryTypes } from 'sequelize';
import { getUserId } from '../../utils/seed-helpers';

type BookSeed = { name: string; author: string; searchTitle?: string; searchAuthor?: string };

const OWNER_EMAILS = ['anna@example.com', 'oleh@example.com', 'maria@example.com'] as const;
 
const BOOKS: BookSeed[] = [
  // Україна (35)
  { name: 'Кобзар', author: 'Тарас Шевченко', searchTitle: 'Kobzar', searchAuthor: 'Taras Shevchenko' },
  { name: 'Захар Беркут', author: 'Іван Франко', searchTitle: 'Zakhar Berkut', searchAuthor: 'Ivan Franko' },
  { name: 'Лісова пісня', author: 'Леся Українка', searchTitle: 'The Forest Song', searchAuthor: 'Lesya Ukrainka' },
  { name: 'Тіні забутих предків', author: 'Михайло Коцюбинський', searchTitle: 'Shadows of Forgotten Ancestors', searchAuthor: 'Mykhailo Kotsiubynsky' },
  { name: 'Місто', author: 'Валер’ян Підмогильний', searchTitle: 'The City', searchAuthor: 'Valerian Pidmohylny' },
  { name: 'Чорна рада', author: 'Пантелеймон Куліш', searchTitle: 'The Black Council', searchAuthor: 'Panteleimon Kulish' },
  { name: 'Енеїда', author: 'Іван Котляревський', searchTitle: 'Eneida', searchAuthor: 'Ivan Kotliarevsky' },
  { name: 'Кайдашева сім’я', author: 'Іван Нечуй-Левицький', searchTitle: 'Kaidash Family', searchAuthor: 'Ivan Nechuy-Levytsky' },
  { name: 'Хіба ревуть воли, як ясла повні?', author: 'Панас Мирний', searchAuthor: 'Panas Myrny' },
  { name: 'Наталка Полтавка', author: 'Іван Котляревський', searchTitle: 'Natalka Poltavka', searchAuthor: 'Ivan Kotliarevsky' },
  { name: 'Земля', author: 'Ольга Кобилянська', searchTitle: 'Zemlia', searchAuthor: 'Olha Kobylianska' },
  { name: 'Intermezzo', author: 'Михайло Коцюбинський', searchAuthor: 'Mykhailo Kotsiubynsky' },
  { name: 'Мойсей', author: 'Іван Франко', searchTitle: 'Moses', searchAuthor: 'Ivan Franko' },
  { name: 'Камінний хрест', author: 'Василь Стефаник', searchTitle: 'The Stone Cross', searchAuthor: 'Vasyl Stefanyk' },
  { name: 'Тигролови', author: 'Іван Багряний', searchTitle: 'Tiger Trappers', searchAuthor: 'Ivan Bahrianyi' },
  { name: 'Сад Гетсиманський', author: 'Іван Багряний', searchTitle: 'The Garden of Gethsemane', searchAuthor: 'Ivan Bahrianyi' },
  { name: 'Марія', author: 'Улас Самчук', searchTitle: 'Maria', searchAuthor: 'Ulas Samchuk' },
  { name: 'Собор', author: 'Олесь Гончар', searchTitle: 'Sobor', searchAuthor: 'Oles Honchar' },
  { name: 'Маруся Чурай', author: 'Ліна Костенко', searchTitle: 'Marusia Churai', searchAuthor: 'Lina Kostenko' },
  { name: 'Я (Романтика)', author: 'Микола Хвильовий', searchTitle: 'I (Romance)', searchAuthor: 'Mykola Khvylovy' },
  { name: 'Роксолана', author: 'Павло Загребельний', searchTitle: 'Roksolana', searchAuthor: 'Pavlo Zahrebelnyi' },
  { name: 'Чорний ворон', author: 'Василь Шкляр', searchTitle: 'Black Raven', searchAuthor: 'Vasyl Shkliar' },
  { name: 'Ворошиловград', author: 'Сергій Жадан', searchTitle: 'Voroshilovgrad', searchAuthor: 'Serhiy Zhadan' },
  { name: 'Інтернат', author: 'Сергій Жадан', searchTitle: 'The Orphanage', searchAuthor: 'Serhiy Zhadan' },
  { name: 'Депеш Мод', author: 'Сергій Жадан', searchTitle: 'Depeche Mode', searchAuthor: 'Serhiy Zhadan' },
  { name: 'Музей покинутих секретів', author: 'Оксана Забужко', searchTitle: 'The Museum of Abandoned Secrets', searchAuthor: 'Oksana Zabuzhko' },
  { name: 'Амадока', author: 'Софія Андрухович', searchTitle: 'Amadoka', searchAuthor: 'Sofia Andrukhovych' },
  { name: 'Доця', author: 'Тамара Горіха Зерня', searchTitle: 'Daughter', searchAuthor: 'Tamara Horikha Zernya' },
  { name: 'Фелікс Австрія', author: 'Софія Андрухович', searchTitle: 'Felix Austria', searchAuthor: 'Sofia Andrukhovych' },
  { name: 'Я бачу, вас цікавить пітьма', author: 'Ілларіон Павлюк', searchAuthor: 'Illarion Pavliuk' },
  { name: 'Солодка Даруся', author: 'Марія Матіос', searchTitle: 'Sweet Darusya', searchAuthor: 'Maria Matios' },
  { name: 'Тореадори з Васюківки', author: 'Всеволод Нестайко', searchTitle: 'Toreadors from Vasyukivka', searchAuthor: 'Vsevolod Nestaiko' },
  { name: 'Століття Якова', author: 'Володимир Лис', searchTitle: 'The Century of Jacob', searchAuthor: 'Volodymyr Lys' },
  { name: 'Карбід', author: 'Андрій Любка', searchTitle: 'Carbide', searchAuthor: 'Andriy Lyubka' },
  { name: 'Білий попіл', author: 'Ілларіон Павлюк', searchTitle: 'White Ash', searchAuthor: 'Illarion Pavliuk' },

  // Велика Британія та Ірландія (35)
  { name: 'Гордість і упередження', author: 'Джейн Остін', searchTitle: 'Pride and Prejudice', searchAuthor: 'Jane Austen' },
  { name: 'Розум і почуття', author: 'Джейн Остін', searchTitle: 'Sense and Sensibility', searchAuthor: 'Jane Austen' },
  { name: 'Емма', author: 'Джейн Остін', searchTitle: 'Emma', searchAuthor: 'Jane Austen' },
  { name: 'Джейн Ейр', author: 'Шарлотта Бронте', searchTitle: 'Jane Eyre', searchAuthor: 'Charlotte Bronte' },
  { name: 'Буремний перевал', author: 'Емілі Бронте', searchTitle: 'Wuthering Heights', searchAuthor: 'Emily Bronte' },
  { name: 'Олівер Твіст', author: 'Чарлз Дікенс', searchTitle: 'Oliver Twist', searchAuthor: 'Charles Dickens' },
  { name: 'Великі сподівання', author: 'Чарлз Дікенс', searchTitle: 'Great Expectations', searchAuthor: 'Charles Dickens' },
  { name: 'Повість про два міста', author: 'Чарлз Дікенс', searchTitle: 'A Tale of Two Cities', searchAuthor: 'Charles Dickens' },
  { name: 'Різдвяна пісня', author: 'Чарлз Дікенс', searchTitle: 'A Christmas Carol', searchAuthor: 'Charles Dickens' },
  { name: 'Портрет Доріана Ґрея', author: 'Оскар Вайльд', searchTitle: 'The Picture of Dorian Gray', searchAuthor: 'Oscar Wilde' },
  { name: 'Важливо бути серйозним', author: 'Оскар Вайльд', searchTitle: 'The Importance of Being Earnest', searchAuthor: 'Oscar Wilde' },
  { name: 'Дракула', author: 'Брем Стокер', searchTitle: 'Dracula', searchAuthor: 'Bram Stoker' },
  { name: 'Франкенштейн', author: 'Мері Шеллі', searchTitle: 'Frankenstein', searchAuthor: 'Mary Shelley' },
  { name: 'Острів скарбів', author: 'Роберт Луїс Стівенсон', searchTitle: 'Treasure Island', searchAuthor: 'Robert Louis Stevenson' },
  { name: 'Дивна історія доктора Джекіла і містера Гайда', author: 'Роберт Луїс Стівенсон', searchTitle: 'Strange Case of Dr Jekyll and Mr Hyde', searchAuthor: 'Robert Louis Stevenson' },
  { name: 'Шерлок Голмс: Етюд у багряних тонах', author: 'Артур Конан Дойл', searchTitle: 'A Study in Scarlet', searchAuthor: 'Arthur Conan Doyle' },
  { name: 'Собака Баскервілів', author: 'Артур Конан Дойл', searchTitle: 'The Hound of the Baskervilles', searchAuthor: 'Arthur Conan Doyle' },
  { name: 'Убивство у Східному експресі', author: 'Аґата Крісті', searchTitle: 'Murder on the Orient Express', searchAuthor: 'Agatha Christie' },
  { name: 'І не лишилось жодного', author: 'Аґата Крісті', searchTitle: 'And Then There Were None', searchAuthor: 'Agatha Christie' },
  { name: 'Смерть на Нілі', author: 'Аґата Крісті', searchTitle: 'Death on the Nile', searchAuthor: 'Agatha Christie' },
  { name: '1984', author: 'Джордж Орвелл', searchTitle: 'Nineteen Eighty-Four', searchAuthor: 'George Orwell' },
  { name: 'Колгосп тварин', author: 'Джордж Орвелл', searchTitle: 'Animal Farm', searchAuthor: 'George Orwell' },
  { name: 'Гобіт', author: 'Дж. Р. Р. Толкін', searchTitle: 'The Hobbit', searchAuthor: 'J. R. R. Tolkien' },
  { name: 'Володар перснів', author: 'Дж. Р. Р. Толкін', searchTitle: 'The Lord of the Rings', searchAuthor: 'J. R. R. Tolkien' },
  { name: 'Сильмариліон', author: 'Дж. Р. Р. Толкін', searchTitle: 'The Silmarillion', searchAuthor: 'J. R. R. Tolkien' },
  { name: 'Лев, Біла Відьма та шафа', author: 'К. С. Льюїс', searchTitle: 'The Lion, the Witch and the Wardrobe', searchAuthor: 'C. S. Lewis' },
  { name: 'Гаррі Поттер і філософський камінь', author: 'Джоан Ролінґ', searchTitle: "Harry Potter and the Philosopher's Stone", searchAuthor: 'J. K. Rowling' },
  { name: 'Гаррі Поттер і таємна кімната', author: 'Джоан Ролінґ', searchTitle: 'Harry Potter and the Chamber of Secrets', searchAuthor: 'J. K. Rowling' },
  { name: 'Автостопом по галактиці', author: 'Дуглас Адамс', searchTitle: "The Hitchhiker's Guide to the Galaxy", searchAuthor: 'Douglas Adams' },
  { name: 'Добрі передвісники', author: 'Террі Пратчетт і Ніл Ґейман', searchTitle: 'Good Omens', searchAuthor: 'Terry Pratchett' },
  { name: 'Колір магії', author: 'Террі Пратчетт', searchTitle: 'The Colour of Magic', searchAuthor: 'Terry Pratchett' },
  { name: 'Американські боги', author: 'Ніл Ґейман', searchTitle: 'American Gods', searchAuthor: 'Neil Gaiman' },
  { name: 'Кораліна', author: 'Ніл Ґейман', searchTitle: 'Coraline', searchAuthor: 'Neil Gaiman' },
  { name: 'Машина часу', author: 'Герберт Веллс', searchTitle: 'The Time Machine', searchAuthor: 'H. G. Wells' },
  { name: 'Війна світів', author: 'Герберт Веллс', searchTitle: 'The War of the Worlds', searchAuthor: 'H. G. Wells' },

  // США (30)
  { name: 'Великий Гетсбі', author: 'Френсіс Скотт Фіцджеральд', searchTitle: 'The Great Gatsby', searchAuthor: 'F. Scott Fitzgerald' },
  { name: 'Ніч лагідна', author: 'Френсіс Скотт Фіцджеральд', searchTitle: 'Tender Is the Night', searchAuthor: 'F. Scott Fitzgerald' },
  { name: 'Старий і море', author: 'Ернест Хемінгуей', searchTitle: 'The Old Man and the Sea', searchAuthor: 'Ernest Hemingway' },
  { name: 'Прощавай, зброє', author: 'Ернест Хемінгуей', searchTitle: 'A Farewell to Arms', searchAuthor: 'Ernest Hemingway' },
  { name: 'По кому подзвін', author: 'Ернест Хемінгуей', searchTitle: 'For Whom the Bell Tolls', searchAuthor: 'Ernest Hemingway' },
  { name: 'Пригоди Тома Соєра', author: 'Марк Твен', searchTitle: 'The Adventures of Tom Sawyer', searchAuthor: 'Mark Twain' },
  { name: 'Пригоди Гекльберрі Фінна', author: 'Марк Твен', searchTitle: 'Adventures of Huckleberry Finn', searchAuthor: 'Mark Twain' },
  { name: 'Мобі Дік', author: 'Герман Мелвілл', searchTitle: 'Moby-Dick', searchAuthor: 'Herman Melville' },
  { name: 'Багряна літера', author: 'Натаніель Готорн', searchTitle: 'The Scarlet Letter', searchAuthor: 'Nathaniel Hawthorne' },
  { name: 'Маленькі жінки', author: 'Луїза Мей Олкотт', searchTitle: 'Little Women', searchAuthor: 'Louisa May Alcott' },
  { name: 'Поклик предків', author: 'Джек Лондон', searchTitle: 'The Call of the Wild', searchAuthor: 'Jack London' },
  { name: 'Біле Ікло', author: 'Джек Лондон', searchTitle: 'White Fang', searchAuthor: 'Jack London' },
  { name: 'Мартін Іден', author: 'Джек Лондон', searchTitle: 'Martin Eden', searchAuthor: 'Jack London' },
  { name: '451° за Фаренгейтом', author: 'Рей Бредбері', searchTitle: 'Fahrenheit 451', searchAuthor: 'Ray Bradbury' },
  { name: 'Марсіанські хроніки', author: 'Рей Бредбері', searchTitle: 'The Martian Chronicles', searchAuthor: 'Ray Bradbury' },
  { name: 'Кульбабове вино', author: 'Рей Бредбері', searchTitle: 'Dandelion Wine', searchAuthor: 'Ray Bradbury' },
  { name: 'Дюна', author: 'Френк Герберт', searchTitle: 'Dune', searchAuthor: 'Frank Herbert' },
  { name: 'Месія Дюни', author: 'Френк Герберт', searchTitle: 'Dune Messiah', searchAuthor: 'Frank Herbert' },
  { name: 'Фундація', author: 'Айзек Азімов', searchTitle: 'Foundation', searchAuthor: 'Isaac Asimov' },
  { name: 'Я, робот', author: 'Айзек Азімов', searchTitle: 'I, Robot', searchAuthor: 'Isaac Asimov' },
  { name: 'Вбити пересмішника', author: 'Гарпер Лі', searchTitle: 'To Kill a Mockingbird', searchAuthor: 'Harper Lee' },
  { name: 'Над прірвою у житі', author: 'Джером Девід Селінджер', searchTitle: 'The Catcher in the Rye', searchAuthor: 'J. D. Salinger' },
  { name: 'Миші і люди', author: 'Джон Стейнбек', searchTitle: 'Of Mice and Men', searchAuthor: 'John Steinbeck' },
  { name: 'Грона гніву', author: 'Джон Стейнбек', searchTitle: 'The Grapes of Wrath', searchAuthor: 'John Steinbeck' },
  { name: 'Дорога', author: 'Кормак Маккарті', searchTitle: 'The Road', searchAuthor: 'Cormac McCarthy' },
  { name: 'Керрі', author: 'Стівен Кінг', searchTitle: 'Carrie', searchAuthor: 'Stephen King' },
  { name: 'Сяйво', author: 'Стівен Кінг', searchTitle: 'The Shining', searchAuthor: 'Stephen King' },
  { name: 'Воно', author: 'Стівен Кінг', searchTitle: 'It', searchAuthor: 'Stephen King' },
  { name: 'Зелена миля', author: 'Стівен Кінг', searchTitle: 'The Green Mile', searchAuthor: 'Stephen King' },
  { name: 'Голодні ігри', author: 'Сюзанна Коллінз', searchTitle: 'The Hunger Games', searchAuthor: 'Suzanne Collins' },
];

interface OpenLibraryDoc {
  title?: string;
  author_name?: string[];
  cover_i?: number;
}

interface GoogleBooksItem {
  volumeInfo?: {
    title?: string;
    authors?: string[];
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
}

const normalize = (value: string) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/\p{M}/gu, '')
  .replace(/[^\p{L}\p{N}]+/gu, ' ')
  .trim();

const tokens = (value: string) => normalize(value).split(/\s+/).filter(Boolean);

const authorMatches = (candidate: string, expected: string) => {
  const candidateTokens = new Set(tokens(candidate));
  const expectedTokens = tokens(expected);
  if (!expectedTokens.length) return false;

 
  const significantTokens = expectedTokens.filter((token) => token.length > 2);
  const matched = significantTokens.filter((token) => candidateTokens.has(token)).length;
  return matched >= Math.min(2, significantTokens.length);
};

const titleMatches = (candidate: string, expected: string) => {
  const a = normalize(candidate);
  const b = normalize(expected);
  if (!a || !b) return false;
  if (a === b || a.includes(b) || b.includes(a)) return true;

  const expectedTokens = new Set(tokens(expected));
  const candidateTokens = new Set(tokens(candidate));
  const common = [...expectedTokens].filter((token) => candidateTokens.has(token)).length;
  return common / Math.max(expectedTokens.size, 1) >= 0.75;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const verifyImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    const contentType = response.headers.get('content-type') ?? '';
    await response.body?.cancel();
    return response.ok && contentType.toLowerCase().startsWith('image/');
  } catch {
    return false;
  }
};

const searchOpenLibraryCover = async (book: BookSeed): Promise<string | null> => {
  const title = book.searchTitle ?? book.name;
  const author = book.searchAuthor ?? book.author;
  const params = new URLSearchParams({
    q: `${title} ${author}`,
    title,
    author,
    fields: 'title,author_name,cover_i',
    limit: '50',
  });

  const response = await fetch(`https://openlibrary.org/search.json?${params}`, {
    headers: {
      'User-Agent': process.env.OPEN_LIBRARY_USER_AGENT ?? 'BookExchangeSeeder/1.0 (demo catalog)',
    },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Open Library HTTP ${response.status}`);

  const data = (await response.json()) as { docs?: OpenLibraryDoc[] };
  const docs = (data.docs ?? []).filter((doc) =>
    doc.cover_i && doc.title && titleMatches(doc.title, title) &&
    doc.author_name?.some((name) => authorMatches(name, author)),
  );

  const coverId = docs[0]?.cover_i;
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false`
    : null;
};

const searchGoogleBooksCover = async (book: BookSeed): Promise<string | null> => {
  const title = book.searchTitle ?? book.name;
  const author = book.searchAuthor ?? book.author;
  const query = `intitle:${title} inauthor:${author}`;
  const params = new URLSearchParams({ q: query, maxResults: '20', printType: 'books' });
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${params}`, {
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`Google Books HTTP ${response.status}`);

  const data = (await response.json()) as { items?: GoogleBooksItem[] };
  const item = (data.items ?? []).find(({ volumeInfo }) => {
    const titleMatchesResult = volumeInfo?.title && titleMatches(volumeInfo.title, title);
    const authorMatchesResult = volumeInfo?.authors?.some((name) => authorMatches(name, author));
    return Boolean(titleMatchesResult && authorMatchesResult &&
      (volumeInfo?.imageLinks?.thumbnail || volumeInfo?.imageLinks?.smallThumbnail));
  });

  const imageUrl = item?.volumeInfo?.imageLinks?.thumbnail ??
    item?.volumeInfo?.imageLinks?.smallThumbnail;
  return imageUrl ? imageUrl.replace(/^http:/, 'https:') : null;
};

const findVerifiedCover = async (book: BookSeed): Promise<string | null> => {
 
  for (const provider of [searchOpenLibraryCover, searchGoogleBooksCover]) {
    try {
      const imageUrl = await provider(book);
      if (imageUrl && await verifyImageUrl(imageUrl)) return imageUrl;
    } catch (error) {
      console.warn(`Cover provider failed for "${book.name}":`, error);
    }
  }
  return null;
};

export const up = async (queryInterface: QueryInterface) => {
  const ownerIds = await Promise.all(
    OWNER_EMAILS.map((email) => getUserId(queryInterface, email)),
  );
  const owners = new Map<string, string>(
    OWNER_EMAILS.map((email, index) => [email, ownerIds[index]]),
  );

  const rows: Array<{
    owner_id: string;
    name: string;
    author: string;
    description: null;
    photo_url: string;
  }> = [];

  for (const [index, book] of BOOKS.entries()) {
    const coverUrl = await findVerifiedCover(book);
    if (!coverUrl) {
      console.warn(`Skipped (no verified cover): ${book.name} — ${book.author}`);
      continue;
    }
 
    const ownerEmail = book.name === 'Кобзар'
      ? 'anna@example.com'
      : book.name === '1984'
        ? 'maria@example.com'
        : OWNER_EMAILS[index % OWNER_EMAILS.length];

    rows.push({
      owner_id: owners.get(ownerEmail)!,
      name: book.name,
      author: book.author,
      description: null,
      photo_url: coverUrl,
    });

    console.log(`[${index + 1}/${BOOKS.length}] Cover verified: ${book.name}`);
    await sleep(350);
  }

  if (rows.length === 0) {
    throw new Error('No books with verified covers were found. Nothing was inserted.');
  }

  await queryInterface.bulkInsert('books', rows);
  console.log(`Inserted ${rows.length}/${BOOKS.length} books with verified covers.`);
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.query(
    'DELETE FROM books WHERE name IN (:names)',
    {
      replacements: { names: BOOKS.map((book) => book.name) },
      type: QueryTypes.DELETE,
    },
  );
};
