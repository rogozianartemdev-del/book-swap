import { API_URL } from '@/config/config';
import { Book } from '@/domain/entities/Book';

const NO_COVER = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#9ca3af" font-size="20" text-anchor="middle" font-family="sans-serif">Немає обкладинки</text></svg>',
)}`;

export const resolveFileUrl = (path: string | null | undefined): string | null => {
  if (!path) {
    return null;
  }

  return path.startsWith('http') ? path : `${API_URL}${path}`;
};

export const getBookCover = ({ photoUrl, filePath }: Pick<Book, 'photoUrl' | 'filePath'>) =>
  photoUrl ?? resolveFileUrl(filePath) ?? NO_COVER;


