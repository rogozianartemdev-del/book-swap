import { z } from 'zod';
import { paginationQuerySchema } from '../../utils/pagination';

export const createBookSchema = z.object({
  name: z.string().trim().min(1).max(255),
  author: z.string().trim().min(1).max(255),
  description: z.string().trim().max(5000).optional(),
  photoUrl: z
    .string()
    .trim()
    .max(500)
    .regex(/^https?:\/\//, 'Photo URL must start with http:// or https://')
    .optional(),
});

export const listBooksQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().optional(),
  sortBy: z.enum(['name', 'author']).default('name'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;
export type ListBooksQuery = z.infer<typeof listBooksQuerySchema>;