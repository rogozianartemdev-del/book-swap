import { z } from 'zod';

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const getPagination = ({ page, limit }: PaginationQuery) => ({
  limit,
  offset: (page - 1) * limit,
});

export const buildPaginatedResponse = <T>(
  items: T[],
  total: number,
  { page, limit }: PaginationQuery,
) => ({
  items,
  meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
});