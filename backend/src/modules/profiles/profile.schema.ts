import { z } from 'zod';
import { registerSchema } from '../auth/auth.shema';

export const updateProfileSchema = registerSchema.pick({ name: true, email: true }).partial();

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;