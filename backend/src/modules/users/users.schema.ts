import { z } from 'zod';
import { UserRole } from '../../database/models/user.model';
import { registerSchema } from '../auth/auth.shema';

export const createUserSchema = registerSchema.extend({
  role: z.nativeEnum(UserRole).default(UserRole.User),
});

export const updateUserSchema = createUserSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' });

export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;